<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: Object,
  field1: String,
  field2: String,
  label1: { type: String, default: 'The promise' },
  label2: { type: String, default: 'Assessment' },
})

const BADGE_LABEL = {
  kept: 'Kept',
  broken: 'Broken',
  partial: 'Partial',
  pending: 'In progress',
  fixed: 'Fixed',
}

const expanded = ref(false)
</script>

<template>
  <div :class="['pt-card', { expanded }]" @click="expanded = !expanded">
    <div class="pt-card-header">
      <div class="pt-card-meta">
        <div class="pt-card-category">{{ item.category }}</div>
        <div class="pt-card-title">{{ item.title }}</div>
      </div>
      <div class="pt-card-right">
        <span :class="['pt-badge', `pt-badge-${item.status}`]">
          {{ BADGE_LABEL[item.status] }}
        </span>
        <span class="pt-chevron">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M2.5 4.5L6.5 8.5L10.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>

    <div class="pt-card-detail-wrap">
      <div class="pt-card-detail-inner">
        <div class="pt-card-detail">
          <div class="pt-detail-grid">
            <div>
              <div class="pt-detail-label">{{ label1 }}</div>
              <div class="pt-detail-text">{{ field1 }}</div>
            </div>
            <div>
              <div class="pt-detail-label">{{ label2 }}</div>
              <div class="pt-detail-text">{{ field2 }}</div>
            </div>
          </div>
          <div class="pt-detail-footer">
            <span>Source:</span>
            <a
              class="pt-source-link"
              :href="item.source"
              target="_blank"
              @click.stop
            >{{ item.sourceLabel }}</a>
            <span>· Updated {{ item.updated }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
