<script setup>
defineProps({
  step: { type: Number, default: 0 },
})
</script>

<template>
  <div>
    <div :class="[step >= 1 ? 'mt-6' : 'mt-24', 'flex items-center gap-6 transition-all duration-700 ease-out']">
      <div class="flex-1 text-center p-5 rounded-xl border border-teal-200 bg-teal-50">
        <carbon-chip class="text-3xl text-teal-500 mb-2" />
        <div class="font-bold text-lg text-slate-800">模型 Context</div>
        <div class="text-sm opacity-60 mt-1">SOTA Model - 200~400k</div>
        <div class="text-2xl font-bold mt-2 text-teal-800">始终有限</div>
      </div>

      <carbon-arrows-horizontal class="text-3xl opacity-30 flex-shrink-0" />

      <div class="flex-1 text-center p-5 rounded-xl border border-gray-200 bg-gray-50">
        <carbon-task class="text-3xl text-gray-500 mb-2" />
        <div class="font-bold text-lg text-slate-800">实际任务</div>
        <div class="text-sm opacity-60 mt-1">代码库、需求、约定、历史决策…</div>
        <div class="text-2xl font-bold mt-2 text-slate-700">不断膨胀</div>
      </div>
    </div>

    <div :class="[step >= 1 ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-700 ease-out delay-300']">
      <div class="mt-5 text-sm opacity-50 text-center">1M 上下文不是万灵丹——塞得越多，问题越明显</div>

      <div class="mt-3 grid grid-cols-3 gap-4">
        <div class="p-3 rounded-lg bg-red-50 border border-red-100 text-center">
          <carbon-finance class="text-xl text-red-400 mb-1" />
          <div class="text-sm font-bold text-red-800">推理成本飙升</div>
          <div class="text-xs text-red-700 mt-1">Context 越长，耗时和费用急剧增长</div>
        </div>
        <div class="p-3 rounded-lg bg-orange-50 border border-orange-100 text-center">
          <carbon-search-locate class="text-xl text-orange-400 mb-1" />
          <div class="text-sm font-bold text-orange-800">Recall 成功率下降</div>
          <div class="text-xs text-orange-700 mt-1">信息越多，关键内容越容易被淹没</div>
        </div>
        <div class="p-3 rounded-lg bg-yellow-50 border border-yellow-100 text-center">
          <carbon-view-off class="text-xl text-yellow-600 mb-1" />
          <div class="text-sm font-bold text-yellow-900">注意力涣散</div>
          <div class="text-xs text-yellow-800 mt-1">模型难以聚焦，输出质量不稳定</div>
        </div>
      </div>
    </div>
  </div>
</template>
