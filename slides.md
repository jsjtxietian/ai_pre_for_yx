---
theme: penguin
title: AI 与游戏开发
titleTemplate: '%s'
author: ''
colorSchema: light
transition: slide-left
defaults:
  transition: slide-left
fonts:
  sans: Noto Sans SC
  mono: Fira Code
  provider: google
themeConfig:
  primary: '#3e5166'
  logoHeader: ''
  twitter: ''
  twitterUrl: ''
  eventLogo: ''
  eventUrl: ''
drawings:
  enabled: false
---

# AI 与游戏开发

从 LLM 到 Agent，从工具到思维方式

<div class="abs-br m-6 flex gap-2 text-sm opacity-50">
  <span>2026</span>
</div>

---
layout: new-section
---

# Part 1: LLM

大语言模型是怎么工作的

---

# 模型能力在飞速进化

AI 能独立完成的任务时长 —— **Log 坐标**下是一条直线

<div class="mt-2 grid grid-cols-5 gap-4 items-start">

<div class="col-span-3">
  <img src="/images/show.png" class="rounded border border-gray-200 shadow-sm w-full" />
  <div class="text-xs opacity-50 mt-1 text-center">
    横轴：模型发布时间 · 纵轴：任务时长（<strong>对数刻度</strong>）
  </div>
</div>

<div class="col-span-2 space-y-2 text-xs">

<div v-click class="p-2 bg-teal-50 rounded-lg border border-teal-200">
<strong>图表直译</strong><br/>
"不同 LLM 能以 <strong>50% 成功率</strong> 完成的软件任务时长"
</div>

<div v-click class="p-2 bg-amber-50 rounded-lg border border-amber-200">
<strong>Log 轴上的直线 = 指数增长</strong><br/>
每格是前一格的 <strong>10 倍</strong>，数据点大致落在一条直线上
</div>

<div v-click class="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
<strong>METR 的发现</strong><br/>
Task Horizon 大约每 <strong>~7 个月翻一倍</strong> —— 持续了多年的稳定节奏
</div>

<div class="opacity-50 mt-1">
Source: <a href="https://metr.org/time-horizons/" class="underline">METR</a>
</div>

</div>
</div>

---

# 换成 Linear 坐标看看

同样的数据 —— 早期任务被压得几乎看不见，近两年是 **Hockey-Stick**

<div class="mt-2 grid grid-cols-5 gap-4 items-start">

<div class="col-span-3">
  <img src="/images/show1.png" class="rounded border border-gray-200 shadow-sm w-full" />
  <div class="text-xs opacity-50 mt-1 text-center">
    横轴：模型发布时间 · 纵轴：任务时长（线性）
  </div>
</div>

<div class="col-span-2 space-y-2 text-xs">

<div v-click class="p-2 bg-teal-50 rounded-lg border border-teal-200">
<strong>早期几乎贴地</strong><br/>
GPT-2/3 那些"几秒级"任务，在线性尺度下与 0 几乎无区别
</div>

<div v-click class="p-2 bg-amber-50 rounded-lg border border-amber-200">
<strong>近两年突然起飞</strong><br/>
前沿模型已经能独立跑 <strong>数小时</strong> 的复杂工程任务
</div>

<div v-click class="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
<strong>外推的含义</strong><br/>
如果指数趋势继续，几年后模型将能独立完成 <strong>数天</strong> 量级的任务
</div>

<div class="opacity-50 mt-1">
Source: <a href="https://metr.org/time-horizons/" class="underline">METR</a>
</div>

</div>
</div>

---

# 希望大家理解

<div class="mt-8">

<v-clicks>

<div class="p-4 mb-4 bg-teal-50 rounded-lg border-l-4 border-teal-400 text-lg">

**1.** Token 到底是什么？

</div>

<div class="p-4 mb-4 bg-teal-50 rounded-lg border-l-4 border-teal-400 text-lg">

**2.** Transformer 的基本结构和原理是什么？

</div>

<div class="p-4 mb-4 bg-teal-50 rounded-lg border-l-4 border-teal-400 text-lg">

**3.** 为什么大模型本质上是基于统计学的，而且总是带有随机性？

</div>

<div class="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400 text-lg">

**4.** 为什么大模型会有 Context（上下文）的长度限制？

</div>

</v-clicks>

</div>

---

# GPT：名字里藏着核心机制

**G**enerative **P**re-trained **T**ransformer

<div class="grid grid-cols-3 gap-6 mt-8">
<div v-click class="p-4 bg-teal-50 rounded-lg border border-teal-200">

### Generative

**生成式**

不像搜索引擎返回现成网页，而是一个词、一个词"吐"出来

</div>
<div v-click class="p-4 bg-amber-50 rounded-lg border border-amber-200">

### Pre-trained

**预训练的**

"知识权重"提前在海量数据上训练好。我们日常使用（推理）时，它并不学习新东西，只是在调用已有的权重

</div>
<div v-click class="p-4 bg-emerald-50 rounded-lg border border-emerald-200">

### Transformer

**网络结构名称**

它的网络结构名称，也是模型内部最核心的"黑盒"

</div>
</div>

---

# 推理流程

文本进去，文本出来 —— 中间发生了什么？

<div class="mt-8">
  <InferencePipeline />
</div>

<div v-click class="mt-6 text-center">
  <div class="inline-block px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-sm">
    <carbon-return class="inline text-gray-500" /> 新 Token 加入输入序列，回到开头继续生成 —— <span v-mark="{ at: 8, type: 'highlight', color: '#14b8a6' }">自回归（Autoregressive）</span>
  </div>
</div>

---

# 自回归：一个个 Token 蹦出来

像打字机一样 —— 每次只预测下一个

<div class="mt-6 space-y-3 text-sm">

<div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
  <div class="text-xs opacity-60 mb-2 font-mono">Input（已有的 Context）</div>
  <div class="font-mono text-base">
    许多年之后，面对行刑队，奥雷<span class="text-xs opacity-50 italic ml-1">｜ 从这里继续生成</span>
  </div>
</div>

<div v-click class="p-4 bg-teal-50 rounded-lg border border-teal-200">
  <div class="text-xs opacity-60 mb-2 font-mono">Output（每次只预测一个 Token）</div>
  <TokenTypewriter :tokens="['良','诺','·','布','恩','地','亚','上','校','将','会','回','想','起','，','他','父','亲','带','他','去','见','识']" />
</div>

<div v-click class="text-xs opacity-60 text-center italic">《百年孤独》开篇 —— 模型"回想起"了整本书</div>

</div>

---

# 何为 Token：数草莓问题

"Strawberry 里有几个 r？" —— 以前的 AI 经常答错

<div v-click class="mt-6 flex items-center justify-center gap-1">
  <div class="font-mono text-lg px-4 py-2 bg-teal-100 rounded-l-lg border border-teal-300">str</div>
  <div class="font-mono text-lg px-4 py-2 bg-amber-100 border-y border-amber-300">aw</div>
  <div class="font-mono text-lg px-4 py-2 bg-violet-100 rounded-r-lg border border-violet-300">berry</div>
</div>
<div v-after class="text-center text-xs opacity-50 mt-1">它看到的不是 s-t-r-a-w-b-e-r-r-y 这 10 个字母 —— 而是 3 个 Token</div>

<v-clicks>

- LLM 不是按字符处理文本，而是先切分成 **Token**
- 模型从未"看到"过单独的字母 —— 所以字符级计数它并不擅长

</v-clicks>

<div v-click class="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">

### Token → Vector

所有 Token 进入模型前，都会被转成 **向量（Vector）** —— 一长串数字。

之后所有计算都是基于这些数字的数学运算。想亲眼看 Tokenizer 怎么切：<code class="text-xs">platform.openai.com/tokenizer</code>

</div>

---

# Attention Is All You Need

Transformer 内部最重要的机制：**Self-Attention（自注意力）**

<div v-click class="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
  <div class="flex items-center justify-center gap-1 text-base font-mono">
    <span class="px-2 py-1 bg-teal-200 rounded border border-teal-400 font-bold">小明</span>
    <span class="px-2 py-1 opacity-50">去了</span>
    <span class="px-2 py-1 opacity-50">公园</span>
    <span class="px-2 py-1 opacity-50">，</span>
    <span class="px-2 py-1 opacity-50">后来</span>
    <span class="px-2 py-1 bg-amber-200 rounded border border-amber-400 font-bold">他</span>
    <span class="px-2 py-1 opacity-50">又</span>
    <span class="px-2 py-1 opacity-50">回家了</span>
  </div>
  <div class="text-center mt-2 text-xs text-teal-600">← "他" 能跨越多个 Token 回看到"小明" —— 这就是全局视野</div>
</div>

<div class="grid grid-cols-2 gap-4 mt-3">
<div>

<v-clicks>

- 不预设"只有附近重要" —— <span v-mark="{ at: 5, type: 'highlight', color: '#f59e0b' }">任意两位置都可能相关</span>
- 相关性由 **内容决定**，动态分配权重
- 本质：**一个内容驱动的全局软检索系统**
- 网络够深，自然涌现出各种能力

</v-clicks>

</div>
<div v-click>

### The Bitter Lesson

把人类经验（语法规则、局部启发）写死进系统，<br/>最终往往打不过 **依赖通用算力 + 全局搜索** 的简单机制。

<div class="mt-3 text-xs opacity-70">

Richard Sutton：利用算力规模化的通用方法，最终总是胜出

</div>

</div>
</div>

---

# 采样：如何选下一个 Token

Next-Token Prediction —— 基于概率分布的自回归过程

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

<v-clicks>

- 神经网络输出的是 **概率分布**（softmax），不是确定的答案
- "今天天气" → "真好" 60%、"不错" 25%、"很热" 10%...
- **采样** = 从这些概率中选一个
- **Temperature** 参数控制了随机性

</v-clicks>

</div>
<div>

<div v-click>
  <TemperatureBars
    temp="≈ 0"
    label="死板，几乎总选最高概率"
    :bars="[
      { color: 'bg-teal-500', text: 'text-white', height: 95, label: '真好' },
      { color: 'bg-teal-300', height: 8 },
      { color: 'bg-teal-200', height: 3 },
      { color: 'bg-teal-100', height: 1 },
    ]"
  />
</div>

<div v-click>
  <TemperatureBars
    temp="≈ 1"
    label="创造力，或幻觉"
    :bars="[
      { color: 'bg-teal-400', text: 'text-white', height: 45, label: '真好' },
      { color: 'bg-amber-400', text: 'text-white', height: 30, label: '不错' },
      { color: 'bg-violet-400', text: 'text-white', height: 18, label: '很热' },
      { color: 'bg-gray-300', height: 7, label: '...' },
    ]"
  />
</div>

</div>
</div>

<div v-click class="mt-3 text-sm text-center opacity-70">

同一 prompt 跑两次，可能得到不同的结果 —— 这是 LLM **基于统计学** 的本质特征

</div>

---

# 不确定性的三个来源

即使 Temperature 设为 0，LLM 的输出也不完全一致 —— 为什么？

<div class="grid grid-cols-3 gap-3 mt-4 text-sm">

<div v-click class="p-3 bg-teal-50 rounded-lg border-l-4 border-teal-500">
  <div class="text-xs opacity-60 font-mono">机制层面</div>

### 采样与温度

本质是概率预测引擎。Temperature > 0 时，按概率分布"抽卡"，天然带随机性。

</div>

<div v-click class="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
  <div class="text-xs opacity-60 font-mono">数学层面</div>

### 蝴蝶效应

浮点数加法不满足结合律：

$(a+b)+c \neq a+(b+c)$

千亿次计算中，微小误差层层放大。

</div>

<div v-click class="p-3 bg-violet-50 rounded-lg border-l-4 border-violet-500">
  <div class="text-xs opacity-60 font-mono">工程层面</div>

### 环境干扰

动态 Batching 改变计算顺序；高并发下触发动态量化、专家丢弃 —— 打破确定性。

</div>

</div>

<div v-click class="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">

**结论**：LLM 是一个 **自回归的概率预测引擎**。"基于统计学" 意味着它学的是 **词语共现的统计规律**（$P(x_t | x_1, ..., x_{t-1})$），不是显式的知识检索。

</div>

---

# Hallucination：为什么 AI 会胡说

它是 **"概率匹配者"**，不是 **"事实检索者"**

<div v-click class="mt-4 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500 text-sm italic">

问："林黛玉倒拔垂杨柳是在哪一回？"<br/>
→ 它不仅不纠正你，还会煞有介事地编造一段《红楼梦》风格的文本来描述这个场景。

</div>

<div class="mt-4">

### 三个根源

<div class="grid grid-cols-3 gap-3 mt-2 text-sm">

<div v-click class="p-3 bg-gray-50 rounded-lg border border-gray-200">

**文字接龙，无真实知识库**

底层没有维基百科式的数据库。只知道哪些词连起来"听起来像真的"。

</div>

<div v-click class="p-3 bg-gray-50 rounded-lg border border-gray-200">

**训练数据矛盾与虚构**

互联网语料包含虚构小说、错误信息、个人偏见 —— 它都"吃"了进去。

</div>

<div v-click class="p-3 bg-gray-50 rounded-lg border border-gray-200">

**过度对齐（Over-alignment）**

被训练成"尽量回答用户" —— 不知道时倾向于编造，而不是说"不知道"。

</div>

</div>

</div>

<div v-click class="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200 text-sm">

**怎么缓解？** 给它提供 **Context**（让它去看网页、查文档）—— 这就是 RAG 的核心思想。冷门 API（如 UE 某个模块）尤其要小心。

</div>

---

# Context Window

<div class="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">

"今天天气很好，我准备出 ___"

下一个词大概率是 **"门"** —— 前面这句话，就是它的 **Context**

</div>

<v-clicks>

- **Context** = 大模型一次性能看到的所有 Token
- 包括系统提示、历史消息、你的问题 —— 全部拼在一起送进去
- 有长度上限（128K、200K Token 等），超出就被截断
- **不是"记忆"**：每次请求都从零开始

</v-clicks>

<div v-click class="mt-4">
  <div class="text-xs mb-1 opacity-60">一次对话中 Context 的组成</div>
  <div class="w-full h-8 rounded-lg flex overflow-hidden text-xs text-white font-medium">
    <div class="bg-purple-500 flex items-center justify-center" style="width: 15%">系统提示</div>
    <div class="bg-teal-500 flex items-center justify-center" style="width: 30%">历史对话</div>
    <div class="bg-amber-500 flex items-center justify-center" style="width: 15%">你的问题</div>
    <div class="bg-gray-300 flex items-center justify-center text-gray-600" style="width: 40%">剩余可用空间</div>
  </div>
</div>

<div v-click class="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm">

**Context Rot**：输入 Token 越多，模型表现反而可能下降 —— 注意力会被废话稀释。所以 <span v-mark="{ at: 6, type: 'underline', color: '#f59e0b' }">精简指令、清晰分隔</span> 是在手动引导模型的注意力资源。

</div>

---

# 不同 AI 的"口癖"

理解了训练流程，就能解释为什么 ChatGPT 和 Claude 说话风格不一样

<v-clicks>

- **预训练语料不同**：各家用的训练数据分布有差异
- **SFT 标注风格不同**：标注员的写作偏好会被模型学到
- **RL 奖励偏好不同**：什么样的回答被奖励，模型就倾向怎么说
- **System Prompt**：每家公司给 AI 设定的"人设"不同

</v-clicks>

<div v-click class="mt-6 grid grid-cols-3 gap-4 text-sm text-center">
<div class="p-3 bg-emerald-50 rounded-lg border border-emerald-200">

**ChatGPT**

"Sure! Here's..."

偏正式、结构化

</div>
<div class="p-3 bg-orange-50 rounded-lg border border-orange-200">

**Claude**

"I'd be happy to..."

偏口语、有温度

</div>
<div class="p-3 bg-purple-50 rounded-lg border border-purple-200">

**DeepSeek**

"好的，让我来..."

更偏中文互联网

</div>
</div>

---

# 多模态

图像、音频也可以是 Token —— **能变成 Token 的，都能用 Transformer 处理**

<div v-click class="mt-4 flex items-center justify-center gap-2 text-sm">
  <div class="px-3 py-2 bg-teal-100 rounded border border-teal-300 text-center">文本 Token<br/><span class="text-xs opacity-70">"你好"</span></div>
  <div class="opacity-30">+</div>
  <div class="px-3 py-2 bg-amber-100 rounded border border-amber-300 text-center">图像 Token<br/><span class="text-xs opacity-70">Patch 切块</span></div>
  <div class="opacity-30">+</div>
  <div class="px-3 py-2 bg-violet-100 rounded border border-violet-300 text-center">音频 Token<br/><span class="text-xs opacity-70">频谱片段</span></div>
  <div class="opacity-30">→</div>
  <div class="px-3 py-2 bg-emerald-100 rounded border border-emerald-300 text-center font-medium">Transformer<br/><span class="text-xs opacity-70">统一处理</span></div>
</div>

<v-clicks>

- 图像被切成小块（Patch），每个 Patch 编码为一个 Token —— 这就是 **Vision Transformer**
- Transformer 是 **通用的序列建模架构**，不在乎输入是文字、像素还是音符

</v-clicks>

<div v-click class="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">

### 原生多模态

训练时就混合了多种模态的数据（文本 + 图像 + 音频），而不是后期拼接。<br/>
如 Google 的 Gemma 4 —— 从一开始就"看得见也听得到"，并且是开源的。

</div>

---
layout: new-section
---

# Part 2: Agent 时代

交互模式的进化（在模型能力的基础上）

---

# 从前、当下、将来

<div class="mt-10 flex gap-4">
  <TimelineStage label="Phase I" title="Tab 补全" v-click>
    AI 第一次摸到代码
  </TimelineStage>
  <TimelineStage label="Phase II" title="Chatbot" v-click>
    同步提示-响应回路
  </TimelineStage>
  <TimelineStage label="Phase III" title="AI Editor" v-click>
    仓内上下文协作
  </TimelineStage>
  <TimelineStage label="Phase IV" title="Code Agent" active v-click>
    长任务 / 少指令 / 自主
  </TimelineStage>
</div>

<div class="mt-12 relative h-16">
  <div v-click="[1,2]" class="absolute inset-0 flex items-center justify-center gap-5 transition-opacity duration-300">
    <span class="text-sm opacity-50">2018 – 2022</span>
    <span class="px-4 py-1.5 bg-gray-100 rounded-md text-sm">TabNine</span>
    <span class="px-4 py-1.5 bg-gray-100 rounded-md text-sm">Copilot</span>
  </div>
  <div v-click="[2,3]" class="absolute inset-0 flex items-center justify-center gap-5 transition-opacity duration-300">
    <span class="text-sm opacity-50">2022 – 2024</span>
    <span class="px-4 py-1.5 bg-gray-100 rounded-md text-sm">ChatGPT</span>
    <span class="px-4 py-1.5 bg-gray-100 rounded-md text-sm">Claude</span>
  </div>
  <div v-click="[3,4]" class="absolute inset-0 flex items-center justify-center gap-5 transition-opacity duration-300">
    <span class="text-sm opacity-50">2024 – 2025</span>
    <span class="px-4 py-1.5 bg-gray-100 rounded-md text-sm">Cursor</span>
    <span class="px-4 py-1.5 bg-gray-100 rounded-md text-sm">Windsurf</span>
  </div>
  <div v-click="4" class="absolute inset-0 flex items-center justify-center gap-5 transition-opacity duration-300">
    <span class="text-sm opacity-50">2025 –</span>
    <span class="px-4 py-1.5 bg-teal-50 rounded-md text-sm text-teal-600 font-medium">Claude Code</span>
    <span class="px-4 py-1.5 bg-teal-50 rounded-md text-sm text-teal-600 font-medium">Codex</span>
  </div>
</div>

---

# Chatbot 阶段

网页对话框是主要的交互模式

<v-clicks>

- GPT-3.5、GPT-4o 时代，大家用的基本是网页版
- 一问一答的对话框
- 写代码？靠 **复制粘贴**
- 模型很强，但 **只能说不能做**

</v-clicks>

<div v-click class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">

模型的能力被交互形式限制了 —— 它能写出正确的命令，但没人替它执行

</div>

---

# Agent 是什么

<div class="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200 text-lg font-medium text-center">

An LLM agent runs tools in a loop to achieve a goal.

</div>

<v-clicks>

<div class="mt-6">

**原理其实很简单**：模型可以生成"命令"，然后本地的程序负责执行，并把结果返回给它。

</div>

<div class="mt-2 text-sm">

模型的训练语料包含大量 CLI 命令（`grep`、`cat`、`find` 等），所以它天然会生成这些命令 —— Agent 负责执行。

</div>

<div class="mt-4 text-sm">

**Tool Use 就两件事：**

1. 你告诉模型有哪些工具可用
2. 模型想用工具时告诉你调什么、传什么参数 → 你执行 → 把结果发回去

</div>

</v-clicks>

<div v-click class="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-sm">

**万物皆可**：联网搜索、截图、读取本地文件（Word、Excel 等）、通过 MCP 操作其他应用 —— 只要能封装成工具，Agent 就能调用

</div>

---

# Agent 工作流程

以"帮我读取 report.txt 并写个摘要"为例

<div class="mt-2">
  <div class="grid grid-cols-3 text-center text-xs font-medium">
    <div><span class="px-3 py-1 bg-purple-100 rounded-md">用户</span></div>
    <div><span class="px-3 py-1 bg-teal-100 rounded-md">Agent（本地程序 + 工具）</span></div>
    <div><span class="px-3 py-1 bg-violet-100 rounded-md">LLM（云端模型）</span></div>
  </div>
</div>

<div class="relative mt-1">
  <div class="absolute inset-0 grid grid-cols-3 pointer-events-none opacity-20">
    <div class="flex justify-center"><div class="border-l border-dashed border-gray-400 h-full"></div></div>
    <div class="flex justify-center"><div class="border-l border-dashed border-gray-400 h-full"></div></div>
    <div class="flex justify-center"><div class="border-l border-dashed border-gray-400 h-full"></div></div>
  </div>

  <div class="relative text-xs py-2 space-y-1">

  <div v-click class="grid grid-cols-3 py-1">
    <div class="flex items-center justify-end pr-2"><span class="text-gray-400 text-[10px]">────</span></div>
    <div class="flex items-center"><span class="text-teal-500 mr-1">▸</span>"帮我读取 report.txt 并写摘要"</div>
    <div></div>
  </div>

  <div v-click class="grid grid-cols-3 py-1">
    <div></div>
    <div class="flex items-center justify-end pr-2"><span class="text-gray-400 text-[10px]">────</span></div>
    <div class="flex items-center"><span class="text-teal-500 mr-1">▸</span>[系统提示 + 可用工具列表 + 用户请求]</div>
  </div>

  <div v-click class="grid grid-cols-3 py-1">
    <div></div>
    <div class="flex items-center"><span class="text-violet-500 mr-1">◂</span>调用 <code class="text-[10px]">read_file("report.txt")</code></div>
    <div class="flex items-center justify-end pr-2"><span class="text-gray-400 text-[10px]">────</span></div>
  </div>

  <div v-click class="grid grid-cols-3 py-1">
    <div></div>
    <div class="flex items-center justify-center"><span class="px-3 py-0.5 bg-teal-50 rounded border border-teal-200 text-teal-600">⚙ Agent 执行工具：读取文件内容</span></div>
    <div></div>
  </div>

  <div v-click class="grid grid-cols-3 py-1">
    <div></div>
    <div class="flex items-center justify-end pr-2"><span class="text-gray-400 text-[10px]">────</span></div>
    <div class="flex items-center"><span class="text-teal-500 mr-1">▸</span>[返回文件内容]</div>
  </div>

  <div v-click class="grid grid-cols-3 py-1">
    <div></div>
    <div class="flex items-center"><span class="text-violet-500 mr-1">◂</span>调用 <code class="text-[10px]">write_file("summary.txt", "...")</code></div>
    <div class="flex items-center justify-end pr-2"><span class="text-gray-400 text-[10px]">────</span></div>
  </div>

  <div v-click class="grid grid-cols-3 py-1">
    <div></div>
    <div class="flex items-center justify-center"><span class="px-3 py-0.5 bg-teal-50 rounded border border-teal-200 text-teal-600">⚙ Agent 执行工具：写入摘要文件</span></div>
    <div></div>
  </div>

  <div v-click class="grid grid-cols-3 py-1">
    <div></div>
    <div class="flex items-center justify-end pr-2"><span class="text-gray-400 text-[10px]">────</span></div>
    <div class="flex items-center"><span class="text-teal-500 mr-1">▸</span>[写入成功]</div>
  </div>

  <div v-click class="grid grid-cols-3 py-1">
    <div class="flex items-center"><span class="text-purple-500 mr-1">◂</span></div>
    <div class="flex items-center"><span class="text-purple-400">◂</span><span class="text-gray-400 text-[10px] mx-1">────</span><span class="text-violet-400">◂</span><span class="text-gray-400 text-[10px] ml-1">────</span></div>
    <div class="flex items-center">"已完成，摘要写入 summary.txt"</div>
  </div>

  </div>
</div>

---

# Cursor：人机协作

Agent 进入 IDE

<v-clicks>

- **Tab 补全**：最基础的 AI 辅助 —— 输入几个字符，AI 猜你想写什么
- 模型可以读取你正在打开的文件
- 有 UI 做权限控制（允许/拒绝操作）
- 人在循环中（Human-in-the-loop）—— 每步都需要你确认
- 对当时的模型能力来说，这是合理的安全策略

</v-clicks>

<div v-click class="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm">

### 但侧边栏模式有局限

**交互效率低** · **阻碍自动化** · **不支持 45 分钟级长时任务** · **无法并行多 Agent**

</div>

---

# Claude Code & Codex：CLI 的崛起

模型够强了，该放开手脚

<div v-click class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm italic">

"By keeping these new models in an editor sidebar, we restrict them. They no longer need the hand-holding and really want to kick off their training wheels."

</div>

<v-clicks>

- 从 IDE 侧边栏 → **终端命令行**
- Agent 自己跑 bash、读写文件、运行测试
- 支持"发射后不管"（Fire and forget）的长时异步任务
- 可以并行运行多个 Agent
- **代码库适配**：需要专门为 Agent 编写 CLI 命令、Skills 和工具

</v-clicks>

<div v-click class="mt-4 text-sm text-center opacity-70">

脱离 IDE 的束缚，才能构建真正 "AI 优先" 的工作流

</div>

---

# MCP：给应用以能力

Model Context Protocol — 让 AI 调用外部工具的标准协议

<v-clicks>

- AI Agent 需要和外部世界交互（读文件、查数据库、调 API）
- MCP 提供了标准化的方式来定义这些"工具"，类似 USB：统一接口，即插即用

</v-clicks>

<div v-click class="mt-4 grid grid-cols-3 gap-3 text-sm">
<div class="p-3 bg-teal-50 rounded-lg border border-teal-200">

**GitHub MCP**

操作仓库、Issue、PR

</div>
<div class="p-3 bg-teal-50 rounded-lg border border-teal-200">

**Puppeteer MCP**

浏览器自动化

</div>
<div class="p-3 bg-teal-50 rounded-lg border border-teal-200">

**PostgreSQL MCP**

查询和操作数据库

</div>
</div>

<div v-click class="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm">

**为什么需要 MCP？** —— Agent 不认识二进制格式。UE 的 .uasset 对 AI 就是乱码，Agent 只能通过引擎来操作：<br/>Agent → 引擎 MCP → .uasset

</div>

---

# 当 MCP 太重了

MCP 的代价：每个工具定义都占 Context

<div v-click class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm italic">

"Many of the most popular MCP servers are inefficient. They need to cover all bases, which means they provide large numbers of tools with lengthy descriptions, consuming significant context."

</div>

<v-clicks>

- MCP 工具越多，Token 消耗越大 —— Context 是稀缺资源
- 但模型的训练语料里本来就有 CLI 命令 —— `grep`、`git`、`curl` 它都会用
- **CLI 是天然的 Agent 工具**：无需额外定义，模型已经熟悉，输出文本化

</v-clicks>

<div v-click class="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200 text-sm">

**适用场景**：当任务可以用标准 CLI 完成时，不需要 MCP —— 简单、省 Token、模型更熟悉

</div>

---

# Skill：渐进式披露

CLI 的下一步 —— 从"给工具"到"教技能"

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

### MCP / CLI 的局限

<v-clicks>

- MCP：一次性加载所有工具，Token 浪费
- CLI：轻量但缺乏领域知识
- 复杂任务需要 **大量上下文** 才能做好

</v-clicks>

</div>
<div>

### Skill 的做法

<v-clicks>

- **文件分发**：按需加载相关上下文
- **渐进式披露**：先给概要，需要时再给细节
- 大幅减少 Token 消耗
- 适合复杂的、需要领域知识的任务

</v-clicks>

</div>
</div>

<div v-click class="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200 text-sm">

**例子**：Claude Code 的 Skill —— 不是一次性把所有文档塞给模型，而是先给一份概要目录，模型需要某个功能的细节时再去读对应的参考文件

</div>

---

# 龙虾：一个完整的 Agent 系统

OpenClaw — 构建生产级 Agent 需要的核心组件

<div class="grid grid-cols-2 gap-x-8 gap-y-3 mt-4 text-sm">
<div v-click class="p-2 bg-gray-50 rounded border border-gray-200">

**Persistent Sessions** — 持久化会话

</div>
<div v-click class="p-2 bg-gray-50 rounded border border-gray-200">

**SOUL.md** — 赋予 Agent 人格

</div>
<div v-click class="p-2 bg-gray-50 rounded border border-gray-200">

**Adding Tools** — 扩展工具集

</div>
<div v-click class="p-2 bg-gray-50 rounded border border-gray-200">

**Permission Controls** — 权限管控

</div>
<div v-click class="p-2 bg-teal-50 rounded border border-teal-200">

**The Gateway** — 网关路由

</div>
<div v-click class="p-2 bg-teal-50 rounded border border-teal-200">

**Context Compaction** — 上下文压缩

<span class="text-xs opacity-70">塞得越多，每条信息被正确利用的概率越低 —— 本质是提高信噪比</span>

</div>
<div v-click class="p-2 bg-teal-50 rounded border border-teal-200">

**Long-Term Memory** — 长期记忆

</div>
<div v-click class="p-2 bg-teal-50 rounded border border-teal-200">

**Command Queue** — 命令队列

</div>
<div v-click class="p-2 bg-emerald-50 rounded border border-emerald-200">

**Cron Jobs (Heartbeats)** — 定时任务

</div>
<div v-click class="p-2 bg-emerald-50 rounded border border-emerald-200">

**Multi-Agent** — 多 Agent 协作

</div>
</div>

---
clicks: 1
---

# 约束：有限的 Context vs 膨胀的任务

<ContextConstraint :step="$clicks" />

---

# Build for Agents：Context 管理

向 AI 提供信息需要精确取舍 —— AI 喜欢文档、喜欢 CLI 工具

<v-clicks>

- AI 读文档比人快，调用 CLI 也比人熟练 —— 喂给它的形式要 **文本化、结构化**
- 所有的隐性信息需要 <span v-mark="{ at: 3, type: 'underline', color: '#14b8a6' }">显性化</span> —— 对 Agent 来说，看不到的等于不存在

</v-clicks>

<div v-click class="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400 text-sm italic">

"Google Docs 里的讨论、Slack 上的对齐、团队成员脑子里的隐含知识，对 Agent 来说统统是空白。解决方案是把知识推入 repo，用 markdown 取代口头沟通。"

</div>

<div v-click class="mt-3 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400 text-sm">

**Progressive Disclosure**：用一个短小的入口文件（如 `AGENTS.md`，约 100 行）作为地图，指向更深层的知识。Agent 从稳定的小入口起步，被教会在哪里找下一步 —— 而不是一开始就被淹没。

</div>

<div v-click class="mt-3 text-sm opacity-70 text-center">

模块化、接口边界、命名规范 —— 工程实践本质上都在 <strong>提高信噪比</strong>

</div>

---

# Harness Engineering

Agent 不只需要模型 —— 它需要一整套 **脚手架（Harness）**

<div class="text-xs opacity-60 mt-3 italic">这部分内容本身可以单独开一次分享给程序同学</div>

<div v-click class="mt-3">
  <div class="text-xs mb-1 opacity-60 font-medium">一个完整的 Harness 包含什么？</div>
  <div class="flex flex-wrap gap-2 text-xs">
    <span v-click class="px-2 py-1 bg-teal-100 rounded border border-teal-200">System Prompts / CLAUDE.md / AGENTS.md</span>
    <span v-click class="px-2 py-1 bg-teal-100 rounded border border-teal-200">Tools / Skills / MCP servers</span>
    <span v-click class="px-2 py-1 bg-amber-100 rounded border border-amber-200">Sandbox / 文件系统 / 浏览器</span>
    <span v-click class="px-2 py-1 bg-amber-100 rounded border border-amber-200">编排逻辑（子 Agent、模型路由）</span>
    <span v-click class="px-2 py-1 bg-emerald-100 rounded border border-emerald-200">Hooks（压缩、续写、lint）</span>
    <span v-click class="px-2 py-1 bg-emerald-100 rounded border border-emerald-200">可观测性（日志、成本、延迟）</span>
  </div>
</div>

<div v-click class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">

### MHC 框架：Model + Harness + Context

<div class="grid grid-cols-3 gap-3 mt-3 text-sm text-center">
  <div class="p-2 bg-teal-50 rounded border border-teal-200"><strong>Model</strong><br/>会越来越强</div>
  <div class="p-2 bg-amber-50 rounded border border-amber-200"><strong>Harness</strong><br/>始终需要工具/脚手架</div>
  <div class="p-2 bg-emerald-50 rounded border border-emerald-200"><strong>Context</strong><br/>你的记忆比以往更重要</div>
</div>

</div>

---

# Build for Agents：适合的任务

什么样的任务适合交给 Agent？

<div class="mt-4 grid grid-cols-3 gap-4">
<div v-click class="p-4 bg-teal-50 rounded-lg border border-teal-200 text-center">
  <carbon-renew class="text-3xl text-teal-600 mb-2 mx-auto" />

**Feedback Loop**

让 Agent 能验证自己的输出：跑测试、看编译报错、检查截图

</div>
<div v-click class="p-4 bg-amber-50 rounded-lg border border-amber-200 text-center">
  <carbon-cube class="text-3xl text-amber-600 mb-2 mx-auto" />

**Sandbox**

安全的试错环境：它可以放心尝试，不怕搞坏生产环境

</div>
<div v-click class="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
  <carbon-checkmark-outline class="text-3xl text-emerald-600 mb-2 mx-auto" />

**易于 Verify**

清晰的 diff、可复现的步骤、自动化检查

</div>
</div>

<div v-click class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm italic">

**The Building Block Economy**: AI is okay at building from scratch, but it is *really good* at gluing together high-quality, well-documented, and proven components.

</div>

<div v-click class="mt-2 text-center text-sm">

**核心原则**：让 Agent 能 <span v-mark="{ at: 6, type: 'underline', color: '#14b8a6' }">自己验证自己的输出</span>

</div>

---
layout: new-section
---

# Part 3: 游戏

AI 与游戏开发

---

# AI 在游戏中的几条路

游戏是给人的，核心是互动 —— 给人的 <u>多模态体验</u> 设计

<div class="mt-4 grid grid-cols-3 gap-3">

<div v-click class="p-4 bg-teal-50 rounded-lg border border-teal-200">

### AI 辅助制作

<div class="text-xs space-y-1 mt-2">
<div class="p-1 bg-white/60 rounded">AIGC 前期验证、资产生成</div>
<div class="p-1 bg-white/60 rounded">Coding Agent + UE MCP/Skill</div>
</div>

<div class="mt-2 text-xs opacity-70">门槛低，潜力大</div>

</div>

<div v-click class="p-4 bg-amber-50 rounded-lg border border-amber-200">

### AI 进游戏

<div class="text-xs space-y-1 mt-2">
<div class="p-1 bg-white/60 rounded">技术：DLSS、神经贴图压缩</div>
<div class="p-1 bg-white/60 rounded">玩法：数字人、智能 NPC</div>
</div>

<div class="mt-2 text-xs opacity-70">已在落地</div>

</div>

<div v-click class="p-4 bg-purple-50 rounded-lg border border-purple-200">

### 纯世界模型

端到端生成 —— Sora、Genie 直接输出画面

<div class="mt-3 text-xs opacity-70">最前沿，最不成熟 —— "给你们全扬了"</div>

</div>

</div>

<div v-click class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs opacity-70 text-center">

游戏引擎是游戏的 OS，极为复杂，不同子系统差别巨大 —— 而且不像 Linux 一样万物皆文件

</div>

---

# World Models vs. Game Engines

端到端生成能取代游戏引擎吗？

<div class="grid grid-cols-2 gap-4 mt-4">

<div v-click class="p-4 bg-purple-50 rounded-lg border border-purple-200">

### World Models

**优势**

- 广博的世界知识
- 能混合各种内容和风格

**劣势**

- 对没学过的规则天然漠视
- <span v-mark="{ at: 2, type: 'underline', color: '#ec4899' }">无法生成 coherent、rule-governed 的玩法</span>

</div>

<div v-click class="p-4 bg-teal-50 rounded-lg border border-teal-200">

### Game Engines

**优势**

- 稳定的世界表示
- 可复现的模拟
- GPU 和功耗效率高

**劣势**

- 人工搭建内容成本高
- 创意受制于预定义规则

</div>

</div>

<div v-click class="mt-4 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400 text-sm">

**结论**：短期内 World Model **不会** 取代游戏引擎做玩法 —— 规则性的互动体验必须依赖确定性的引擎。但两者可以互补，比如引擎负责核心玩法，World Model 做背景内容生成。

</div>

---

# UE 是给人用的

AI 时代需要设计给 Agent 用的接口

<div class="mt-4 text-sm">

**场景**：搭好了关卡，想做潜行玩法 —— AI 能不能帮忙验证？

</div>

<div class="mt-3 space-y-2">
  <div v-click class="flex items-center gap-3 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
    <div class="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center flex-shrink-0">✓</div>
    <div class="flex-1 text-sm">写完代码 + 编译</div>
    <span class="text-xs text-emerald-600 flex-shrink-0">Agent 擅长</span>
  </div>
  <div v-click class="flex items-center gap-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
    <div class="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0">!</div>
    <div class="flex-1 text-sm">自动启动引擎到达测试场景</div>
    <span class="text-xs text-amber-600 flex-shrink-0">需要 GM 命令 / 自动化入口</span>
  </div>
  <div v-click class="flex items-center gap-3 p-2 bg-red-50 rounded-lg border border-red-200">
    <div class="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center flex-shrink-0">✗</div>
    <div class="flex-1 text-sm">控制角色蹲下走到敌人背后，观察警觉指示器</div>
    <span class="text-xs text-red-600 flex-shrink-0">需要视觉 + 精确操作</span>
  </div>
  <div v-click class="flex items-center gap-3 p-2 bg-red-50 rounded-lg border border-red-200">
    <div class="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center flex-shrink-0">✗</div>
    <div class="flex-1 text-sm">暗杀图标出现时点击暗杀（对延迟有要求）</div>
    <span class="text-xs text-red-600 flex-shrink-0">纯 AI 很难做到</span>
  </div>
</div>

<div v-click class="mt-3 text-sm opacity-70 text-center">

**不代表不能解决** —— 但需要我们提供更好的接口，而非依赖纯视觉

</div>

---

# AI 能做的 & QA 很难取代

逻辑和画面分离做得好的地方，AI 能发挥大作用

<v-clicks>

- **杀戮尖塔 CLI**（wuhao21/sts2-cli）：战斗逻辑文本化 → AI 可以自动测试平衡性
- **战斗自动化**：如果战斗系统有干净的 API → AI 可以做大量模拟
- **自动化回归测试**：基于文本日志的流程验证

</v-clicks>

<div v-click class="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">

### 但 QA 很难取代

AI 很难端到端完成游戏功能验证 —— 游戏是给 **人** 设计的，不是给 AI 设计的

做出来是一方面，**细节打磨是另一方面**：动画过渡是否流畅、打击感够不够、按钮反馈对不对 —— 这些"感觉"上的事，很难靠 AI 验证

</div>

---

# 辅助制作

AI 可以在现有工作流中发挥价值

<v-clicks>

- **Code Review**：代码、蓝图、配置都可以让 AI 审查
- **辅助 uasset 生成**：需要改代码 + MCP 封装，case by case 讨论

</v-clicks>

<div v-click class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm italic">

"Tim, can you guys please allow plain text serialization of Unreal assets? Not only will it simplify source control, but it will also let LLMs shine in Unreal dev."

**Tim Sweeney**: "This is in the works, but it's many months away, as it relies on us completing a bunch of Verse/VSON work."

</div>

<div v-click class="mt-4 text-sm opacity-70">

连 Epic 都在考虑让资产对 AI 友好 —— 这是行业方向

</div>

---

# AI 在基建好的时候才能发挥最大作用

<div class="mt-6 space-y-3">
  <div v-click class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
    <div class="w-5 h-5 rounded border-2 border-teal-400 flex-shrink-0 flex items-center justify-center text-teal-500 text-xs">?</div>
    <div>自动测试的 API 是不是全？</div>
  </div>
  <div v-click class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
    <div class="w-5 h-5 rounded border-2 border-teal-400 flex-shrink-0 flex items-center justify-center text-teal-500 text-xs">?</div>
    <div>知识库是不是完整？</div>
  </div>
  <div v-click class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
    <div class="w-5 h-5 rounded border-2 border-teal-400 flex-shrink-0 flex items-center justify-center text-teal-500 text-xs">?</div>
    <div>流程是不是都清晰？</div>
  </div>
  <div v-click class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
    <div class="w-5 h-5 rounded border-2 border-teal-400 flex-shrink-0 flex items-center justify-center text-teal-500 text-xs">?</div>
    <div>逻辑和画面是不是做了良好的分离？</div>
  </div>
</div>

<div v-click class="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-center text-lg">

AI 放大的是你已有的基建质量 —— <span v-mark="{ at: 6, type: 'underline', color: '#10b981' }">基建越好，AI 的杠杆越大</span>

</div>

---
layout: new-section
---

# Part 4: 思考

LLM 与人，各自的优势

---

# Summoning a Ghost

LLM：广博的世界知识 + 短期记忆 + 活在数字世界

<v-clicks>

- 大模型没有真正的推理能力 —— 但它可以显得有，也可以借助外部工具（代码等）"有"
- 它学到 $P(y|x)$（观测条件概率），而非 $P(y|do(x))$（干预因果）—— 是 **因果痕迹压缩器**，不是因果机器
- 日常工作、代码报错、设计套路，前人踩过的坑都在网上 —— AI 只要"见过"，就能瞬间调取

</v-clicks>

<div v-click class="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm italic">

"LLM research is about summoning ghosts — imperfect replicas, a statistical distillation of humanity's documents. It's possible that ghosts:animals :: planes:birds."

</div>

<div v-click class="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm">

**Jagged Frontier** —— 能解多元微积分，却数不对草莓里的 r。能力突破集中在可验证的技术领域，日常场景反而不是 RL 优化的重点。

</div>

---
layout: two-cols
---

# LLM vs. 人

<div class="pr-4">

### LLM 擅长的

<v-clicks>

- 语料多的领域（代码、数学、通用知识）
- 易于验证的任务
- **带宽大** —— 刷刷一下看几十个文件、疯狂爬网页
- 反过来说：私有数据、合规审查、深度业务嵌入 —— 不擅长

</v-clicks>

<div v-click class="mt-3 p-3 bg-gray-50 rounded border border-gray-200 text-xs italic">

"AI will first automate things easier to form closed-loop systems. Software engineering has tight closed loops + high economic value." — Elad Gil

</div>

</div>

::right::

<div class="pl-4 mt-11">

### 人不可替代的

<v-clicks>

- 持续学习 + 长期记忆 + 活在现实世界
- **多样性** —— 对齐是"熵减"，模型趋同；人没有单一损失函数
- **想象力** —— 用古希腊语料训练的 AI 会说"月亮是个女神"

</v-clicks>

<div v-click class="mt-3 p-3 bg-teal-50 rounded-lg border border-teal-200 text-xs">

**The true value is in doing what nobody did before.** Imagination right now is your most important attribute.

</div>

</div>

---

---
layout: center
clicks: 3
---

<AgentSplitView :step="$clicks" />

---

# 明确的趋势

<div class="grid grid-cols-2 gap-4 mt-6">
<div v-click class="p-4 bg-teal-50 rounded-lg border border-teal-200">

### 工具的民主化

写个前端页面、做个可视化、各种小工具 —— 门槛极低

SaaS 股价暴跌的原因之一

</div>
<div v-click class="p-4 bg-amber-50 rounded-lg border border-amber-200">

### 品味 > 编码

大家都能写代码了 → **Taste**、想象力、挖掘需求的能力才是稀缺的

</div>
<div v-click class="p-4 bg-emerald-50 rounded-lg border border-emerald-200">

### Token 经济

给 Agent 的工具会越来越多，Context 是稀缺资源

</div>
<div v-click class="p-4 bg-gray-50 rounded-lg border border-gray-200">

### 数字 vs. 现实

数字世界变化飞快，但真实世界的变化有很多阻力

</div>
</div>

---

# 个人建议

<div class="mt-4">

<v-clicks>

<div class="p-4 mb-4 bg-teal-50 rounded-lg border border-teal-200">

**1. 不 FOMO，自己体验**

每个月看下最强的模型什么样就行了。少看机器之心、量子位、新智元的标题党，多上手试。

</div>

<div class="p-4 mb-4 bg-amber-50 rounded-lg border border-amber-200">

**2. Build for Agent，建立直觉**

一切可让 Agent 自己快速验证的问题，终将被 AI 解决。发现痛点 → 判断是否适合 AI → 适合，我们来自动化。

</div>

<div class="p-4 bg-emerald-50 rounded-lg border border-emerald-200">

**3. 对产品负责的还是我们自己**

AI 是工具，不是决策者。最终的产品质量、用户体验，责任在我们。

</div>

</v-clicks>

</div>

---

# 保护自己的注意力

Attention is all **we** have

<div v-click class="mt-6 flex items-center justify-center gap-4">
  <div class="px-6 py-4 bg-gradient-to-t from-amber-200 to-amber-50 rounded-lg border border-amber-300 text-center">
    <div class="text-2xl font-mono font-bold text-amber-600">?</div>
    <div class="text-xs mt-1 font-medium opacity-70">Token</div>
  </div>
  <div class="px-6 py-4 bg-gradient-to-t from-amber-200 to-amber-50 rounded-lg border border-amber-300 text-center">
    <div class="text-2xl font-mono font-bold text-amber-600">?</div>
    <div class="text-xs mt-1 font-medium opacity-70">老虎机</div>
  </div>
  <div class="px-6 py-4 bg-gradient-to-t from-amber-200 to-amber-50 rounded-lg border border-amber-300 text-center">
    <div class="text-2xl font-mono font-bold text-amber-600">?</div>
    <div class="text-xs mt-1 font-medium opacity-70">上瘾</div>
  </div>
</div>

<div v-click class="mt-4 text-center text-sm">

你在和一个 **概率系统** 协作，但你的大脑习惯 **确定性系统** —— 这种错配是持续的低级压力源

</div>

<div v-click class="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">

### "Just one more prompt" 陷阱

<span v-mark="{ at: 4, type: 'highlight', color: '#f59e0b' }">三次法则</span>：如果三次 prompt 没有让 AI 做到 70% 可用，就自己写。没有例外。

</div>

---

# 建立"这个问题是否适合 AI"的直觉

<v-clicks>

- AI 不是万能锤子，不要看什么都像钉子
- 当自动化带上了一定的智力，关键是判断 **何时需要这份智力**

</v-clicks>

<div v-click class="mt-6">

```mermaid {scale: 0.85}
graph LR
    A["发现痛点"] --> B{"适合 AI 吗？"}
    B -->|"是"| C["用 AI 自动化"]
    B -->|"脚本就够了"| D["写个脚本"]
    B -->|"需要人判断"| E["人来做"]
    style A fill:#e0f2fe,stroke:#14b8a6
    style B fill:#fef3c7,stroke:#f59e0b
    style C fill:#dcfce7,stroke:#22c55e
    style D fill:#dcfce7,stroke:#22c55e
    style E fill:#dcfce7,stroke:#22c55e
```

</div>

<div v-click class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-center italic">

"If a task is solvable and it's easy to verify, then it's going to get solved by AI." — Verifier's Law

</div>

---
layout: center
class: text-center
---

# 谢谢

<div class="mt-4 text-lg opacity-70">

AI 在飞速进步，但游戏是做给人玩的

我们要做的是：<span v-mark="{ at: 1, type: 'underline', color: '#14b8a6' }">理解 AI 的能力边界</span>，<span v-mark="{ at: 2, type: 'underline', color: '#10b981' }">用好它</span>，<span v-mark="{ at: 3, type: 'underline', color: '#f59e0b' }">然后专注于人的价值</span>

</div>

<div v-click class="mt-8 p-3 bg-teal-50 rounded-lg border border-teal-200 text-sm max-w-xl mx-auto">

有问题尽管问 —— 反正都可以问 AI，AI 比我强多了<br/>
<span class="text-xs opacity-60">能问 AI 关于 AI 的问题，是今天分享的目的</span>

</div>

<div class="mt-6 text-sm opacity-40">
Q & A
</div>
