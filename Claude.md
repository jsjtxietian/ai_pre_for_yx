基于 Slidev 的演讲幻灯片项目。

## 内容来源

- 大纲/素材文件：`C:\Users\YX\Nutstore\1\我的坚果云\Notes\Temp\pre.md`（坚果云同步，非项目内文件）
- 用户会持续更新 pre.md，每次要求"改改看"时先读取最新版本再同步到 slides.md
- 按自己的知识修正口语化表达，如果觉得不对可以提醒用户

## 受众

游戏公司的其他成员，包括但不限于程序、美术、策划、QA 等。内容表述应兼顾非技术背景的同事。

## slides.md 规范

- 不写演讲者注释（即 `<!-- ... -->` 形式的 HTML 注释）
- 偏好可视化和交互：多用 v-click/v-after 逐步揭示、v-mark 高亮关键词、HTML/CSS 布局（彩色方块、柱状图、堆叠条、状态卡片、循环流程图等），少用纯 markdown 列表
- 图片放在 `public/images/`，slides.md 中用 `/images/xxx.png` 引用

