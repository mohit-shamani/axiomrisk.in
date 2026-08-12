/**
 * Builds public/downloads/axiomrisk-risk-register-template.xlsx from the CSV
 * sources in templates/risk-register/.
 *
 * The CSVs stay the editable source of truth; this only handles presentation
 * (widths, freeze panes, validation, conditional formatting) which CSV cannot
 * express. Edit the CSVs, then regenerate.
 *
 * Not part of `npm run build` — the .xlsx is committed. Regenerate with:
 *
 *   npm i --no-save exceljs
 *   node scripts/build-risk-register.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ExcelJS from 'exceljs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'templates', 'risk-register')
const OUT = path.join(ROOT, 'public', 'downloads', 'axiomrisk-risk-register-template.xlsx')

// Brand tokens (ARGB for Excel)
const SLATE = 'FF1E3A5F'
const EMERALD = 'FF1F7A5C'
const EMERALD_TINT = 'FFDCEFE7'
const OFFWHITE = 'FFF7F8FA'
const GREY_BLUE = 'FFEEF1F5'
const INK = 'FF14202E'
const BORDER = 'FFD2D8E0'

/** Minimal RFC 4180 parser — handles quoted fields and embedded commas. */
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } else quoted = false
      } else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c !== '\r') field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  return rows
}

const read = (f) => parseCsv(fs.readFileSync(path.join(SRC, f), 'utf8'))

const wb = new ExcelJS.Workbook()
wb.creator = 'AxiomRisk'
wb.created = new Date()

const headerStyle = (cell) => {
  cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 }
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SLATE } }
  cell.alignment = { vertical: 'middle', wrapText: true }
  cell.border = { bottom: { style: 'thin', color: { argb: BORDER } } }
}

// ---------------------------------------------------------------- Sheet 1
const regRows = read('1-risk-register.csv')
const reg = wb.addWorksheet('Risk Register', {
  views: [{ state: 'frozen', ySplit: 1 }],
  properties: { defaultRowHeight: 18 },
})

reg.addRow(regRows[0])
reg.getRow(1).height = 34
reg.getRow(1).eachCell(headerStyle)

const RATING_COL = 8 // H
for (let r = 1; r < regRows.length; r++) {
  const src = regRows[r]
  const values = src.map((v, i) => {
    if (i === RATING_COL - 1) return null // formula set below
    return v === '' ? null : v
  })
  const row = reg.addRow(values)
  const excelRow = row.number
  row.getCell(RATING_COL).value = { formula: `F${excelRow}*G${excelRow}` }
  row.alignment = { vertical: 'top', wrapText: true }
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.border = { bottom: { style: 'hair', color: { argb: BORDER } } }
  })
  // Tint the worked examples so they read as samples, not data
  if (String(src[0]).startsWith('EX-')) {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREY_BLUE } }
      cell.font = { italic: true, color: { argb: INK } }
    })
  }
}

reg.columns = [
  { width: 9 },  // ID
  { width: 58 }, // Risk statement
  { width: 15 }, // Category
  { width: 18 }, // Owner
  { width: 34 }, // Existing controls
  { width: 13 }, // Likelihood
  { width: 11 }, // Impact
  { width: 9 },  // Rating
  { width: 13 }, // Direction
  { width: 44 }, // Treatment
  { width: 16 }, // Action owner
  { width: 12 }, // Due date
  { width: 14 }, // Last reviewed
  { width: 12 }, // Status
]

const lastRow = regRows.length
// 1–4 only on the two rating inputs
for (const col of ['F', 'G']) {
  reg.dataValidations.add(`${col}2:${col}${lastRow}`, {
    type: 'whole',
    operator: 'between',
    formulae: [1, 4],
    allowBlank: true,
    showErrorMessage: true,
    errorTitle: 'Use the 1-4 scale',
    error: 'See the Scales sheet. 1 = lowest, 4 = highest.',
  })
}
reg.dataValidations.add(`I2:I${lastRow}`, {
  type: 'list', allowBlank: true, formulae: ['"Increasing,Stable,Decreasing"'],
})
reg.dataValidations.add(`N2:N${lastRow}`, {
  type: 'list', allowBlank: true, formulae: ['"Open,In Progress,Accepted,Closed"'],
})

// Rating bands mirror the Scales sheet
reg.addConditionalFormatting({
  ref: `H2:H${lastRow}`,
  rules: [
    { type: 'cellIs', operator: 'greaterThanOrEqual', formulae: [12], priority: 1,
      style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF6D5D2' } }, font: { bold: true } } },
    { type: 'cellIs', operator: 'between', formulae: [8, 11], priority: 2,
      style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFBE7C6' } } } },
    { type: 'cellIs', operator: 'between', formulae: [4, 7], priority: 3,
      style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F0D8' } } } },
    { type: 'cellIs', operator: 'between', formulae: [1, 3], priority: 4,
      style: { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: EMERALD_TINT } } } },
  ],
})

// ---------------------------------------------------------------- Sheet 2
const howRows = read('2-how-to-use.csv')
const how = wb.addWorksheet('How to use', { views: [{ state: 'frozen', ySplit: 1 }] })
how.addRow(howRows[0])
how.getRow(1).height = 24
how.getRow(1).eachCell(headerStyle)
for (let r = 1; r < howRows.length; r++) {
  const row = how.addRow(howRows[r].map((v) => (v === '' ? null : v)))
  row.alignment = { vertical: 'top', wrapText: true }
  const first = String(howRows[r][0] || '')
  if (first === first.toUpperCase() && first.trim() && !howRows[r][1]) {
    row.getCell(1).font = { bold: true, color: { argb: EMERALD } }
    row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: OFFWHITE } }
  }
}
how.columns = [{ width: 24 }, { width: 62 }, { width: 62 }]

// ---------------------------------------------------------------- Sheet 3
const scaleRows = read('3-scales.csv')
const scales = wb.addWorksheet('Scales')
for (const r of scaleRows) {
  const row = scales.addRow(r.map((v) => (v === '' ? null : v)))
  row.alignment = { vertical: 'top', wrapText: true }
  const first = String(r[0] || '')
  // Section headers are the all-caps rows
  if (first === first.toUpperCase() && first.trim().length > 4 && !r[2]) {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SLATE } }
    })
  } else if (['Score', 'Range', 'Trigger'].includes(first)) {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { bold: true, color: { argb: INK } }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREY_BLUE } }
    })
  }
}
scales.columns = [{ width: 14 }, { width: 22 }, { width: 78 }]

fs.mkdirSync(path.dirname(OUT), { recursive: true })
await wb.xlsx.writeFile(OUT)

const kb = (fs.statSync(OUT).size / 1024).toFixed(1)
console.log(`[xlsx] wrote public/downloads/axiomrisk-risk-register-template.xlsx — ${kb} KB`)
console.log(`[xlsx] sheets: ${wb.worksheets.map((w) => `${w.name} (${w.rowCount} rows)`).join(', ')}`)
