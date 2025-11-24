#!/usr/bin/env node

/*
CLI para convertir uno o más archivos CSV (separados por ;) a planillas Excel (.xlsx).

Uso:
  node 98_tools/wbs-to-xlsx.js [rutas_csv ...] [-o|--outDir <directorio_salida>] [--sep ";"]

Si no se pasan rutas, se intentará convertir por defecto:
  ../4_plan/alternativa_1/wbs_alternativa_1.csv
  ../4_plan/alternativa_2/wbs_alternativa_2.csv
*/

'use strict'

const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

function printHelp() {
  const help = `
Convierte archivos CSV (WBS) a Excel (.xlsx)

Uso:
  node 98_tools/wbs-to-xlsx.js [rutas_csv ...] [opciones]

Opciones:
  -o, --outDir <dir>   Directorio de salida. Por defecto se genera junto al CSV fuente
  --sep <car>          Separador de campos del CSV. Por defecto ';'
  -h, --help           Muestra esta ayuda

Ejemplos:
  node 98_tools/wbs-to-xlsx.js
  node 98_tools/wbs-to-xlsx.js 4_plan/alternativa_1/wbs_alternativa_1.csv -o out
  node 98_tools/wbs-to-xlsx.js 4_plan/alternativa_1/wbs_alternativa_1.csv 4_plan/alternativa_2/wbs_alternativa_2.csv --sep ';'
`
  console.log(help)
}

function parseArgs(argv) {
  const args = argv.slice(2)
  const inputs = []
  let outDir = null
  let sep = ';'

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '-h' || arg === '--help') {
      printHelp()
      process.exit(0)
    } else if (arg === '-o' || arg === '--outDir') {
      if (i + 1 >= args.length) {
        console.error('Falta valor para --outDir')
        process.exit(1)
      }
      outDir = args[i + 1]
      i += 1
    } else if (arg === '--sep' || arg === '--delimiter') {
      if (i + 1 >= args.length) {
        console.error('Falta valor para --sep')
        process.exit(1)
      }
      sep = args[i + 1]
      i += 1
    } else if (arg.startsWith('-')) {
      console.error(`Opción no reconocida: ${arg}`)
      process.exit(1)
    } else {
      inputs.push(arg)
    }
  }

  return { inputs, outDir, sep }
}

function ensureDirectory(dirPath) {
  const abs = path.resolve(dirPath)
  fs.mkdirSync(abs, { recursive: true })
  return abs
}

function computeColumnWidthsFromAOA(aoa) {
  if (!Array.isArray(aoa) || aoa.length === 0) return []
  const numColumns = aoa.reduce((max, row) => Math.max(max, row.length), 0)
  const MIN_WIDTH = 8
  const MAX_WIDTH = 50

  const widths = []
  for (let c = 0; c < numColumns; c += 1) {
    let maxLen = 0
    for (let r = 0; r < aoa.length; r += 1) {
      const val = aoa[r][c]
      const str = val == null ? '' : String(val)
      if (str.length > maxLen) maxLen = str.length
    }
    const wch = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, maxLen + 2))
    widths.push({ wch })
  }
  return widths
}

function coerceDecimalCommaToNumberInColumns(ws, startRow0, endRow0, columnIndexes) {
  for (let r = startRow0; r <= endRow0; r += 1) {
    for (const c of columnIndexes) {
      if (c == null || c < 0) continue
      const addr = XLSX.utils.encode_cell({ r, c })
      const cell = ws[addr]
      if (!cell) continue
      if (cell.t === 'n') continue
      const raw = cell.v
      if (raw == null) continue
      const str = String(raw).trim()
      if (str.length === 0) continue
      // Normalización segura:
      // - Si hay coma decimal, elimina puntos (miles) y cambia coma por punto.
      // - Si no hay coma, intenta parsear tal cual (preserva 7.33 -> 7.33)
      let normalized = str
      if (str.includes(',')) {
        normalized = str.replace(/\./g, '').replace(/,/g, '.')
      }
      const num = Number(normalized)
      if (!Number.isNaN(num)) {
        ws[addr] = { t: 'n', v: num }
      }
    }
  }
}

function removeLastDataRow(ws) {
  if (!ws || !ws['!ref']) return
  const range = XLSX.utils.decode_range(ws['!ref'])
  // Evitar borrar el header si solo hay 1 fila (rango mínimo s.r == e.r == 0)
  if (range.e.r <= range.s.r) return
  const lastRow0 = range.e.r
  for (let c = range.s.c; c <= range.e.c; c += 1) {
    const addr = XLSX.utils.encode_cell({ r: lastRow0, c })
    if (ws[addr]) delete ws[addr]
  }
  // Reducir el rango en una fila
  const newRange = { s: { r: range.s.r, c: range.s.c }, e: { r: range.e.r - 1, c: range.e.c } }
  ws['!ref'] = XLSX.utils.encode_range(newRange)
}

function convertCsvToXlsx(inputCsvPath, outputDir, separator) {
  const absCsv = path.resolve(inputCsvPath)
  if (!fs.existsSync(absCsv)) {
    console.error(`No existe el archivo: ${absCsv}`)
    return false
  }

  const csvContent = fs.readFileSync(absCsv, 'utf8')

  // Leer CSV a workbook usando el separador personalizado
  const tempWb = XLSX.read(csvContent, { type: 'string', FS: separator })
  const firstSheetName = tempWb.SheetNames[0]
  const tempWs = tempWb.Sheets[firstSheetName]

  // AOA inicial para saber headers y dimensiones
  const aoa = XLSX.utils.sheet_to_json(tempWs, { header: 1, raw: false })
  const headers = Array.isArray(aoa) && aoa.length > 0 ? aoa[0] : []

  // Mapear índices de columnas por nombre (case-insensitive)
  const findColIndex = (name) => headers.findIndex((h) => String(h || '').trim().toLowerCase() === name.toLowerCase())
  let idxLogica = findColIndex('Logica')
  let idxDepend = findColIndex('Dependencias')
  let idxTesting = findColIndex('Testing')
  let idxPcc = findColIndex('PCC')
  let idxO = findColIndex('O_Optimistic')
  let idxM = findColIndex('M_Most_Likely')
  let idxP = findColIndex('P_Pessimistic')
  let idxTE = findColIndex('Te_Expected_Duration')
  let idxVariance = findColIndex('Variance')

  // Fallback a posiciones conocidas si no se hallan por nombre
  if (idxLogica < 0) idxLogica = 2
  if (idxDepend < 0) idxDepend = 3
  if (idxTesting < 0) idxTesting = 4
  if (idxPcc < 0) idxPcc = 5
  if (idxO < 0) idxO = 6
  if (idxM < 0) idxM = 7
  if (idxP < 0) idxP = 8
  if (idxTE < 0) idxTE = 9
  if (idxVariance < 0) idxVariance = 10

  // Rango y última columna de headers
  removeLastDataRow(tempWs) // eliminar última fila del CSV (totales existentes)
  let workingRange = XLSX.utils.decode_range(tempWs['!ref'])
  const lastHeaderCol = Math.max(headers.length - 1, workingRange.e.c)

  // Forzar números en columnas con decimales con coma, para que las fórmulas funcionen
  const firstDataR = Math.max(1, workingRange.s.r + 1)
  const lastDataR = workingRange.e.r
  // Detectar columnas candidatas numéricas (todas excepto textos obvios)
  const numericCandidateCols = []
  for (let c = 0; c <= lastHeaderCol; c += 1) {
    const hcell = tempWs[XLSX.utils.encode_cell({ r: 0, c })]
    const hval = String(hcell && hcell.v != null ? hcell.v : '').trim().toLowerCase()
    if (hval === '' || hval === 'historia de usuario' || hval === 'notas') continue
    numericCandidateCols.push(c)
  }
  coerceDecimalCommaToNumberInColumns(tempWs, firstDataR, lastDataR, numericCandidateCols)

  // No se agregan columnas nuevas; reemplazamos columnas existentes con fórmulas

  // Letras de columnas para fórmulas
  const colL = XLSX.utils.encode_col(idxLogica)
  const colD = XLSX.utils.encode_col(idxDepend)
  const colT = XLSX.utils.encode_col(idxTesting)
  const colP = XLSX.utils.encode_col(idxPcc)
  const colO = XLSX.utils.encode_col(idxO)
  const colM = XLSX.utils.encode_col(idxM)
  const colPp = XLSX.utils.encode_col(idxP)
  const colTE = XLSX.utils.encode_col(idxTE)
  const colVar = XLSX.utils.encode_col(idxVariance)

  // Reemplazar columnas con fórmulas por fila
  for (let r = firstDataR; r <= lastDataR; r += 1) {
    const excelRow = r + 1 // 1-based
    // PCC = Logica + Dependencias + Testing
    const addrPcc = XLSX.utils.encode_cell({ r, c: idxPcc })
    tempWs[addrPcc] = { t: 'n', f: `=${colL}${excelRow}+${colD}${excelRow}+${colT}${excelRow}` }

    // Te_Expected_Duration = (O + 4*M + P)/6 (PERT clásico)
    const addrTE = XLSX.utils.encode_cell({ r, c: idxTE })
    tempWs[addrTE] = { t: 'n', f: `=(${colO}${excelRow}+4*${colM}${excelRow}+${colPp}${excelRow})/6` }

    // Variance = ((P - O)/6)^2
    const addrVar = XLSX.utils.encode_cell({ r, c: idxVariance })
    tempWs[addrVar] = { t: 'n', f: `=(( ${colPp}${excelRow}-${colO}${excelRow})/6)^2` }
  }

  // Fila de totales al final, sumando todas las columnas numéricas
  const totalExcelRow = lastDataR + 2 // última fila de datos (1-based) + 1
  const totalR = totalExcelRow - 1 // 0-based
  const addrTotLabel = XLSX.utils.encode_cell({ r: totalR, c: 0 })
  tempWs[addrTotLabel] = { t: 's', v: 'Totales' }

  const sumFrom = 2 // fila 2 (1-based), excluye headers
  const sumTo = lastDataR + 1 // 1-based, ya eliminamos la última fila original del CSV

  const notNumericHeaders = new Set([
    'epica',
    'historia de usuario',
    'notas',
  ])

  const maxCol = lastHeaderCol
  for (let c = 0; c <= maxCol; c += 1) {
    const headerCell = tempWs[XLSX.utils.encode_cell({ r: 0, c })]
    const header = String(headerCell && headerCell.v != null ? headerCell.v : '').trim().toLowerCase()
    if (!header || notNumericHeaders.has(header)) continue

    const colLetter = XLSX.utils.encode_col(c)
    const addrSum = XLSX.utils.encode_cell({ r: totalR, c })
    tempWs[addrSum] = { t: 'n', f: `=SUM(${colLetter}${sumFrom}:${colLetter}${sumTo})` }
  }

  // Actualizar rango de la hoja para incluir la fila de totales
  const updatedRange = {
    s: { r: workingRange.s.r, c: workingRange.s.c },
    e: { r: Math.max(workingRange.e.r + 1, totalR), c: Math.max(workingRange.e.c) },
  }
  tempWs['!ref'] = XLSX.utils.encode_range(updatedRange)

  // Recalcular anchos considerando nuevas columnas/fila
  const aoaAfter = XLSX.utils.sheet_to_json(tempWs, { header: 1, raw: false })
  const cols = computeColumnWidthsFromAOA(aoaAfter)
  if (cols.length > 0) {
    tempWs['!cols'] = cols
  }

  // Crear un nuevo workbook limpio y adjuntar la hoja con nombre estable
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, tempWs, 'WBS')

  const baseName = path.basename(absCsv, path.extname(absCsv))
  const outPath = path.join(outputDir, `${baseName}.xlsx`)

  XLSX.writeFile(wb, outPath)
  console.log(`✅ Generado: ${outPath}`)
  return true
}

function main() {
  const { inputs, outDir, sep } = parseArgs(process.argv)

  // Archivos por defecto (relativos al repo desde 98_tools)
  const defaultFiles = [
    path.resolve(__dirname, '../4_plan/alternativa_1/wbs_alternativa_1.csv'),
    path.resolve(__dirname, '../4_plan/alternativa_2/wbs_alternativa_2.csv'),
  ]

  const files = inputs.length > 0 ? inputs : defaultFiles.filter((p) => fs.existsSync(p))
  if (files.length === 0) {
    console.error('No se encontraron archivos CSV para convertir. Revise rutas o ejecute con --help.')
    process.exit(1)
  }

  const globalOutDir = outDir ? ensureDirectory(outDir) : null
  if (globalOutDir) {
    console.log(`Salida (global): ${globalOutDir}`)
  } else {
    console.log('Salida: mismo directorio del CSV fuente')
  }
  console.log(`Separador CSV: "${sep}"`)

  let ok = true
  for (const file of files) {
    const perFileOutDir = globalOutDir || path.dirname(path.resolve(file))
    const done = convertCsvToXlsx(file, perFileOutDir, sep)
    if (!done) ok = false
  }

  process.exit(ok ? 0 : 1)
}

main()


