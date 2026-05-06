基于 Slidev 的演讲幻灯片项目。

## 内容来源

- 大纲/素材文件：`C:\Users\YX\Nutstore\1\我的坚果云\Notes\Temp\pre.md`（坚果云同步，非项目内文件）
- 用户会持续更新 pre.md，每次要求"改改看"时先读取最新版本再同步到 slides.md
- 按自己的知识修正口语化表达，如果觉得不对可以提醒用户

## 受众

游戏公司的其他成员，包括但不限于程序、美术、策划、QA 等。内容表述应兼顾非技术背景的同事。

## 作者

- 用户的 GitHub handle：`jsjtxietian`，博客 `https://jsjtxietian.space/`
- 在 slides / prompt 这类公开文案里他用 **"谢天"** 自指（第三人称），不要改成"作者"之类的泛称

## slides.md 规范

- 不写演讲者注释（即 `<!-- ... -->` 形式的 HTML 注释）
- 偏好可视化和交互：多用 v-click/v-after 逐步揭示、v-mark 高亮关键词、HTML/CSS 布局（彩色方块、柱状图、堆叠条、状态卡片、循环流程图等），少用纯 markdown 列表
- 图片放在 `public/images/`，slides.md 中用 `/images/xxx.png` 引用

### v-click 卡片不要在 `<div>` 里混空行 + markdown

踩过的坑：`<div v-click>\n\n**xx**\n\n</div>` 这种写法会让 markdown-it 把 HTML block "断开" 再拼回去，途中 v-click 属性会丢/合并，导致后面的卡片点击数乱掉。

**正确写法**：卡片内用内联 HTML（`<strong>`），不要留空行。

```html
<div v-click class="p-2 bg-gray-50 rounded border"><strong>Title</strong> — 内容</div>
```

## Ref 规则

pre.md 里标了 `ref: https://...` 的地方，slides.md 对应页要挂 `<SlideRefs />` 组件（`components/SlideRefs.vue`）。

```html
<SlideRefs :refs="[
  { label: '显示文案', url: 'https://...' },
  { label: '第二条', url: 'https://...' }
]" />
```

- 组件会以小灰字一行的形式钉在 slide 左下角，`position: fixed; bottom: 0.5rem; left: 3.37rem`（这是经过用户视觉调整的值，"左对齐到标题"，别随便改）
- 多条 ref 用 `·` 分隔；超出一行会被 `ellipsis` 截断
- 一页只放一个 `<SlideRefs>`
- 页面里已经有 inline 链接（如 `[METR](...)`）时，仍然再挂一条同 URL 的 SlideRefs，以求一致

## Vue 组件

`components/` 下已有的自定义组件（随手用，别重复造）：

- `<SlideRefs :refs="[...]">` — 上面提到的底部 ref 条
- `<InferencePipeline />` — 推理流程示意图（Token → Vector → Transformer → 采样 → 下一个 Token）
- `<TokenTypewriter :tokens="[...]" :step="0.45" />` — 打字机式逐 Token 显示；`step` 越大越慢，CSS 里单帧动画时长在 `style.css` 的 `.token-pop` 里改
- `<TemperatureBars temp="..." label="..." :bars="[{color, text?, height, label?}]">` — Temperature 概率分布条形图
- `<TimelineStage label="..." title="..." :active="..." v-click>` — 四阶段时间轴卡（注：当前 slides 里已不用，改成了普通卡片）
- `<ContextConstraint :step="$clicks" />` — 当前 slides 里不用了，但组件还在
- `<AgentSplitView :step="$clicks" />` — Part 4 的 LLM vs 人对比视图

组件源码都不长，修改它们前先 `Read` 一下。

## CDP 调试

用户的浏览器开着 CDP 端口 `9222`（用于 debug Slidev dev server 的页面）。

- 列所有 tab：`curl -s http://localhost:9222/json`（找 `type=page` 且 `url` 是 `localhost:3031/...` 的）
- 对某个 tab 执行 JS / 截图：用 `cdp-probe.mjs`

```bash
# 找到 pageId 后
node cdp-probe.mjs <pageId> eval "document.title"
node cdp-probe.mjs <pageId> screenshot out.png
node cdp-probe.mjs <pageId> getText
```

抓 console 日志（debug Vue / Shiki 报错时很有用）直接用内联脚本：

```bash
node -e "
const ws = new WebSocket('ws://localhost:9222/devtools/page/<pageId>');
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.method === 'Runtime.consoleAPICalled' || m.method === 'Runtime.exceptionThrown') {
    console.log(JSON.stringify(m.params).slice(0, 400));
  }
});
ws.addEventListener('open', () => {
  ws.send(JSON.stringify({id:1, method:'Runtime.enable'}));
  // 触发操作，例如点击按钮
  ws.send(JSON.stringify({id:2, method:'Runtime.evaluate', params:{expression:'someAction()'}}));
  setTimeout(() => process.exit(0), 3000);
});
"
```

## Slidev 页号

Slidev URL `/N` 的 N 是**第 N 个 slide 分隔块**（算上 `layout: new-section` 等所有 `---` 分隔的块）。用户谈"第 N 页"时按这个数。要定位某页：

```bash
# 粗略：数 --- 分隔符
node -e "const s=require('fs').readFileSync('slides.md','utf8').split(/\n---\n/); s.forEach((p,i)=>console.log(i+1, (p.match(/^#[^\n]*/m)||[''])[0].slice(0,50)))"
```

## Slidev 已知 Bug + 补丁

`@slidev/cli@51.8.2` + `@shikijs/core@3.23.0` 有 codegen bug：生成 `#slidev/shiki` 虚拟模块时无条件写 `themes: undefined`，让 Shiki 的 `Object.entries(undefined)` 崩溃 —— 表现是 **Show editor（按 `e`）会让 ShikiEditor 抛错**。

已通过 `pnpm patch` 修好：`patches/@slidev__cli@51.8.2.patch`，走 `package.json` 的 `pnpm.patchedDependencies` 自动应用。

- **不要** 删除 `patches/` 或 `pnpm.patchedDependencies` 字段
- 升级 Slidev 版本前先确认 upstream 是否合并了这个修复，否则要重打补丁
- 改完 patch 需要**重启 dev server**（codegen 结果缓存在 Node 进程里）

## 提交习惯

- 用户会明确说"commit"时才提交
- commit message 末尾加 `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`
- 宁可新建 commit，不要 `--amend`
- 不要 `git push`，除非用户明说

## 记忆

会话级记忆在 `C:\Users\YX\.claude\projects\C--Users-YX-Desktop-ai-pre\memory\`，自动挂到对话里。遇到用户反复纠正或非显式的偏好，写进 memory 而不是 CLAUDE.md。
