<script setup>
const props = defineProps({
  tokens: { type: Array, required: true },
  step: { type: Number, default: 0.2 },
  trailing: { type: String, default: '…' },
})
</script>

<template>
  <div class="font-mono text-base flex flex-wrap gap-x-1 gap-y-2 items-center leading-loose">
    <template v-for="(t, i) in props.tokens" :key="i">
      <span class="token-pop" :style="{ animationDelay: (i * props.step) + 's' }">{{ t }}</span>
      <span v-if="i < props.tokens.length - 1" class="text-gray-300 text-xs">→</span>
    </template>
    <span
      v-if="props.trailing"
      class="token-pop text-gray-400"
      :style="{ animationDelay: (props.tokens.length * props.step) + 's' }"
    >{{ props.trailing }}</span>
  </div>
</template>
