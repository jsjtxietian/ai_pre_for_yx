<script setup>
const steps = [
  { label: '输入文本', sub: '"今天天气"', color: 'teal' },
  { label: 'Tokenizer', sub: '切分成 Token', color: 'teal' },
  { label: 'Embedding', sub: '映射为向量', color: 'amber' },
  { label: 'Transformer', sub: '神经网络（黑盒）', color: 'violet' },
  { label: '概率分布', sub: '每个词的可能性', color: 'amber' },
  { label: '采样器', sub: '选出一个 Token', color: 'emerald' },
]

const colorMap = {
  teal: 'bg-teal-100 border-teal-300',
  amber: 'bg-amber-100 border-amber-300',
  violet: 'bg-violet-100 border-violet-300',
  emerald: 'bg-emerald-100 border-emerald-300',
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 text-sm flex-wrap">
    <template v-for="(s, i) in steps" :key="s.label">
      <div
        v-click
        class="px-3 py-2 rounded border text-center"
        :class="colorMap[s.color]"
      >
        {{ s.label }}<br/>
        <span class="text-xs opacity-70">{{ s.sub }}</span>
      </div>
      <div v-after v-if="i < steps.length - 1" class="opacity-40">
        <carbon-arrow-right />
      </div>
    </template>
  </div>
</template>
