<template>
  <div class="timeline-stage" :class="{ active }">
    <div class="stage-dot" />
    <div class="stage-content">
      <div class="stage-label">{{ label }}</div>
      <div class="stage-title">{{ title }}</div>
      <div class="stage-desc"><slot /></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  title: { type: String, required: true },
  active: { type: Boolean, default: false },
})
</script>

<style scoped>
.timeline-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  padding: 0 8px;
}

.timeline-stage::after {
  content: '';
  position: absolute;
  top: 10px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #cbd5e1;
}

.timeline-stage:last-child::after {
  display: none;
}

.stage-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #cbd5e1;
  border: 3px solid #e2e8f0;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.timeline-stage.active .stage-dot {
  background: #14b8a6;
  border-color: #99f6e4;
  box-shadow: 0 0 14px rgba(20, 184, 166, 0.55);
}

.stage-content {
  margin-top: 18px;
  text-align: center;
}

.stage-label {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 6px;
}

.timeline-stage.active .stage-label {
  color: #14b8a6;
}

.stage-title {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
  line-height: 1.3;
}

.stage-desc {
  font-size: 15px;
  color: #64748b;
  line-height: 1.5;
}
</style>
