<script setup>
// Grid layout: 11 cols (box|arr|box|arr|box|arr|box|arr|box|arr|box), 5 rows
// Row1=输入/输出, Row2=↓↑ connectors, Row3=main pipeline, Row4=↓↑ loop connectors, Row5=自回归
</script>

<template>
  <div class="text-xs" style="display:grid; grid-template-columns:repeat(11,auto); grid-template-rows:auto 0.75rem auto 0.75rem auto; align-items:center; justify-items:center; column-gap:0.375rem; row-gap:0;">

    <!-- Row1: 输入文本 (col1) · 输出文本 (col11) -->
    <div style="grid-column:1;grid-row:1" class="px-2 py-2 rounded border bg-teal-100 border-teal-300 text-center w-full">
      输入文本<br/><span class="opacity-70">"今天天气"</span>
    </div>
    <div style="grid-column:11;grid-row:1" class="px-2 py-2 rounded border bg-teal-100 border-teal-300 text-center w-full">
      输出文本<br/><span class="opacity-70">"好"</span>
    </div>

    <!-- Row2: ↓ (col1) · ↑ (col11) -->
    <div style="grid-column:1;grid-row:2" class="opacity-40"><carbon-arrow-down /></div>
    <div style="grid-column:11;grid-row:2" class="opacity-40"><carbon-arrow-up /></div>

    <!-- Row3: main pipeline -->
    <div style="grid-column:1;grid-row:3" class="px-2 py-2 rounded border bg-teal-100 border-teal-300 text-center w-full">
      Tokenizer<br/><span class="opacity-70">切分成 Token</span>
    </div>
    <div style="grid-column:2;grid-row:3" class="opacity-40"><carbon-arrow-right /></div>
    <div style="grid-column:3;grid-row:3" class="px-2 py-2 rounded border bg-amber-100 border-amber-300 text-center w-full">
      Embedding<br/><span class="opacity-70">映射为向量</span>
    </div>
    <div style="grid-column:4;grid-row:3" class="opacity-40"><carbon-arrow-right /></div>
    <div style="grid-column:5;grid-row:3" class="px-2 py-2 rounded border bg-violet-100 border-violet-300 text-center w-full">
      Transformer<br/><span class="opacity-70">神经网络（黑盒）</span>
    </div>
    <div style="grid-column:6;grid-row:3" class="opacity-40"><carbon-arrow-right /></div>
    <div style="grid-column:7;grid-row:3" class="px-2 py-2 rounded border bg-amber-100 border-amber-300 text-center w-full">
      概率分布<br/><span class="opacity-70">每个词的可能性</span>
    </div>
    <div style="grid-column:8;grid-row:3" class="opacity-40"><carbon-arrow-right /></div>
    <div style="grid-column:9;grid-row:3" class="px-2 py-2 rounded border bg-emerald-100 border-emerald-300 text-center w-full">
      采样器<br/><span class="opacity-70">选出一个 Token</span>
    </div>
    <div style="grid-column:10;grid-row:3" class="opacity-40"><carbon-arrow-right /></div>
    <div style="grid-column:11;grid-row:3" class="px-2 py-2 rounded border bg-teal-100 border-teal-300 text-center w-full">
      Detokenizer<br/><span class="opacity-70">还原为文本</span>
    </div>

    <!-- Row4: ↓ (col9, 采样器→自回归) · ↑ (col3, 自回归→Embedding) -->
    <div style="grid-column:9;grid-row:4" class="opacity-40"><carbon-arrow-down /></div>
    <div style="grid-column:3;grid-row:4" class="opacity-40"><carbon-arrow-up /></div>

    <!-- Row5: 自回归 spanning col3→col9 -->
    <div style="grid-column:3/span 7;grid-row:5" class="w-full px-3 py-1.5 rounded border bg-amber-100 border-amber-300 text-center">
      ↩ 自回归 —— 新 Token 加入输入，回到 Embedding
    </div>

  </div>
</template>
