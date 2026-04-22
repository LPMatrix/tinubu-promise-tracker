<script setup>
import { computed } from 'vue'

const props = defineProps({
  history: { type: Array, default: () => [] },
})

const TOTAL   = 46
const BAR_W   = 44
const GAP     = 16
const H       = 180
const LABEL_H = 24

const svgW = computed(() => props.history.length * (BAR_W + GAP) + GAP)
const svgH = H + LABEL_H

const LAYERS = [
  { key: 'pending', color: 'var(--pt-border)' },
  { key: 'broken',  color: 'var(--pt-broken)' },
  { key: 'partial', color: 'var(--pt-partial)' },
  { key: 'kept',    color: 'var(--pt-kept-bar)' },
]

function segments(snap) {
  let cumH = 0
  return LAYERS.map(layer => {
    const h = (snap[layer.key] / TOTAL) * H
    const seg = { color: layer.color, y: H - cumH - h, height: h }
    cumH += h
    return seg
  })
}

function barX(i) {
  return i * (BAR_W + GAP) + GAP
}
</script>

<template>
  <div class="pt-chart">
    <div class="pt-chart-title">Progress over time</div>
    <div class="pt-chart-scroll">
      <svg
        :viewBox="`0 0 ${svgW} ${svgH}`"
        :style="{ width: svgW + 'px', height: svgH + 'px' }"
        class="pt-chart-svg"
      >
        <g v-for="(snap, i) in history" :key="snap.label">
          <rect
            v-for="seg in segments(snap)"
            :key="seg.color"
            :x="barX(i)"
            :y="seg.y"
            :width="BAR_W"
            :height="Math.max(seg.height, 0)"
            :fill="seg.color"
          />
          <text
            :x="barX(i) + BAR_W / 2"
            :y="H + 17"
            text-anchor="middle"
            class="pt-chart-label"
          >{{ snap.label }}</text>
        </g>
      </svg>
    </div>
    <div class="pt-legend pt-chart-legend">
      <div class="pt-legend-item"><span class="pt-legend-dot kept"></span> Kept</div>
      <div class="pt-legend-item"><span class="pt-legend-dot partial"></span> Partial</div>
      <div class="pt-legend-item"><span class="pt-legend-dot broken"></span> Broken</div>
      <div class="pt-legend-item"><span class="pt-legend-dot pending"></span> In progress</div>
    </div>
  </div>
</template>
