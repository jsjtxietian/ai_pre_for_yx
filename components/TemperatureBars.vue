<script setup>
defineProps({
  temp: { type: String, required: true },
  label: { type: String, required: true },
  bars: { type: Array, required: true },
})
</script>

<template>
  <div>
    <div class="text-xs mb-1 opacity-60">Temperature {{ temp }} ({{ label }})</div>
    <div class="flex items-end gap-1 h-14 mb-3">
      <div
        v-for="(b, i) in bars"
        :key="i"
        class="flex-1 rounded-t flex items-end justify-center text-[10px] pb-0.5"
        :class="[b.color, b.text || '']"
        :style="{ height: b.height + '%' }"
      >{{ b.label || '' }}</div>
    </div>
  </div>
</template>
