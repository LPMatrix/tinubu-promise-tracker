<script setup>
import { ref, computed, onMounted } from 'vue'
import PromiseCard  from './components/PromiseCard.vue'
import HistoryChart from './components/HistoryChart.vue'
import BudgetView   from './components/BudgetView.vue'

const LAST_REVIEWED = 'April 2026'

const STATUSES = [
  { key: 'all',     label: 'All' },
  { key: 'kept',    label: 'Kept' },
  { key: 'partial', label: 'Partial' },
  { key: 'broken',  label: 'Broken' },
  { key: 'pending', label: 'In progress' },
]

const promises     = ref([])
const inherited    = ref([])
const fraud        = ref([])
const orders       = ref([])
const ministers    = ref([])
const budget       = ref([])
const bills        = ref([])
const history      = ref([])
const activeTab      = ref('promises')
const activeStatus   = ref('all')
const activeCategory = ref('all')
const searchQuery    = ref('')
const expandedId     = ref(null)
const copied         = ref(false)

onMounted(async () => {
  const [p, i, h, f, o, m, bu, bi] = await Promise.all([
    fetch('/promises.json').then(r => r.json()),
    fetch('/inherited.json').then(r => r.json()),
    fetch('/history.json').then(r => r.json()),
    fetch('/fraud.json').then(r => r.json()),
    fetch('/orders.json').then(r => r.json()),
    fetch('/ministers.json').then(r => r.json()),
    fetch('/budget.json').then(r => r.json()),
    fetch('/bills.json').then(r => r.json()),
  ])
  promises.value  = p
  inherited.value = i
  history.value   = h
  fraud.value     = f
  orders.value    = o
  ministers.value = m
  budget.value    = bu
  bills.value     = bi

  // Deep-link: open card specified by ?id= on load
  const params = new URLSearchParams(window.location.search)
  const id = parseInt(params.get('id'))
  if (id) expandedId.value = id
})

// ── Tab switching ─────────────────────────────────────

function switchTab(tab) {
  activeTab.value      = tab
  activeStatus.value   = 'all'
  activeCategory.value = 'all'
  searchQuery.value    = ''
  setExpanded(null)
}

// ── Deep-link ─────────────────────────────────────────

function setExpanded(id) {
  expandedId.value = id
  const url = new URL(window.location)
  if (id) {
    url.searchParams.set('id', id)
  } else {
    url.searchParams.delete('id')
  }
  history.replaceState(null, '', url)
}

function handleToggle(id) {
  setExpanded(expandedId.value === id ? null : id)
}

async function handleShare(id) {
  const url = new URL(window.location)
  url.searchParams.set('id', id)
  await navigator.clipboard.writeText(url.toString())
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
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
    const matchQ      = !q
      || p.title.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q)
      || p.promise.toLowerCase().includes(q)
    return matchStatus && matchCat && matchQ
  })
})

const promiseTotal = computed(() => promises.value.length)

function pct(n) { return ((n / (promiseTotal.value || 1)) * 100).toFixed(1) + '%' }

// ── Inherited tab ─────────────────────────────────────

const inheritedCounts = computed(() => ({
  fixed:   inherited.value.filter(p => p.status === 'fixed').length,
  partial: inherited.value.filter(p => p.status === 'partial').length,
  total:   inherited.value.length,
}))

function iPct(n) { return ((n / (inheritedCounts.value.total || 1)) * 100).toFixed(1) + '%' }

// ── Fraud tab ─────────────────────────────────────────

const FRAUD_STATUSES = [
  { key: 'all',       label: 'All' },
  { key: 'convicted', label: 'Convicted' },
  { key: 'ongoing',   label: 'Ongoing' },
  { key: 'dismissed', label: 'Dismissed' },
  { key: 'acquitted', label: 'Acquitted' },
]

const fraudCategories = computed(() =>
  [...new Set(fraud.value.map(f => f.category))].sort()
)

const fraudCounts = computed(() => {
  const c = { convicted: 0, ongoing: 0, dismissed: 0, acquitted: 0 }
  fraud.value.forEach(f => { if (c[f.status] !== undefined) c[f.status]++ })
  return c
})

const filteredFraud = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return fraud.value.filter(f => {
    const matchStatus = activeStatus.value === 'all' || f.status === activeStatus.value
    const matchCat    = activeCategory.value === 'all' || f.category === activeCategory.value
    const matchQ      = !q
      || f.title.toLowerCase().includes(q)
      || f.category.toLowerCase().includes(q)
      || f.allegation.toLowerCase().includes(q)
    return matchStatus && matchCat && matchQ
  })
})

// ── Executive Orders tab ───────────────────────────────

const ORDER_STATUSES = [
  { key: 'all',         label: 'All' },
  { key: 'implemented', label: 'Implemented' },
  { key: 'partial',     label: 'Partial' },
  { key: 'reversed',    label: 'Reversed' },
  { key: 'ignored',     label: 'Ignored' },
]

const orderCategories = computed(() =>
  [...new Set(orders.value.map(o => o.category))].sort()
)

const orderCounts = computed(() => {
  const c = { implemented: 0, partial: 0, reversed: 0, ignored: 0 }
  orders.value.forEach(o => { if (c[o.status] !== undefined) c[o.status]++ })
  return c
})

const filteredOrders = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return orders.value.filter(o => {
    const matchStatus = activeStatus.value === 'all' || o.status === activeStatus.value
    const matchCat    = activeCategory.value === 'all' || o.category === activeCategory.value
    const matchQ      = !q
      || o.title.toLowerCase().includes(q)
      || o.category.toLowerCase().includes(q)
      || o.directive.toLowerCase().includes(q)
    return matchStatus && matchCat && matchQ
  })
})

// ── Ministers tab ──────────────────────────────────────

const MINISTER_STATUSES = [
  { key: 'all',      label: 'All' },
  { key: 'good',     label: 'Good' },
  { key: 'fair',     label: 'Fair' },
  { key: 'poor',     label: 'Poor' },
  { key: 'sacked',   label: 'Sacked' },
  { key: 'resigned', label: 'Resigned' },
]

const ministerCounts = computed(() => {
  const c = { good: 0, fair: 0, poor: 0, sacked: 0, resigned: 0 }
  ministers.value.forEach(m => { if (c[m.status] !== undefined) c[m.status]++ })
  return c
})

const filteredMinisters = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return ministers.value.filter(m => {
    const matchStatus = activeStatus.value === 'all' || m.status === activeStatus.value
    const matchQ      = !q
      || m.name.toLowerCase().includes(q)
      || m.ministry.toLowerCase().includes(q)
      || m.mandate.toLowerCase().includes(q)
    return matchStatus && matchQ
  })
})

// ── Bills tab ──────────────────────────────────────────

const BILL_STATUSES = [
  { key: 'all',       label: 'All' },
  { key: 'passed',    label: 'Passed' },
  { key: 'partial',   label: 'Partial' },
  { key: 'pending',   label: 'Pending' },
  { key: 'abandoned', label: 'Abandoned' },
]

const billCategories = computed(() =>
  [...new Set(bills.value.map(b => b.category))].sort()
)

const billCounts = computed(() => {
  const c = { passed: 0, partial: 0, pending: 0, abandoned: 0 }
  bills.value.forEach(b => { if (c[b.status] !== undefined) c[b.status]++ })
  return c
})

const filteredBills = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return bills.value.filter(b => {
    const matchStatus = activeStatus.value === 'all' || b.status === activeStatus.value
    const matchCat    = activeCategory.value === 'all' || b.category === activeCategory.value
    const matchQ      = !q
      || b.title.toLowerCase().includes(q)
      || b.category.toLowerCase().includes(q)
      || b.summary.toLowerCase().includes(q)
    return matchStatus && matchCat && matchQ
  })
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
        <span>2027 election countdown</span>
      </div>
    </div>

    <!-- Freshness banner -->
    <div class="pt-freshness">
      <span class="pt-freshness-dot"></span>
      Data last reviewed <strong>{{ LAST_REVIEWED }}</strong>
      &nbsp;·&nbsp; Sources linked on each card
    </div>

    <!-- Tabs -->
    <div class="pt-tabs">
      <button
        v-for="tab in [
          { key: 'promises',  label: 'Promises',        count: promises.length },
          { key: 'inherited', label: 'Inherited Fixes',  count: inherited.length },
          { key: 'fraud',     label: 'Fraud',            count: fraud.length },
          { key: 'orders',    label: 'Orders & Policy',  count: orders.length },
          { key: 'ministers', label: 'Ministers',        count: ministers.length },
          { key: 'budget',    label: 'Budget',           count: budget.length },
          { key: 'bills',     label: 'Bills Watch',      count: bills.length },
        ]"
        :key="tab.key"
        :class="['pt-tab-btn', { active: activeTab === tab.key }]"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
        <span class="pt-tab-count">({{ tab.count }})</span>
      </button>
    </div>

    <!-- Copied toast -->
    <Transition name="toast">
      <div v-if="copied" class="pt-toast">Link copied to clipboard</div>
    </Transition>

    <!-- ── PROMISES TAB ── -->
    <template v-if="activeTab === 'promises'">

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

      <div class="pt-progress-section">
        <div class="pt-progress-bar">
          <div class="pt-bar-kept"    :style="{ width: pct(promiseCounts.kept) }"></div>
          <div class="pt-bar-partial" :style="{ width: pct(promiseCounts.partial) }"></div>
          <div class="pt-bar-broken"  :style="{ width: pct(promiseCounts.broken) }"></div>
          <div class="pt-bar-pending" :style="{ width: pct(promiseCounts.pending) }"></div>
        </div>
        <div class="pt-legend">
          <div class="pt-legend-item"><span class="pt-legend-dot kept"></span> Kept</div>
          <div class="pt-legend-item"><span class="pt-legend-dot partial"></span> Partial / mixed</div>
          <div class="pt-legend-item"><span class="pt-legend-dot broken"></span> Broken</div>
          <div class="pt-legend-item"><span class="pt-legend-dot pending"></span> In progress</div>
        </div>
      </div>

      <!-- History chart -->
      <HistoryChart :history="history" />

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

      <div class="pt-list">
        <PromiseCard
          v-for="p in filteredPromises"
          :key="p.id"
          :item="p"
          :field1="p.promise"
          :field2="p.assessment"
          label1="The promise"
          label2="Assessment"
          :isExpanded="expandedId === p.id"
          @toggle="handleToggle"
          @share="handleShare"
        />
        <div v-if="!filteredPromises.length" class="pt-empty">
          No promises match your filters.
        </div>
      </div>
    </template>

    <!-- ── INHERITED TAB ── -->
    <template v-else-if="activeTab === 'inherited'">

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

      <div class="pt-progress-section">
        <div class="pt-progress-bar">
          <div class="pt-bar-kept"    :style="{ width: iPct(inheritedCounts.fixed) }"></div>
          <div class="pt-bar-partial" :style="{ width: iPct(inheritedCounts.partial) }"></div>
        </div>
        <div class="pt-legend">
          <div class="pt-legend-item"><span class="pt-legend-dot kept"></span> Fixed</div>
          <div class="pt-legend-item"><span class="pt-legend-dot partial"></span> Partial progress</div>
        </div>
      </div>

      <div class="pt-list">
        <PromiseCard
          v-for="p in inherited"
          :key="p.id"
          :item="p"
          :field1="p.problem"
          :field2="p.resolution"
          label1="The problem"
          label2="What was done"
          :isExpanded="expandedId === p.id"
          @toggle="handleToggle"
          @share="handleShare"
        />
      </div>
    </template>

    <!-- ── FRAUD TAB ── -->
    <template v-else-if="activeTab === 'fraud'">

      <div class="pt-fraud-intro">
        Documented cases of fraud, corruption, and financial misconduct by Nigerian
        government officials and agencies over the past five years (2021–2026).
        Sources linked on each card.
      </div>

      <div class="pt-stats">
        <div class="pt-stat">
          <div class="pt-stat-value total">{{ fraud.length }}</div>
          <div class="pt-stat-label">Total cases</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value broken">{{ fraudCounts.convicted }}</div>
          <div class="pt-stat-label">Convicted</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value pending">{{ fraudCounts.ongoing }}</div>
          <div class="pt-stat-label">Ongoing</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value total">{{ fraudCounts.dismissed }}</div>
          <div class="pt-stat-label">Dismissed</div>
        </div>
      </div>

      <!-- Controls -->
      <div class="pt-controls">
        <input
          v-model="searchQuery"
          type="text"
          class="pt-search"
          placeholder="Search cases…"
        />
        <div class="pt-filter-group">
          <button
            v-for="s in FRAUD_STATUSES"
            :key="s.key"
            :class="['pt-filter-btn', { active: activeStatus === s.key }]"
            @click="activeStatus = s.key"
          >{{ s.label }}</button>
        </div>
        <select v-model="activeCategory" class="pt-cat-filter">
          <option value="all">All categories</option>
          <option v-for="cat in fraudCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="pt-list">
        <PromiseCard
          v-for="f in filteredFraud"
          :key="f.id"
          :item="f"
          :field1="f.allegation"
          :field2="f.outcome"
          label1="Allegation"
          label2="Outcome / Status"
          :isExpanded="expandedId === f.id"
          @toggle="handleToggle"
          @share="handleShare"
        />
        <div v-if="!filteredFraud.length" class="pt-empty">
          No cases match your filters.
        </div>
      </div>
    </template>

    <!-- ── ORDERS & POLICY TAB ── -->
    <template v-else-if="activeTab === 'orders'">

      <div class="pt-tab-intro">
        Executive orders, presidential directives, and major policy decisions issued
        since May 2023 — tracked from announcement through to real-world effect.
      </div>

      <div class="pt-stats">
        <div class="pt-stat">
          <div class="pt-stat-value total">{{ orders.length }}</div>
          <div class="pt-stat-label">Total orders</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value kept">{{ orderCounts.implemented }}</div>
          <div class="pt-stat-label">Implemented</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value partial">{{ orderCounts.partial }}</div>
          <div class="pt-stat-label">Partial</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value broken">{{ orderCounts.reversed }}</div>
          <div class="pt-stat-label">Reversed</div>
        </div>
      </div>

      <div class="pt-controls">
        <input v-model="searchQuery" type="text" class="pt-search" placeholder="Search orders…" />
        <div class="pt-filter-group">
          <button
            v-for="s in ORDER_STATUSES" :key="s.key"
            :class="['pt-filter-btn', { active: activeStatus === s.key }]"
            @click="activeStatus = s.key"
          >{{ s.label }}</button>
        </div>
        <select v-model="activeCategory" class="pt-cat-filter">
          <option value="all">All categories</option>
          <option v-for="cat in orderCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="pt-list">
        <PromiseCard
          v-for="o in filteredOrders" :key="o.id"
          :item="o"
          :field1="o.directive"
          :field2="o.effect"
          label1="The directive"
          label2="Real-world effect"
          :isExpanded="expandedId === o.id"
          @toggle="handleToggle"
          @share="handleShare"
        />
        <div v-if="!filteredOrders.length" class="pt-empty">No orders match your filters.</div>
      </div>
    </template>

    <!-- ── MINISTERS TAB ── -->
    <template v-else-if="activeTab === 'ministers'">

      <div class="pt-tab-intro">
        Performance scorecard for key cabinet ministers — assessed against their stated
        mandate and verified deliverables. Ratings reflect independent assessment as of April 2026.
      </div>

      <div class="pt-stats">
        <div class="pt-stat">
          <div class="pt-stat-value total">{{ ministers.length }}</div>
          <div class="pt-stat-label">Ministers tracked</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value kept">{{ ministerCounts.good }}</div>
          <div class="pt-stat-label">Good</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value partial">{{ ministerCounts.fair }}</div>
          <div class="pt-stat-label">Fair</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value broken">{{ ministerCounts.poor }}</div>
          <div class="pt-stat-label">Poor</div>
        </div>
      </div>

      <div class="pt-controls">
        <input v-model="searchQuery" type="text" class="pt-search" placeholder="Search ministers…" />
        <div class="pt-filter-group">
          <button
            v-for="s in MINISTER_STATUSES" :key="s.key"
            :class="['pt-filter-btn', { active: activeStatus === s.key }]"
            @click="activeStatus = s.key"
          >{{ s.label }}</button>
        </div>
      </div>

      <div class="pt-list">
        <PromiseCard
          v-for="m in filteredMinisters" :key="m.id"
          :item="{ ...m, title: m.name, category: m.ministry }"
          :field1="m.mandate"
          :field2="m.performance"
          label1="Mandate"
          label2="Performance assessment"
          :isExpanded="expandedId === m.id"
          @toggle="handleToggle"
          @share="handleShare"
        />
        <div v-if="!filteredMinisters.length" class="pt-empty">No ministers match your filters.</div>
      </div>
    </template>

    <!-- ── BUDGET TAB ── -->
    <template v-else-if="activeTab === 'budget'">

      <div class="pt-tab-intro">
        Federal budget allocation versus actual release rates by ministry.
        Tracks whether approved funds are reaching the programmes they were signed for.
      </div>

      <BudgetView :budgets="budget" />
    </template>

    <!-- ── BILLS TAB ── -->
    <template v-else-if="activeTab === 'bills'">

      <div class="pt-tab-intro">
        Key bills introduced in the 10th National Assembly — tracking passage,
        abandonment, and the gap between legislative promises and outcomes.
      </div>

      <div class="pt-stats">
        <div class="pt-stat">
          <div class="pt-stat-value total">{{ bills.length }}</div>
          <div class="pt-stat-label">Bills tracked</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value kept">{{ billCounts.passed }}</div>
          <div class="pt-stat-label">Passed</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value pending">{{ billCounts.pending }}</div>
          <div class="pt-stat-label">Pending</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value broken">{{ billCounts.abandoned }}</div>
          <div class="pt-stat-label">Abandoned</div>
        </div>
      </div>

      <div class="pt-controls">
        <input v-model="searchQuery" type="text" class="pt-search" placeholder="Search bills…" />
        <div class="pt-filter-group">
          <button
            v-for="s in BILL_STATUSES" :key="s.key"
            :class="['pt-filter-btn', { active: activeStatus === s.key }]"
            @click="activeStatus = s.key"
          >{{ s.label }}</button>
        </div>
        <select v-model="activeCategory" class="pt-cat-filter">
          <option value="all">All categories</option>
          <option v-for="cat in billCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="pt-list">
        <PromiseCard
          v-for="b in filteredBills" :key="b.id"
          :item="b"
          :field1="b.summary"
          :field2="b.outcome"
          label1="What it proposes"
          label2="Outcome"
          :isExpanded="expandedId === b.id"
          @toggle="handleToggle"
          @share="handleShare"
        />
        <div v-if="!filteredBills.length" class="pt-empty">No bills match your filters.</div>
      </div>
    </template>

  </div>
</template>
