<script setup>
import { ref, computed, onMounted } from 'vue'
import PromiseCard from './components/PromiseCard.vue'

const STATUSES = [
  { key: 'all',     label: 'All' },
  { key: 'kept',    label: 'Kept' },
  { key: 'partial', label: 'Partial' },
  { key: 'broken',  label: 'Broken' },
  { key: 'pending', label: 'In progress' },
]

const promises  = ref([])
const inherited = ref([])
const activeTab      = ref('promises')
const activeStatus   = ref('all')
const activeCategory = ref('all')
const searchQuery    = ref('')

onMounted(async () => {
  const [p, i] = await Promise.all([
    fetch('/promises.json').then(r => r.json()),
    fetch('/inherited.json').then(r => r.json()),
  ])
  promises.value  = p
  inherited.value = i
})

function switchTab(tab) {
  activeTab.value      = tab
  activeStatus.value   = 'all'
  activeCategory.value = 'all'
  searchQuery.value    = ''
}

// ── Promises tab ──────────────────────────────────────

const categories = computed(() =>
  [...new Set(promises.value.map(p => p.category))].sort()
)

const promiseCounts = computed(() => {
  const c = { kept: 0, partial: 0, broken: 0, pending: 0 }
  promises.value.forEach(p => c[p.status]++)
  return c
})

const filteredPromises = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return promises.value.filter(p => {
    const matchStatus = activeStatus.value === 'all' || p.status === activeStatus.value
    const matchCat    = activeCategory.value === 'all' || p.category === activeCategory.value
    const matchQ      = !q || p.title.toLowerCase().includes(q)
                           || p.category.toLowerCase().includes(q)
                           || p.promise.toLowerCase().includes(q)
    return matchStatus && matchCat && matchQ
  })
})

const promiseTotal = computed(() => promises.value.length)

const promiseBarWidths = computed(() => {
  const t = promiseTotal.value || 1
  const c = promiseCounts.value
  return {
    kept:    ((c.kept    / t) * 100).toFixed(1) + '%',
    partial: ((c.partial / t) * 100).toFixed(1) + '%',
    broken:  ((c.broken  / t) * 100).toFixed(1) + '%',
    pending: ((c.pending / t) * 100).toFixed(1) + '%',
  }
})

// ── Inherited tab ─────────────────────────────────────

const inheritedCounts = computed(() => ({
  fixed:   inherited.value.filter(p => p.status === 'fixed').length,
  partial: inherited.value.filter(p => p.status === 'partial').length,
  total:   inherited.value.length,
}))

const inheritedBarWidths = computed(() => {
  const t = inheritedCounts.value.total || 1
  return {
    fixed:   ((inheritedCounts.value.fixed   / t) * 100).toFixed(1) + '%',
    partial: ((inheritedCounts.value.partial / t) * 100).toFixed(1) + '%',
  }
})
</script>

<template>
  <div class="pt-wrap">

    <!-- Hero -->
    <div class="pt-hero">
      <div class="pt-eyebrow">Civic Accountability · Nigeria 2023–2027</div>
      <h1 class="pt-headline">Tinubu Promise Tracker</h1>
      <div class="pt-subline">
        <span>Renewed Hope Agenda</span>
        <span class="pt-subline-sep"></span>
        <span>Updated April 2026</span>
        <span class="pt-subline-sep"></span>
        <span>2027 election countdown</span>
      </div>
    </div>

    <!-- Tabs -->
    <div class="pt-tabs">
      <button
        v-for="tab in [
          { key: 'promises',  label: 'Campaign Promises',        count: promises.length },
          { key: 'inherited', label: 'Inherited Problems Fixed',  count: inherited.length },
        ]"
        :key="tab.key"
        :class="['pt-tab-btn', { active: activeTab === tab.key }]"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
        <span class="pt-tab-count">({{ tab.count }})</span>
      </button>
    </div>

    <!-- ── PROMISES TAB ── -->
    <template v-if="activeTab === 'promises'">

      <!-- Stats -->
      <div class="pt-stats">
        <div class="pt-stat">
          <div class="pt-stat-value total">{{ promiseTotal }}</div>
          <div class="pt-stat-label">Total tracked</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value kept">{{ promiseCounts.kept }}</div>
          <div class="pt-stat-label">Kept</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value partial">{{ promiseCounts.partial }}</div>
          <div class="pt-stat-label">Partial / mixed</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value broken">{{ promiseCounts.broken }}</div>
          <div class="pt-stat-label">Broken</div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="pt-progress-section">
        <div class="pt-progress-bar">
          <div class="pt-bar-kept"    :style="{ width: promiseBarWidths.kept }"></div>
          <div class="pt-bar-partial" :style="{ width: promiseBarWidths.partial }"></div>
          <div class="pt-bar-broken"  :style="{ width: promiseBarWidths.broken }"></div>
          <div class="pt-bar-pending" :style="{ width: promiseBarWidths.pending }"></div>
        </div>
        <div class="pt-legend">
          <div class="pt-legend-item"><span class="pt-legend-dot kept"></span> Kept</div>
          <div class="pt-legend-item"><span class="pt-legend-dot partial"></span> Partial / mixed</div>
          <div class="pt-legend-item"><span class="pt-legend-dot broken"></span> Broken</div>
          <div class="pt-legend-item"><span class="pt-legend-dot pending"></span> In progress</div>
        </div>
      </div>

      <!-- Controls -->
      <div class="pt-controls">
        <input
          v-model="searchQuery"
          type="text"
          class="pt-search"
          placeholder="Search promises…"
        />
        <div class="pt-filter-group">
          <button
            v-for="s in STATUSES"
            :key="s.key"
            :class="['pt-filter-btn', { active: activeStatus === s.key }]"
            @click="activeStatus = s.key"
          >{{ s.label }}</button>
        </div>
        <select v-model="activeCategory" class="pt-cat-filter">
          <option value="all">All categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- List -->
      <div class="pt-list">
        <PromiseCard
          v-for="p in filteredPromises"
          :key="p.id"
          :item="p"
          :field1="p.promise"
          :field2="p.assessment"
          label1="The promise"
          label2="Assessment"
        />
        <div v-if="!filteredPromises.length" class="pt-empty">
          No promises match your filters.
        </div>
      </div>
    </template>

    <!-- ── INHERITED TAB ── -->
    <template v-else>

      <!-- Stats -->
      <div class="pt-stats">
        <div class="pt-stat">
          <div class="pt-stat-value total">{{ inheritedCounts.total }}</div>
          <div class="pt-stat-label">Inherited problems</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value kept">{{ inheritedCounts.fixed }}</div>
          <div class="pt-stat-label">Fixed</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value partial">{{ inheritedCounts.partial }}</div>
          <div class="pt-stat-label">Partial progress</div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="pt-progress-section">
        <div class="pt-progress-bar">
          <div class="pt-bar-kept"    :style="{ width: inheritedBarWidths.fixed }"></div>
          <div class="pt-bar-partial" :style="{ width: inheritedBarWidths.partial }"></div>
        </div>
        <div class="pt-legend">
          <div class="pt-legend-item"><span class="pt-legend-dot kept"></span> Fixed</div>
          <div class="pt-legend-item"><span class="pt-legend-dot partial"></span> Partial progress</div>
        </div>
      </div>

      <!-- List -->
      <div class="pt-list">
        <PromiseCard
          v-for="p in inherited"
          :key="p.id"
          :item="p"
          :field1="p.problem"
          :field2="p.resolution"
          label1="The problem"
          label2="What was done"
        />
      </div>
    </template>

  </div>
</template>
