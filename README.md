<p align="center">
  <a href="README.md"><img src="https://img.shields.io/badge/English-0969da?style=flat-square" alt="English"></a>
  <a href="README.zh-CN.md"><img src="https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-c8102e?style=flat-square" alt="简体中文"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/%E6%97%A5%E6%9C%AC%E8%AA%9E-8250df?style=flat-square" alt="日本語"></a>
</p>

<div align="center">

# NextWeb4 Private Runtime

**The public, runtime-only artifact for the personal article archive at [nextweb4.github.io/Private/](https://nextweb4.github.io/Private/).**

[![Live site](https://img.shields.io/badge/live-%2FPrivate%2F-0969da?style=flat-square&logo=githubpages&logoColor=white)](https://nextweb4.github.io/Private/)
[![Last commit](https://img.shields.io/github/last-commit/NextWeb4/Private?style=flat-square&logo=github&label=last%20commit)](https://github.com/NextWeb4/Private/commits/main)
[![Repository size](https://img.shields.io/github/repo-size/NextWeb4/Private?style=flat-square&logo=github)](https://github.com/NextWeb4/Private)
[![Stars](https://img.shields.io/github/stars/NextWeb4/Private?style=flat-square&logo=github)](https://github.com/NextWeb4/Private)
![HTML](https://img.shields.io/badge/HTML-static%20runtime-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=111)

</div>

## Repository role

Despite its name, `NextWeb4/Private` is a **public** GitHub Pages runtime repository. It contains the browser-ready output for the `/Private/` project site, not private application source, credentials, an administration backend, or a complete development history.

The round-six evidence shows that this repository is generated deployment output, but the two available private source repositories contain conflicting target-repository documentation. This README therefore does not assign a verified source-of-truth repository. Confirm the active workflow target before changing any publishing path; a deployment may replace this entire runtime tree.

## Audited inventory

The 2026-07-22 recursive audit found 656 committed files on `main`:

| Area | Files | Purpose |
| --- | ---: | --- |
| `article/` | 562 | Pre-rendered individual article pages |
| `module/` | 3 | Investment & Thought, Reflections, and Technology & Networking indexes |
| `data/` | 8 | Three search indexes, three content stores, and their combined files |
| `uploads/` | 74 | Article media plus site icons |
| Repository root | 9 | Homepage, About and 404 pages, shared assets, `_headers`, and `.nojekyll` |

These are audit-time counts, not product limits. Recompute them from the current tree whenever the generated artifact changes.

## Reader experience

- `index.html` provides the archive entry point, module navigation, article discovery, and same-origin search.
- `module/` groups the archive into three topic views without requiring a server renderer.
- Every file under `article/` is pre-rendered HTML; reading does not depend on a database or an application server.
- `about.html` provides the author profile, a Chinese/English interface switch, and the current contact address.
- Search loads committed JSON, ranks results in the browser, and links directly to generated pages.
- The daily Bing wallpaper is optional progressive enhancement; a solid-color fallback keeps the content usable when the request or image fails.

## Runtime map

| Path | Runtime responsibility |
| --- | --- |
| `index.html`, `404.html` | Main entry and project-site not-found page |
| `about.html` | Author profile and local language preference |
| `article/` | 562 published article documents |
| `module/` | Three generated category documents |
| `data/search-index.json` | Combined compact search index |
| `data/search-index/` | Category-specific compact indexes |
| `data/search-content.json` | Combined searchable content data |
| `data/search-content/` | Category-specific content data |
| `uploads/` | Media referenced by public HTML |
| `site.css`, `article.css` | Shared homepage/module and article presentation |
| `site.js` | Current-year handling, UI protection friction, wallpaper validation, cache, and fallback |
| `article-search.js` | Browser-side search and suggestion behavior |
| `.nojekyll` | Prevents Jekyll processing of the generated tree |
| `_headers` | Header policy file for compatible fallback hosts; GitHub Pages does not apply it |

## Local preview

No package installation is required. From the repository root, run:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`. Use HTTP rather than `file://`: search depends on same-origin `fetch()` requests for committed JSON.

No repository build, automated test, lint, format, package-manager, or CI command was found in this runtime tree. Do not claim runtime-only manual checks as source-level automated coverage. The current source/deployment conflict means no source command is asserted here.

## Source and deployment boundary

This repository is a deployment destination, not an editable source tree. The safe lifecycle is:

1. Identify the currently active private source and verify its workflow target; round-six evidence is conflicting.
2. Edit content, templates, or validation rules there and run its actual build and test gates.
3. Export only the reviewed public allowlist.
4. Replace this runtime tree atomically and let GitHub Pages serve `main`.
5. Verify the deployed `/Private/` URL, representative articles, search, media, and 404 behavior.

Do not add backend code, raw source data, passwords, tokens, backups, local tooling, or private maintenance documents here. A public static repository cannot protect bytes that it contains, even when UI code discourages copying or developer tools.

## Search and content integrity

The runtime keeps compact Bloom-filter-style indexes separately from searchable content. Query processing and result ranking happen locally after same-origin files are downloaded; there is no search API. Published article changes therefore need synchronized HTML, module entries, compact indexes, content stores, and media references.

No generator is committed here, so bulk fixes in the runtime are unsafe. After the active source is confirmed, regenerate there and validate the exact public manifest instead of hand-editing hundreds of output files.

## Network, storage, and privacy

Article HTML, styles, scripts, media, and search data are same-origin static files. `site.js` may request wallpaper metadata from `https://bing.biturl.top/`; it omits credentials and referrer data, times out after six seconds, and accepts returned images only from HTTPS `bing.com` hosts. Wallpaper failures are non-blocking.

The wallpaper cache and About language selection use `localStorage`. No server-side privacy or authentication boundary exists in this public artifact. README badges request images from `img.shields.io`; this affects README rendering only and adds no site dependency.

## Verification checklist

- Preview through HTTP and open the homepage, About page, all three module pages, and representative articles.
- Test empty, Chinese, English, date, no-result, keyboard, and rapidly changing search queries.
- Check UTF-8 and percent-encoded non-ASCII paths with case-sensitive hosting behavior in mind.
- Confirm every changed media URL resolves and no unreferenced private upload entered the artifact.
- Test narrow layouts, keyboard focus, reduced motion, and the About language preference.
- Simulate search-index, wallpaper API, image, and storage failures; primary content must remain readable.
- Request an unknown path and confirm `404.html` rather than an accidental single-page-app fallback.

## Status, limitations, and contributions

At the 2026-07-22 audit the repository was public, unarchived, and Pages-enabled. Its principal risks are source/runtime drift, direct edits being overwritten, large static media, generated indexes becoming inconsistent, and accidental publication of material that belongs only in the private source.

Contributions should originate only after the active source has been established and should arrive here as a validated artifact. Keep the runtime framework-free unless the source architecture and deployment contract are deliberately changed and tested together.

## Contact

- [Rays688888@Gmail.com](mailto:Rays688888@Gmail.com)

## License

No license file was detected. Public availability does not grant permission to reuse the site code, writing, or uploaded media; individual article assets may also have separate rights or provenance.
