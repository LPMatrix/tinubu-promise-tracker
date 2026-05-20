import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { db } from './db.js'
import * as t from './schema.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pub = path.join(__dirname, '../public')

function readJson(filename) {
  try {
    return JSON.parse(readFileSync(path.join(pub, filename), 'utf-8'))
  } catch {
    return []
  }
}

function strip(obj) {
  // Remove the original JSON id — the DB auto-assigns one
  const { id: _id, ...rest } = obj
  return rest
}

// ── Clear all tables (order matters for FK integrity) ───────────────────────
console.log('Clearing tables…')
db.delete(t.indicatorPoints).run()
db.delete(t.indicators).run()
db.delete(t.budgetMinistries).run()
db.delete(t.budget).run()
db.delete(t.history).run()
db.delete(t.judgments).run()
db.delete(t.appointments).run()
db.delete(t.bills).run()
db.delete(t.ministers).run()
db.delete(t.orders).run()
db.delete(t.fraud).run()
db.delete(t.inherited).run()
db.delete(t.promises).run()

// ── Seed helpers ─────────────────────────────────────────────────────────────

function seedPromises(rows, admin) {
  for (const r of rows) {
    db.insert(t.promises).values({
      administration: admin,
      title:       r.title,
      category:    r.category,
      status:      r.status,
      promise:     r.promise,
      assessment:  r.assessment,
      source:      r.source,
      sourceLabel: r.sourceLabel,
      updated:     r.updated,
    }).run()
  }
}

function seedInherited(rows, admin) {
  for (const r of rows) {
    db.insert(t.inherited).values({
      administration: admin,
      title:       r.title,
      category:    r.category,
      status:      r.status,
      problem:     r.problem,
      resolution:  r.resolution,
      source:      r.source,
      sourceLabel: r.sourceLabel,
      updated:     r.updated,
    }).run()
  }
}

function seedFraud(rows, admin) {
  for (const r of rows) {
    db.insert(t.fraud).values({
      administration: admin,
      title:       r.title,
      category:    r.category,
      status:      r.status,
      amount:      r.amount ?? null,
      year:        r.year ?? null,
      allegation:  r.allegation,
      outcome:     r.outcome,
      source:      r.source,
      sourceLabel: r.sourceLabel,
      updated:     r.updated,
    }).run()
  }
}

function seedOrders(rows, admin) {
  for (const r of rows) {
    db.insert(t.orders).values({
      administration: admin,
      title:       r.title,
      category:    r.category,
      status:      r.status,
      signed:      r.signed ?? null,
      directive:   r.directive,
      effect:      r.effect,
      source:      r.source,
      sourceLabel: r.sourceLabel,
      updated:     r.updated,
    }).run()
  }
}

function seedMinisters(rows, admin) {
  for (const r of rows) {
    db.insert(t.ministers).values({
      administration: admin,
      name:        r.name,
      ministry:    r.ministry,
      appointed:   r.appointed ?? null,
      status:      r.status,
      serving:     r.serving ?? null,
      mandate:     r.mandate,
      performance: r.performance,
      source:      r.source ?? null,
      sourceLabel: r.sourceLabel ?? null,
      updated:     r.updated ?? null,
    }).run()
  }
}

function seedBills(rows, admin) {
  for (const r of rows) {
    db.insert(t.bills).values({
      administration: admin,
      title:       r.title,
      category:    r.category,
      status:      r.status,
      chamber:     r.chamber ?? null,
      introduced:  r.introduced ?? null,
      signed:      r.signed ?? null,
      summary:     r.summary,
      outcome:     r.outcome,
      source:      r.source,
      sourceLabel: r.sourceLabel,
      updated:     r.updated,
    }).run()
  }
}

function seedAppointments(rows, admin) {
  for (const r of rows) {
    db.insert(t.appointments).values({
      administration: admin,
      name:         r.name,
      role:         r.role,
      agency:       r.agency,
      category:     r.category,
      state:        r.state,
      geopolitical: r.geopolitical,
      appointed:    r.appointed,
      status:       r.status,
      note:         r.note,
    }).run()
  }
}

function seedJudgments(rows, admin) {
  for (const r of rows) {
    db.insert(t.judgments).values({
      administration: admin,
      title:       r.title,
      court:       r.court,
      category:    r.category,
      status:      r.status,
      compliance:  r.compliance ?? null,
      ruled:       r.ruled,
      issue:       r.issue,
      outcome:     r.outcome,
      source:      r.source ?? null,
      sourceLabel: r.sourceLabel ?? null,
    }).run()
  }
}

function seedHistory(rows, admin) {
  for (const r of rows) {
    db.insert(t.history).values({
      administration: admin,
      label:   r.label,
      kept:    r.kept,
      partial: r.partial,
      broken:  r.broken,
      pending: r.pending,
    }).run()
  }
}

function seedBudget(rows, admin) {
  for (const r of rows) {
    const { lastInsertRowid } = db.insert(t.budget).values({
      administration:    admin,
      year:              r.year,
      totalBn:           r.totalBn,
      revenueBn:         r.revenueBn,
      actualRevenueBn:   r.actualRevenueBn ?? null,
      debtServiceBn:     r.debtServiceBn,
      capitalBn:         r.capitalBn,
      recurrentBn:       r.recurrentBn,
      implementationPct: r.implementationPct ?? null,
      deficitBn:         r.deficitBn,
      note:              r.note ?? null,
      source:            r.source,
      sourceLabel:       r.sourceLabel,
    }).run()

    for (const m of (r.ministries || [])) {
      db.insert(t.budgetMinistries).values({
        budgetYear:   r.year,
        administration: admin,
        name:         m.name,
        allocationBn: m.allocationBn,
        releasedPct:  m.releasedPct ?? null,
        note:         m.note ?? null,
      }).run()
    }
  }
}

function seedIndicators(rows, admin) {
  for (const r of rows) {
    const { lastInsertRowid } = db.insert(t.indicators).values({
      administration: admin,
      key:         r.id,
      label:       r.label,
      unit:        r.unit,
      color:       r.color,
      description: r.description,
      source:      r.source,
      sourceLabel: r.sourceLabel,
      note:        r.note ?? null,
    }).run()

    for (const pt of (r.points || [])) {
      db.insert(t.indicatorPoints).values({
        indicatorId:    Number(lastInsertRowid),
        administration: admin,
        label:          pt.label,
        value:          pt.value,
      }).run()
    }
  }
}

// ── Run seed ─────────────────────────────────────────────────────────────────

const ADMINISTRATIONS = [
  { key: 'tinubu', prefix: '' },
  { key: 'buhari', prefix: 'buhari-' },
]

for (const { key, prefix } of ADMINISTRATIONS) {
  console.log(`Seeding ${key}…`)

  seedPromises(    readJson(`${prefix}promises.json`),     key)
  seedInherited(   readJson(`${prefix}inherited.json`),    key)
  seedFraud(       readJson(`${prefix}fraud.json`),        key)
  seedOrders(      readJson(`${prefix}orders.json`),       key)
  seedMinisters(   readJson(`${prefix}ministers.json`),    key)
  seedBills(       readJson(`${prefix}bills.json`),        key)
  seedAppointments(readJson(`${prefix}appointments.json`), key)
  seedJudgments(   readJson(`${prefix}judgments.json`),    key)
  seedHistory(     readJson(`${prefix}history.json`),      key)
  seedBudget(      readJson(`${prefix}budget.json`),       key)
  seedIndicators(  readJson(`${prefix}indicators.json`),   key)
}

console.log('Done.')
