<p align="center">
  <a href="README.md"><img src="https://img.shields.io/badge/English-0969da?style=flat-square" alt="English"></a>
  <a href="README.zh-CN.md"><img src="https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-c8102e?style=flat-square" alt="简体中文"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/%E6%97%A5%E6%9C%AC%E8%AA%9E-8250df?style=flat-square" alt="日本語"></a>
</p>

<div align="center">

# NextWeb4 Private 运行产物

**个人文章归档站点 [nextweb4.github.io/Private/](https://nextweb4.github.io/Private/) 的公开、仅运行时产物。**

[![在线站点](https://img.shields.io/badge/live-%2FPrivate%2F-0969da?style=flat-square&logo=githubpages&logoColor=white)](https://nextweb4.github.io/Private/)
[![最近提交](https://img.shields.io/github/last-commit/NextWeb4/Private?style=flat-square&logo=github&label=last%20commit)](https://github.com/NextWeb4/Private/commits/main)
[![仓库大小](https://img.shields.io/github/repo-size/NextWeb4/Private?style=flat-square&logo=github)](https://github.com/NextWeb4/Private)
[![Stars](https://img.shields.io/github/stars/NextWeb4/Private?style=flat-square&logo=github)](https://github.com/NextWeb4/Private)
![HTML](https://img.shields.io/badge/HTML-static%20runtime-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=111)

</div>

## 仓库角色

尽管名称包含 `Private`，`NextWeb4/Private` 实际上是一个**公开**的 GitHub Pages 运行仓库。它只保存 `/Private/` 项目站点可由浏览器直接使用的产物，不是私有应用源码、凭据、管理后端或完整开发历史的存放处。

当前部署证据表明，本仓库是 `website-source-v2` 生成的运行产物。经过校验的产物由 GitHub Actions 发布到本仓库 `main` 分支，GitHub Project Pages 在 `/Private/` 子路径提供服务。独立的 `website-source` 工作流只发布用户站 `NextWeb4.github.io`，不会指向本仓库。

## 审计清单

下一次经过校验的部署将在 `main` 中包含 660 个文件：

| 区域 | 文件数 | 用途 |
| --- | ---: | --- |
| `article/` | 562 | 预渲染的独立文章页 |
| `module/` | 3 | 投资思想、感悟反省、技术网络三个索引 |
| `data/` | 8 | 三份搜索索引、三份正文数据及各自汇总文件 |
| `uploads/` | 74 | 文章媒体和站点图标 |
| 仓库根目录 | 13 | 首页、About、404、共享资源、`_headers`、`.nojekyll` 和四份公开维护文档 |

这些数字描述审计时提交，不是产品上限。生成产物变化时，应从当前树重新统计。

## 读者体验

- `index.html` 提供归档入口、模块导航、文章发现和同源搜索。
- `module/` 将归档分为三个主题视图，不需要服务端渲染。
- `article/` 中每个文件都是预渲染 HTML，阅读不依赖数据库或应用服务器。
- `about.html` 提供作者资料、中英文界面切换和当前联系邮箱。
- 搜索读取已提交 JSON，在浏览器内排序并直接链接生成页面。
- 每日 Bing 壁纸属于可选渐进增强；请求或图片失败时，纯色背景仍可保证内容可用。

## 运行树地图

| 路径 | 运行职责 |
| --- | --- |
| `index.html`, `404.html` | 主入口与项目站点的未找到页面 |
| `about.html` | 作者资料和本地语言偏好 |
| `article/` | 562 份已发布文章文档 |
| `module/` | 三份生成的分类文档 |
| `data/search-index.json` | 汇总的紧凑搜索索引 |
| `data/search-index/` | 各分类紧凑索引 |
| `data/search-content.json` | 汇总的可搜索正文数据 |
| `data/search-content/` | 各分类正文数据 |
| `uploads/` | 公开 HTML 引用的媒体 |
| `site.css`, `article.css` | 首页/模块和文章的共享样式 |
| `site.js` | 年份更新、界面保护提示、壁纸校验、缓存与降级 |
| `article-search.js` | 浏览器端搜索和建议逻辑 |
| `.nojekyll` | 防止 Jekyll 再处理生成树 |
| `_headers` | 兼容回滚托管商的响应头文件；GitHub Pages 不执行它 |

## 本地预览

不需要安装包。在仓库根目录运行：

```bash
python -m http.server 8000
```

打开 `http://localhost:8000/`。请使用 HTTP 而不是 `file://`，因为搜索通过同源 `fetch()` 加载已提交 JSON。

当前运行树未发现仓库级构建、自动化测试、lint、format、包管理器或 CI 命令。不能把运行产物的人工检查宣称为源码级自动化覆盖；当前源码/部署冲突意味着本文不声明任何源码命令。

## 源码与部署边界

此仓库是部署目的地，不是可直接维护的源码树。安全生命周期是：

1. 在 `website-source-v2` 中修改内容、模板或校验规则，并运行真实构建和测试门禁。
2. 只导出审核通过的公开白名单。
3. 原子替换此运行树，并由 GitHub Pages 提供 `main`。
4. 验证已部署的 `/Private/` URL、代表性文章、搜索、媒体和 404 行为。

不得在此加入后端代码、原始源数据、密码、令牌、备份、本地工具或私有维护文档。公开静态仓库无法保护其中的字节，即使界面脚本会阻止复制或开发者工具操作。

## 搜索与内容一致性

运行树将紧凑的 Bloom-filter 风格索引与可搜索正文分开保存。下载同源文件后，查询处理和结果排序均在本地完成，不存在搜索 API。因此，文章改动必须同步 HTML、模块条目、紧凑索引、正文数据和媒体引用。

此处没有生成器，直接批量修补运行文件并不安全。确认生效源码后，应在那里重新生成并校验精确公开清单，而不是手工编辑数百份输出。

## 网络、存储与隐私

文章 HTML、样式、脚本、媒体和搜索数据都是同源静态文件。`site.js` 可从 `https://bing.biturl.top/` 请求壁纸元数据；请求不携带凭据和 referrer，六秒超时，并且只接受 HTTPS 的 `bing.com` 图片主机。壁纸失败不会阻塞正文。

壁纸缓存和 About 页语言选择使用 `localStorage`。此公开产物不存在服务端隐私或认证边界。README 徽章会请求 `img.shields.io`，但只影响 README 渲染，不增加站点运行依赖。

## 验证清单

- 通过 HTTP 预览并打开首页、About、三个模块页和代表性文章。
- 测试空查询、中文、英文、日期、无结果、键盘和快速变化的查询。
- 按区分大小写的托管行为检查 UTF-8 与百分号编码的非 ASCII 路径。
- 确认所有变更媒体 URL 可访问，且没有未引用的私有上传进入产物。
- 检查窄屏、键盘焦点、减少动态效果和 About 语言偏好。
- 模拟搜索索引、壁纸 API、图片和存储失败；主要内容必须仍可阅读。
- 请求不存在的路径，确认显示 `404.html` 而不是误用 SPA 回退。

## 状态、局限与贡献

截至 2026-07-22 审计，仓库公开、未归档并已启用 Pages；源码提交 `2ca9ae2` 的部署已成功完成。主要风险是源码与运行产物漂移、直接编辑被覆盖、大体积静态媒体、生成索引失配，以及把只属于私有源码的材料意外发布。

贡献只能在确认当前生效源码后开始，并以验证通过的产物进入这里。除非同时有意修改并测试源码架构和部署契约，否则应保持运行端无框架。

## 联系方式

- [Rays688888@Gmail.com](mailto:Rays688888@Gmail.com)

## 许可证

未检测到许可证文件。公开可访问不代表允许复用站点代码、文章或上传媒体；个别文章素材还可能具有独立权利或来源约束。
