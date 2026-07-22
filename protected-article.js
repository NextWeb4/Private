(function () {
    'use strict';

    const encoder = new TextEncoder();
    const decoder = new TextDecoder('utf-8', { fatal: true });

    function decodeBase64(value) {
        const binary = atob(String(value || ''));
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
        return bytes;
    }

    function joinBytes(...parts) {
        const size = parts.reduce((total, part) => total + part.length, 0);
        const joined = new Uint8Array(size);
        let offset = 0;
        parts.forEach(part => {
            joined.set(part, offset);
            offset += part.length;
        });
        return joined;
    }

    async function passwordMaterial(password, keyInfo) {
        const bytes = encoder.encode(password);
        if (keyInfo.kind === 'pbkdf2_sha256') {
            const material = await crypto.subtle.importKey('raw', bytes, 'PBKDF2', false, ['deriveBits']);
            return new Uint8Array(await crypto.subtle.deriveBits({
                name: 'PBKDF2',
                hash: 'SHA-256',
                salt: decodeBase64(keyInfo.salt),
                iterations: keyInfo.iterations,
            }, material, 256));
        }
        if (keyInfo.kind === 'sha256') {
            return new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
        }
        throw new Error('unsupported password format');
    }

    async function decryptPackage(password, envelope) {
        const passwordBytes = await passwordMaterial(password, envelope.keyInfo);
        const packageKey = new Uint8Array(await crypto.subtle.digest('SHA-256', joinBytes(
            encoder.encode('nextweb4.static-protected-article.v1\0'),
            encoder.encode('encryption\0'),
            passwordBytes,
            encoder.encode(envelope.aad),
        )));
        const key = await crypto.subtle.importKey('raw', packageKey, { name: 'AES-GCM' }, false, ['decrypt']);
        const plaintext = await crypto.subtle.decrypt({
            name: 'AES-GCM',
            iv: decodeBase64(envelope.nonce),
            additionalData: encoder.encode(envelope.aad),
            tagLength: 128,
        }, key, decodeBase64(envelope.ciphertext));
        return JSON.parse(decoder.decode(plaintext));
    }

    globalThis.NextWebProtectedArticle = Object.freeze({ decryptPackage });

    if (typeof document === 'undefined') return;
    const script = document.currentScript;
    const packageNode = document.getElementById('protected-article-package');
    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const submit = document.getElementById('password-submit');
    const error = document.getElementById('password-error');
    const content = document.getElementById('article-content');
    const overlay = document.querySelector('.password-overlay');
    if (!script || !packageNode || !form || !input || !submit || !error || !content || !overlay) return;

    function restoreImages(fragment, images) {
        const urls = [];
        fragment.querySelectorAll('img[data-protected-image]').forEach(image => {
            const record = images[image.dataset.protectedImage];
            if (!record || typeof record.mime !== 'string' || typeof record.data !== 'string') return;
            const url = URL.createObjectURL(new Blob([decodeBase64(record.data)], { type: record.mime }));
            urls.push(url);
            image.src = url;
            image.removeAttribute('data-protected-image');
        });
        return urls;
    }

    function showContent(payload) {
        const template = document.createElement('template');
        template.innerHTML = String(payload.html || '');
        const objectUrls = restoreImages(template.content, payload.images || {});
        content.replaceChildren(template.content);
        content.hidden = false;
        overlay.remove();
        window.addEventListener('pagehide', () => objectUrls.forEach(url => URL.revokeObjectURL(url)), { once: true });
        content.focus({ preventScroll: true });
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (form.getAttribute('aria-busy') === 'true') return;
        error.textContent = '';
        form.setAttribute('aria-busy', 'true');
        input.disabled = true;
        submit.disabled = true;
        try {
            if (!globalThis.crypto || !crypto.subtle) throw new Error('web crypto unavailable');
            const envelope = JSON.parse(packageNode.textContent);
            const payload = await decryptPackage(input.value, envelope);
            showContent(payload);
        } catch (failure) {
            error.textContent = '密码不正确，或加密内容已损坏。';
            input.select();
        } finally {
            form.removeAttribute('aria-busy');
            if (overlay.isConnected) {
                input.disabled = false;
                submit.disabled = false;
                input.focus();
            }
        }
    });
}());
