<script setup>
const props = defineProps({
  item:       { type: Object,  required: true },
  field1:     { type: String,  required: true },
  field2:     { type: String,  required: true },
  field3:     { type: String,  default: null },
  label1:     { type: String,  default: 'The promise' },
  label2:     { type: String,  default: 'Assessment' },
  label3:     { type: String,  default: 'Govt response' },
  isExpanded: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle', 'share'])

const BADGE_LABEL = {
  // promises
  kept:         'Kept',
  broken:       'Broken',
  partial:      'Partial',
  pending:      'In progress',
  fixed:        'Fixed',
  // fraud case status
  convicted:    'Convicted',
  ongoing:      'Ongoing',
  dismissed:    'Dismissed',
  acquitted:    'Acquitted',
  // fraud govt response
  pursuing:     'Pursuing',
  stalled:      'Stalled',
  political:    'Politicised',
  abandoned:    'Abandoned',
  complied:     'No interference',
  // orders
  implemented:  'Implemented',
  reversed:     'Reversed',
  ignored:      'Ignored',
  // ministers
  good:         'Good',
  fair:         'Fair',
  poor:         'Poor',
  sacked:       'Sacked',
  resigned:     'Resigned',
  // bills
  passed:       'Passed',
  // judgments
  won:          'Govt Won',
  lost:         'Govt Lost',
  settled:      'Settled',
  // appointments
  serving:      'Serving',
}
</script>

<template>
  <div :class="['pt-card', { expanded: isExpanded }]" @click="emit('toggle', item.id)">
    <div class="pt-card-header">
      <div class="pt-card-meta">
        <div class="pt-card-category">{{ item.category }}</div>
        <div class="pt-card-title">{{ item.title }}</div>
      </div>
      <div class="pt-card-right">
        <!-- Primary status badge -->
        <span :class="['pt-badge', `pt-badge-${item.status}`]">
          {{ BADGE_LABEL[item.status] }}
        </span>
        <!-- Secondary response verdict badge (fraud tab) -->
        <span
          v-if="item.responseVerdict"
          :class="['pt-badge', 'pt-badge-response', `pt-badge-rv-${item.responseVerdict}`]"
        >{{ BADGE_LABEL[item.responseVerdict] }}</span>
        <button
          class="pt-share-btn"
          :title="`Copy link to #${item.id}`"
          @click.stop="emit('share', item.id)"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M8 1.5h3.5v3.5M11.5 1.5L7 6M5.5 2.5H2a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
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
          <!-- Third field: government response narrative -->
          <div v-if="field3" class="pt-detail-response">
            <div class="pt-detail-label">{{ label3 }}</div>
            <div class="pt-detail-text">{{ field3 }}</div>
          </div>
          <div class="pt-detail-footer">
            <span>Source:</span>
            <a class="pt-source-link" :href="item.source" target="_blank" @click.stop>
              {{ item.sourceLabel }}
            </a>
            <span>· Updated {{ item.updated }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
