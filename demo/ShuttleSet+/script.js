/* ================================================================
   Tree-of-Text Demo — script.js
   All data loaded dynamically from user-specified file paths.
   ================================================================ */

/* ===== OPERATION COLORS ===== */
const OP_COLORS = {
  root:         '#6366f1',
  select_table: '#06b6d4',
  select_row:   '#10b981',
  select_col:   '#3b82f6',
  count:        '#f59e0b',
  sort:         '#ec4899',
  filter:       '#8b5cf6',
  write:        '#ef4444',
};

/* ===== TREE LAYOUT CONSTANTS ===== */
const NODE_W    = 200;
const NODE_H    = 42;
const GAP_X     = 64;   // horizontal spacing between levels
const GAP_Y     = 24;   // vertical spacing between sibling nodes

/* ===== HELPERS ===== */
function opFromHistory(op_hist) {
  if (!op_hist || !op_hist.length) return 'root';
  const last = op_hist[op_hist.length - 1];
  const m = last.match(/^([a-z_]+)/);
  return m ? m[1] : 'root';
}

function colorForOp(op) {
  return OP_COLORS[op] || '#888';
}

function parseCSV(text) {
  const lines = text.trim().replace(/\r\n/g, '\n').split('\n').filter(Boolean);
  if (!lines.length) return { headers: [], rows: [] };
  const headers = lines[0].split(',');
  const rows = lines.slice(1).map(line => {
    const vals = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQ = !inQ; }
      else if (line[i] === ',' && !inQ) { vals.push(cur); cur = ''; }
      else { cur += line[i]; }
    }
    vals.push(cur);
    return vals;
  });
  return { headers, rows };
}

function renderCSVTable(csvText) {
  if (!csvText) return '<em style="color:var(--muted)">No data</em>';
  const { headers, rows } = parseCSV(csvText);
  const numericCols = new Set(['id','rally','ball_round','year','month','day','set','duration',
    'winner_score','loser_score','set_1_winner_score','set_1_loser_score',
    'set_2_winner_score','set_2_loser_score','set_3_winner_score','set_3_loser_score','count']);
  let html = '<table class="data-table"><thead><tr>';
  headers.forEach(h => { html += `<th>${h}</th>`; });
  html += '</tr></thead><tbody>';
  rows.forEach(row => {
    html += '<tr>';
    headers.forEach((h, i) => {
      const val = (row[i] || '').trim();
      let cls = numericCols.has(h) ? 'num' : '';
      if (h === 'winner' || h === 'getpoint_player') {
        cls = val.includes('YAMAGUCHI') ? 'player-winner' : 'player-loser';
      }
      html += `<td class="${cls}">${val || '—'}</td>`;
    });
    html += '</tr>';
  });
  return html + '</tbody></table>';
}

/* ===== FETCH HELPERS ===== */
async function fetchText(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`Failed to load ${path} (${r.status})`);
  return r.text();
}
async function fetchJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`Failed to load ${path} (${r.status})`);
  return r.json();
}

/* ===== GLOBAL STATE ===== */
let csvData = {};
let configData = {};
let logData = {};
let refText = '';
let genText = '';
let activeFilters = new Set(Object.keys(OP_COLORS));
let selectedNodeId = null;

/* ================================================================
   LOAD FILES
   ================================================================ */
async function loadAll() {
  // const status = document.getElementById('loadStatus');
  // const btn    = document.getElementById('loadBtn');
  // status.className = '';
  // status.textContent = 'Loading…';
  // btn.disabled = true;

  const paths = {
    config: "config/config.json",
    log:    "log/log.json",
    match:  "table/match.csv",
    set1:   "table/set_1.csv",
    set2:   "table/set_2.csv",
    text:   "text/text.txt",
    report: "report/report.txt",
  };

  try {
    const [log, match, set1, set2, config, text, report] = await Promise.all([
      fetchJSON(paths.log),
      fetchText(paths.match),
      fetchText(paths.set1),
      fetchText(paths.set2),
      fetchJSON(paths.config),
      fetchText(paths.text),
      fetchText(paths.report),
    ]);

    logData    = log;
    csvData    = { match, set1, set2 };
    configData = config;
    refText    = text;
    genText    = report;

    // status.className = 'ok';
    // status.textContent = '✓ All files loaded successfully';

    document.getElementById('mainContent').style.display = '';
    renderAll();
  } catch (err) {
    // status.className = 'err';
    // status.textContent = '✗ ' + err.message;
    console.error(err);
  } finally {
    btn.disabled = false;
  }
}

function renderAll() {
  renderConfig();
  initTables();
  initTree();
  initComparison();
}

/* ================================================================
   CONFIG
   ================================================================ */
function renderConfig() {
  const grid = document.getElementById('configGrid');
  grid.innerHTML = Object.entries(configData).map(([k, v]) => {
    const isArr = Array.isArray(v);
    const display = isArr ? v.join(', ') : String(v);
    return `<div class="config-item">
      <div class="config-key">${k}</div>
      <div class="config-value">${display}</div>
    </div>`;
  }).join('');
}

/* ================================================================
   TABLES
   ================================================================ */
function initTables() {
  const container = document.getElementById('tableContainer');
  const tabs = document.querySelectorAll('.tab-btn');

  function showTab(key) {
    container.innerHTML = renderCSVTable(csvData[key]);
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === key));
  }

  tabs.forEach(t => {
    // Remove old listeners by cloning
    const clone = t.cloneNode(true);
    t.parentNode.replaceChild(clone, t);
  });

  document.querySelectorAll('.tab-btn').forEach(t =>
    t.addEventListener('click', () => showTab(t.dataset.tab))
  );

  showTab('match');
}

/* ================================================================
   TREE — layout engine
   ================================================================ */

/* Assign a unique id to every node and collect them */
let nodeRegistry = {};  // id -> node data

function assignIds(node, parent, indexAmongSiblings) {
  const id = node._id || (node._id = Math.random().toString(36).slice(2));
  node._id = id;
  nodeRegistry[id] = node;
  (node.children || []).forEach((c, i) => assignIds(c, node, i));
}

/* Compute subtree height (number of leaf slots) */
function subtreeLeafCount(node) {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((s, c) => s + subtreeLeafCount(c), 0);
}

/* Lay out tree: assign (col, row) — col = depth, row = vertical position in leaf slots */
function layoutTree(node, depth, rowStart) {
  node._col = depth;
  const leaves = subtreeLeafCount(node);
  node._row = rowStart + (leaves - 1) / 2;   // centre of subtree

  if (node.children && node.children.length > 0) {
    let cursor = rowStart;
    node.children.forEach(c => {
      const cl = subtreeLeafCount(c);
      layoutTree(c, depth + 1, cursor);
      cursor += cl;
    });
  }
}

/* Convert (col, row) → pixel (cx, cy) — cx = centre of node */
function nodePos(node) {
  const cx = node._col * (NODE_W + GAP_X) + NODE_W / 2;
  const cy = node._row * (NODE_H + GAP_Y) + NODE_H / 2;
  return { cx, cy, x: cx - NODE_W / 2, y: cy - NODE_H / 2 };
}

/* Count max col and total leaf rows to determine canvas size */
function treeExtent(node, maxCol = { v: 0 }, totalLeaves = { v: 0 }) {
  if (node._col > maxCol.v) maxCol.v = node._col;
  if (!node.children || !node.children.length) totalLeaves.v += 1;
  (node.children || []).forEach(c => treeExtent(c, maxCol, totalLeaves));
  return { maxCol: maxCol.v, totalLeaves: totalLeaves.v };
}

/* Walk tree and collect all nodes flat */
function flatNodes(node, acc = []) {
  acc.push(node);
  (node.children || []).forEach(c => flatNodes(c, acc));
  return acc;
}

/* ================================================================
   TREE — RENDER
   ================================================================ */
function initTree() {
  nodeRegistry = {};

  // Clone tree to avoid mutating logData
  const tree = JSON.parse(JSON.stringify(logData));
  assignIds(tree, null, 0);
  layoutTree(tree, 0, 0);

  const { maxCol, totalLeaves } = treeExtent(tree);
  const canvasW = (maxCol + 1) * (NODE_W + GAP_X) - GAP_X + 40;
  const canvasH = totalLeaves * (NODE_H + GAP_Y) - GAP_Y + 40;

  const canvas  = document.getElementById('treeCanvas');
  const svg     = document.getElementById('treeSvg');
  const nodesEl = document.getElementById('treeNodes');

  canvas.style.width  = canvasW + 'px';
  canvas.style.height = canvasH + 'px';
  svg.setAttribute('width',  canvasW);
  svg.setAttribute('height', canvasH);
  svg.innerHTML = '';
  nodesEl.innerHTML = '';

  const allNodes = flatNodes(tree);

  // Offset so nodes start with padding
  const PAD = 20;

  // Draw edges first (SVG)
  allNodes.forEach(node => {
    if (!node.children || !node.children.length) return;
    const { cx: px, cy: py } = nodePos(node);
    node.children.forEach(child => {
      const { cx: cx2, cy: cy2 } = nodePos(child);
      // Elbow connector: right edge of parent → left edge of child
      const x1 = px + NODE_W / 2 + PAD;
      const y1 = py + PAD;
      const x2 = cx2 - NODE_W / 2 + PAD;
      const y2 = cy2 + PAD;
      const mx = (x1 + x2) / 2;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#2e3440');
      path.setAttribute('stroke-width', '1.5');
      path.dataset.parentId = node._id;
      path.dataset.childId  = child._id;
      svg.appendChild(path);
    });
  });

  // Draw nodes (DOM)
  allNodes.forEach(node => {
    const op = opFromHistory(node.operation_history);
    const color = colorForOp(op);
    const { x, y } = nodePos(node);

    const el = document.createElement('div');
    el.className = 't-node';
    el.dataset.id = node._id;
    el.dataset.op = op;
    el.style.left = (x + PAD) + 'px';
    el.style.top  = (y + PAD) + 'px';
    el.style.background = color;
    el.style.boxShadow  = `0 2px 10px ${color}55`;

    // Label = last item in operation_history
    const hist = node.operation_history || [];
    const label = hist.length ? hist[hist.length - 1] : 'root()';
    el.title = label;

    // Truncate for display
    const shortLabel = label.length > 28 ? label.slice(0, 26) + '…' : label;
    el.textContent = shortLabel;

    el.addEventListener('click', () => showNodeDetail(node._id, tree));
    nodesEl.appendChild(el);
  });

  // Filter chips
  buildFilterChips(allNodes);
  applyFilter();
}

function buildFilterChips(allNodes) {
  const chipsEl = document.getElementById('filterChips');
  chipsEl.innerHTML = '';
  const opsPresent = [...new Set(allNodes.map(n => opFromHistory(n.operation_history)))];
  // Always show all op types
  Object.entries(OP_COLORS).forEach(([op, color]) => {
    const chip = document.createElement('div');
    chip.className = 'chip' + (activeFilters.has(op) ? ' active' : '');
    chip.dataset.op = op;
    chip.textContent = op;
    chip.style.background = color;
    chip.style.borderColor = color;
    chip.addEventListener('click', () => {
      if (activeFilters.has(op)) activeFilters.delete(op);
      else activeFilters.add(op);
      chip.classList.toggle('active', activeFilters.has(op));
      applyFilter();
    });
    chipsEl.appendChild(chip);
  });
}

function applyFilter() {
  document.querySelectorAll('.t-node').forEach(el => {
    const op = el.dataset.op;
    el.classList.toggle('dimmed', !activeFilters.has(op));
  });

  // Also dim edges whose parent or child node is dimmed
  document.querySelectorAll('#treeSvg path').forEach(path => {
    const pEl = document.querySelector(`.t-node[data-id="${path.dataset.parentId}"]`);
    const cEl = document.querySelector(`.t-node[data-id="${path.dataset.childId}"]`);
    const dimmed = (pEl && pEl.classList.contains('dimmed')) ||
                   (cEl && cEl.classList.contains('dimmed'));
    path.style.opacity = dimmed ? '0.1' : '1';
  });
}

/* ================================================================
   NODE DETAIL PANEL
   ================================================================ */
function showNodeDetail(id, tree) {
  const node = nodeRegistry[id];
  if (!node) return;

  const op    = opFromHistory(node.operation_history);
  const color = colorForOp(op);
  const hist  = node.operation_history || [];
  const label = hist.length ? hist[hist.length - 1] : 'root()';

  // Highlight selected node
  document.querySelectorAll('.t-node').forEach(el => el.classList.remove('selected'));
  const selEl = document.querySelector(`.t-node[data-id="${id}"]`);
  if (selEl) selEl.classList.add('selected');

  // Header
  document.getElementById('detailOpBadge').textContent = op;
  document.getElementById('detailOpBadge').style.background = color;
  document.getElementById('detailTitle').textContent = label;

  // Body
  const body = document.getElementById('detailBody');
  body.innerHTML = '';

  // Level
  appendDetailBlock(body, 'Level', `<code>${node.level || '—'}</code>`, false);

  // Operation History
  const histHtml = (node.operation_history || [])
    .map(h => `<code>${escHtml(h)}</code>`)
    .join(' → ');
  appendDetailBlock(body, 'Operation History', histHtml || '—', false);

  // Operation Pool
  const poolHtml = (node.operation_pool || [])
    .map(p => `<span class="pill" style="background:${colorForOp(p)}">${p}</span>`)
    .join('');
  appendDetailBlock(body, 'Operation Pool', poolHtml || '—', false);

  // Tables
  const tables = node.tables || {};
  const tableNames = Object.keys(tables);
  if (tableNames.length) {
    tableNames.forEach(tname => {
      const b = document.createElement('div');
      b.className = 'detail-block';
      b.innerHTML = `<div class="detail-block-label">Table: ${escHtml(tname)}</div>
        <div class="detail-table-wrap">${renderCSVTable(tables[tname])}</div>`;
      body.appendChild(b);
    });
  } else {
    appendDetailBlock(body, 'Tables', '—', false);
  }

  // Reports (intermediate)
  const reports = node.reports || [];
  if (reports.length > 0) {
    const rHtml = reports.map((r, i) =>
      `<div style="margin-bottom:10px"><span style="color:var(--accent2);font-size:10px">Report ${i+1}</span><br>${escHtml(r)}</div>`
    ).join('');
    appendDetailBlock(body, `Reports (${reports.length})`, rHtml, true);
  }

  // Final report
  if (node.report) {
    appendDetailBlock(body, 'Report (Final / Merged)', escHtml(node.report), true);
  }

  const panel = document.getElementById('detailPanel');
  panel.classList.add('visible');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function appendDetailBlock(parent, label, contentHtml, fullWidth) {
  const b = document.createElement('div');
  b.className = 'detail-block' + (fullWidth ? ' full-width' : '');
  b.innerHTML = `<div class="detail-block-label">${label}</div>
    <div class="detail-block-content">${contentHtml}</div>`;
  parent.appendChild(b);
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ================================================================
   TEXT COMPARISON — n-gram overlap highlighting
   ================================================================ */
function initComparison() {
  const refEl = document.getElementById('referenceText');
  const genEl = document.getElementById('generatedText');
  refEl.innerHTML = '';
  genEl.innerHTML = '';

  // Split into paragraphs
  const refParas = refText.trim().split(/\n+/).filter(Boolean);
  const genParas = genText.trim().split(/\n+/).filter(Boolean);

  // Build a set of shared n-grams (n=5) for overlap detection
  const sharedNgrams = buildSharedNgrams(refText, genText, 5);

  refParas.forEach(para => {
    const p = document.createElement('p');
    p.innerHTML = highlightText(para, sharedNgrams, 5);
    refEl.appendChild(p);
  });

  genParas.forEach(para => {
    const p = document.createElement('p');
    p.innerHTML = highlightText(para, sharedNgrams, 5);
    genEl.appendChild(p);
  });
}

function tokenize(text) {
  // Simple word + punctuation tokenizer; lowercase for matching
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

function buildSharedNgrams(textA, textB, n) {
  const tokA = tokenize(textA);
  const tokB = tokenize(textB);

  function ngrams(tokens, n) {
    const set = new Set();
    for (let i = 0; i <= tokens.length - n; i++) {
      set.add(tokens.slice(i, i + n).join(' '));
    }
    return set;
  }

  const setA = ngrams(tokA, n);
  const setB = ngrams(tokB, n);
  const shared = new Set();
  setA.forEach(g => { if (setB.has(g)) shared.add(g); });
  return shared;
}

function highlightText(para, sharedNgrams, n) {
  // Tokenize the paragraph preserving original case and whitespace
  // We'll work at word level, marking positions that belong to a matching n-gram

  const words = [];
  // Split on word boundaries, keep whitespace and punctuation as separate tokens
  const re = /(\w+|\W+)/g;
  let m;
  while ((m = re.exec(para)) !== null) {
    words.push({ text: m[1], isWord: /\w+/.test(m[1]) });
  }

  // Build array of just the "word" tokens (lowercase) to check n-grams
  const wordIdxMap = [];  // maps wordToken index → words[] index
  words.forEach((w, i) => { if (w.isWord) wordIdxMap.push(i); });
  const wordLower = wordIdxMap.map(i => words[i].text.toLowerCase());

  // Mark which word positions are in a shared n-gram
  const marked = new Array(wordIdxMap.length).fill(false);
  for (let i = 0; i <= wordLower.length - n; i++) {
    const gram = wordLower.slice(i, i + n).join(' ');
    if (sharedNgrams.has(gram)) {
      for (let j = i; j < i + n; j++) marked[j] = true;
    }
  }

  // Reconstruct HTML with highlights
  let html = '';
  let wIdx = 0; // index into wordIdxMap
  words.forEach((w, i) => {
    if (!w.isWord) {
      html += escHtml(w.text);
    } else {
      const isMarked = marked[wIdx] === true;
      if (isMarked) {
        html += `<span class="match-hl">${escHtml(w.text)}</span>`;
      } else {
        html += escHtml(w.text);
      }
      wIdx++;
    }
  });
  return html;
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // document.getElementById('loadBtn').addEventListener('click', loadAll);
  loadAll();
  document.getElementById('detailClose').addEventListener('click', () => {
    document.getElementById('detailPanel').classList.remove('visible');
    document.querySelectorAll('.t-node').forEach(el => el.classList.remove('selected'));
  });
});
