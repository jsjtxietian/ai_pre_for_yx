<script setup>
defineProps({
  step: { type: Number, default: 0 },
})
</script>

<template>
  <div class="absolute inset-0 flex overflow-hidden">
    <!-- Left: Current (muted) -->
    <div
      class="w-[38%] bg-slate-50 flex flex-col items-center justify-center px-8 transition-all duration-700"
      :class="step >= 1 ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase mb-4">当前</div>
      <div class="text-xl font-bold text-slate-500 mb-5">人 → 多 Agent</div>
      <div class="flex items-center gap-1.5">
        <carbon-user class="text-2xl text-slate-400" />
        <carbon-arrow-right class="text-lg text-slate-300" />
        <carbon-bot class="text-2xl text-slate-300" />
        <carbon-bot class="text-2xl text-slate-300" />
        <carbon-bot class="text-2xl text-slate-300" />
      </div>
      <div class="text-sm text-slate-400 mt-4 text-center">人工编排<br/>注意力是瓶颈</div>
    </div>

    <div class="w-px bg-slate-200 self-stretch" />

    <!-- Right: Future (bold) -->
    <div
      class="flex-1 flex flex-col items-center justify-center px-10 transition-all duration-700"
      :class="step >= 2 ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-xs font-bold text-teal-500 tracking-[0.2em] uppercase mb-4">下一阶段</div>
      <div class="text-[4.5rem] font-black text-teal-700 leading-none tracking-tight">Agent ↔ Agent</div>
      <div class="flex items-center gap-2 mt-6">
        <carbon-bot class="text-2xl text-teal-500" />
        <carbon-connect class="text-lg text-teal-400" />
        <carbon-bot class="text-2xl text-teal-500" />
        <carbon-connect class="text-lg text-teal-400" />
        <carbon-bot class="text-2xl text-teal-500" />
      </div>
      <div class="text-base text-teal-600 mt-4">自主循环，人做策略与兜底</div>
    </div>
  </div>

  <div class="absolute top-6 left-8 z-10">
    <div class="text-lg font-bold text-slate-800">协作范式在变</div>
  </div>

  <div
    class="absolute bottom-8 left-[38%] right-0 text-center text-base text-slate-400 transition-opacity duration-500"
    :class="step >= 3 ? 'opacity-100' : 'opacity-0'"
  >
    直接驱动因子：开发者注意力稀缺
  </div>
</template>
