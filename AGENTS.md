# AGENTS.md

## 1. Project structure
- This repository is the public runtime-only artifact for `https://nextweb4.github.io/Private/`; private source, generators, credentials, and administration code do not belong here.
- `index.html`, `about.html`, and `404.html` are entry pages; `article/` contains 562 generated article pages, `module/` contains three category pages, `data/` contains eight search files, and `uploads/` contains 74 public media files at the 2026-07-22 audit.
- `site.css` / `article.css` own presentation and `site.js` / `article-search.js` own browser behavior.
- Root README files document the runtime in English, Simplified Chinese, and Japanese.

## 2. Run commands
- Preview from the repository root with `python -m http.server 8000`, then open `http://localhost:8000/`.
- Do not use `file://` to claim search verification because committed JSON is loaded with same-origin `fetch()`.

## 3. Test commands
- No test command was found in the current repository; add one before claiming automated regression coverage.
- Runtime changes still require manual checks of the homepage, About, all modules, representative articles, search, media, 404 behavior, narrow layouts, and failure fallbacks.

## 4. Build commands
- No build command was found in the current repository; these files are already generated deployment artifacts.
- Confirm the active private source and workflow target before rebuilding; round-six evidence from the two candidate source repositories conflicts. Do not invent a runtime-local generator or hand-edit generated batches.

## 5. Code style
- Keep the exact centered Shields language selector in every README; visible labels are `English`, `简体中文`, and `日本語`.
- Keep all three READMEs in the same section order with identical facts, paths, counts, commands, links, images, and code fences.
- No lint / format command was found in the current repository.
- Preserve UTF-8 paths, semantic HTML, visible keyboard focus, plain CSS/JavaScript, and safe text assignment for search data.

## 6. Module boundaries
- Page structure belongs in generated HTML; shared visual rules belong in `site.css` or `article.css`; browser behavior belongs in `site.js` or `article-search.js`.
- Article changes must keep `article/`, `module/`, `data/search-index*`, `data/search-content*`, and `uploads/` synchronized.
- Source-only data, backend code, test fixtures, local administration, build logic, and deployment credentials must remain outside this public runtime; the active source repository is not established by the current evidence.
- `_headers` is only meaningful on compatible fallback hosts; do not claim GitHub Pages applies it.

## 7. Prohibited changes
- Do not commit secrets, passwords, protected source material, raw data, backups, Git metadata, backend/admin files, or private operational documentation.
- Do not treat copy/DevTools friction as authentication, confidentiality, or DRM.
- Do not directly bulk-edit generated pages or indexes; a later deployment can overwrite them and cross-file data can drift.
- Do not add a framework, package manager, or runtime build without changing and testing the private source and deployment contract.
- Do not copy unlicensed badge-collection assets or add unrelated tracking/counter providers.

## 8. Completion criteria
- The active source and its target have been verified, its pipeline has generated and validated the exact public allowlist, and this runtime contains no private or unexpected entry.
- HTTP preview passes for direct links, search, media, language preference, keyboard use, responsive layouts, network/storage failure, and a genuine 404 route.
- All three README files have reciprocal language links, exact contact `Rays688888@Gmail.com`, and recomputed inventory facts.
- Deployment is verified at `https://nextweb4.github.io/Private/`, not only in a local artifact.

## 9. Review criteria
- Compare the runtime tree with the source pipeline's reviewed manifest; reject unexpected top-level paths, links, junctions, or private material.
- Review non-ASCII paths using case-sensitive URL resolution and verify every changed media reference.
- Check that search indexes and content stores match published article/module identities and that query text is never inserted as unsafe HTML.
- Run `git diff --check` and inspect generated diffs for encoding damage, unrelated mass churn, and source/runtime role confusion.

## 10. Common risks
- Direct runtime edits are replaceable deployment output and may disappear on the next source publish.
- Generated articles, module pages, two search representations, and uploads can drift without source-level validation.
- The optional wallpaper depends on `bing.biturl.top` and Bing hosts; failure must remain non-blocking.
- Public static bytes cannot be kept secret, regardless of repository naming or client-side UI restrictions.
- No license file was found, so reuse rights for code, writing, and media are not declared.
