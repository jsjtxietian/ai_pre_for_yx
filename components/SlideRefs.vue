<script setup>
defineProps({
  refs: { type: Array, required: true },
})
</script>

<template>
  <div class="slide-refs">
    Ref:
    <template v-for="(r, i) in refs" :key="i">
      <a :href="r.url" target="_blank" rel="noopener">{{ r.label }}</a><span v-if="i < refs.length - 1"> · </span>
    </template>
  </div>
</template>

<style scoped>
.slide-refs {
  position: fixed;
  left: 3.37rem;
  bottom: 0.5rem;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 1;
  z-index: 50;
  pointer-events: auto;
}
.slide-refs a {
  color: rgba(20, 184, 166, 0.9);
  text-decoration: none;
}
.slide-refs a:hover {
  text-decoration: underline;
}
</style>
