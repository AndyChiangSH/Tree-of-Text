/* ================================================================
   Tree-of-Text Demo — RotoWire-FG (4 Tables Version)
   ================================================================ */

/* ===== 1. 全域變數與配置 ===== */
const OP_COLORS = {
  root: '#6366f1',
  select_table: '#06b6d4',
  select_row: '#10b981',
  select_col: '#3b82f6',
  count: '#f59e0b',
  sort: '#ec4899',
  filter: '#b000e0ff',
  write: '#ef4444',
};

const NODE_W = 200, NODE_H = 42, GAP_X = 64, GAP_Y = 24, PAD = 20;

let csvData = {}, logData = {}, refText = '', genText = {}, configData = {};
let nodeRegistry = {};
let activeFilters = new Set(Object.keys(OP_COLORS));

/* ===== 2. 輔助工具 (Helpers) ===== */

function opFromHistory(op_hist) {
  if (!op_hist || !op_hist.length) return 'root';
  const last = op_hist[op_hist.length - 1];
  const m = last.match(/^([a-z_]+)/);
  return m ? m[1] : 'root';
}

function colorForOp(op) { return OP_COLORS[op] || '#888'; }

function createBadgeHTML(opString, customStyle = "") {
  if (!opString) return '';
  const opType = opString.match(/^([a-z_]+)/)?.[1] || 'root';
  const color = colorForOp(opType);
  const defaultStyle = `background:${color}; color:white; padding:2px 8px; border-radius:4px; font-size:11px; margin-right:4px; display:inline-block; font-family:var(--font-mono);`;
  return `<span class="op-badge" style="${defaultStyle} ${customStyle}">${opString}</span>`;
}

function parseCSV(text) {
  const lines = text.trim().replace(/\r\n/g, '\n').split('\n').filter(Boolean);
  if (!lines.length) return { headers: [], rows: [] };
  const headers = lines[0].split(',');
  const rows = lines.slice(1).map(line => {
    const vals = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') inQ = !inQ;
      else if (line[i] === ',' && !inQ) { vals.push(cur); cur = ''; }
      else cur += line[i];
    }
    vals.push(cur);
    return vals;
  });
  return { headers, rows };
}

function renderCSVTable(csvText) {
  if (!csvText) return '<em style="color:var(--muted)">No data available</em>';
  const { headers, rows } = parseCSV(csvText);
  let html = '<table class="data-table"><thead><tr>';
  headers.forEach(h => html += `<th>${h}</th>`);
  html += '</tr></thead><tbody>';
  rows.forEach(row => {
    html += '<tr>';
    row.forEach(val => {
      const cleanVal = (val || '').trim();
      const isNum = !isNaN(cleanVal) && cleanVal !== '';
      html += `<td class="${isNum ? 'num' : ''}">${cleanVal || '—'}</td>`;
    });
    html += '</tr>';
  });
  return html + '</tbody></table>';
}

/* ===== 3. 資料載入 (更新為 4 個 CSV) ===== */
async function loadAll() {
  try {
    const [log, box, game, home, vis, config, text, report] = await Promise.all([
      fetch("log/log.json").then(r => r.json()),
      fetch("table/box_score.csv").then(r => r.text()),
      fetch("table/game.csv").then(r => r.text()),
      fetch("table/home_line.csv").then(r => r.text()),
      fetch("table/vis_line.csv").then(r => r.text()),
      fetch("config/config.json").then(r => r.json()),
      fetch("text/text.txt").then(r => r.text()),
      fetch("report/report.txt").then(r => r.text())
    ]);

    logData = log;
    // 將 4 個表格存入 csvData
    csvData = {
      box_score: box,
      game: game,
      home_line: home,
      vis_line: vis
    };
    configData = config;
    refText = text;
    genText = report;

    document.getElementById('mainContent').style.display = 'block';
    renderConfig();
    initTables();
    initTree();
    initComparison();
  } catch (err) { console.error("Initialization Error:", err); }
}

function renderConfig() {
  const grid = document.getElementById('configGrid');
  grid.innerHTML = Object.entries(configData).map(([k, v]) => `
    <div class="config-item">
      <div class="config-key">${k}</div>
      <div class="config-value">${Array.isArray(v) ? v.join(', ') : v}</div>
    </div>`).join('');
}

function initTables() {
  const container = document.getElementById('tableContainer');
  const tabs = document.querySelectorAll('.tab-btn');
  const showTab = (key) => {
    container.innerHTML = renderCSVTable(csvData[key]);
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === key));
  };
  tabs.forEach(t => t.onclick = () => showTab(t.dataset.tab));

  // 預設載入 box_score
  showTab('box_score');
}

/* ===== 4. 樹狀圖引擎 (Tree Engine) ===== */
function assignIds(node) {
  node._id = Math.random().toString(36).slice(2);
  nodeRegistry[node._id] = node;
  if (node.children) node.children.forEach(assignIds);
}

function subtreeLeafCount(node) {
  if (!node.children || !node.children.length) return 1;
  return node.children.reduce((s, c) => s + subtreeLeafCount(c), 0);
}

function layoutTree(node, depth, rowStart) {
  node._col = depth;
  const leaves = subtreeLeafCount(node);
  node._row = rowStart + (leaves - 1) / 2;
  let cursor = rowStart;
  (node.children || []).forEach(c => {
    layoutTree(c, depth + 1, cursor);
    cursor += subtreeLeafCount(c);
  });
}

function initTree() {
  nodeRegistry = {};
  const tree = JSON.parse(JSON.stringify(logData));
  assignIds(tree);
  layoutTree(tree, 0, 0);

  const canvas = document.getElementById('treeCanvas');
  const nodesEl = document.getElementById('treeNodes');
  const svg = document.getElementById('treeSvg');

  const flat = (n, acc = []) => { acc.push(n); (n.children || []).forEach(c => flat(c, acc)); return acc; };
  const allNodes = flat(tree);
  const maxCol = Math.max(...allNodes.map(n => n._col));
  const totalLeaves = subtreeLeafCount(tree);

  const canvasW = (maxCol + 1) * (NODE_W + GAP_X) + PAD * 2;
  const canvasH = totalLeaves * (NODE_H + GAP_Y) + PAD * 2;

  canvas.style.width = canvasW + 'px';
  canvas.style.height = canvasH + 'px';
  svg.setAttribute('width', canvasW);
  svg.setAttribute('height', canvasH);

  nodesEl.innerHTML = '';
  svg.innerHTML = '';

  allNodes.forEach(node => {
    const op = opFromHistory(node.operation_history);
    const x = node._col * (NODE_W + GAP_X) + PAD;
    const y = node._row * (NODE_H + GAP_Y) + PAD;

    const el = document.createElement('div');
    el.className = 't-node';
    el.dataset.id = node._id;
    el.dataset.op = op;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    el.style.background = colorForOp(op);

    const label = (node.operation_history || ['root()']).at(-1);
    el.textContent = label.length > 25 ? label.slice(0, 23) + '...' : label;
    el.onclick = () => showNodeDetail(node._id);
    nodesEl.appendChild(el);

    (node.children || []).forEach(child => {
      const cx = (child._col * (NODE_W + GAP_X)) + PAD;
      const cy = (child._row * (NODE_H + GAP_Y)) + PAD + NODE_H / 2;
      const x1 = x + NODE_W, y1 = y + NODE_H / 2;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x1},${y1} C${(x1 + cx) / 2},${y1} ${(x1 + cx) / 2},${cy} ${cx},${cy}`);
      path.setAttribute('stroke', '#2e3440');
      path.setAttribute('fill', 'none');
      path.dataset.parentId = node._id;
      path.dataset.childId = child._id;
      svg.appendChild(path);
    });
  });

  buildFilterChips();
  applyFilter();
}

function buildFilterChips() {
  const chipsEl = document.getElementById('filterChips');
  if (!chipsEl) return;
  chipsEl.innerHTML = '';
  Object.entries(OP_COLORS).forEach(([op, color]) => {
    const chip = document.createElement('div');
    chip.className = `chip ${activeFilters.has(op) ? 'active' : ''}`;
    chip.style.background = color;
    chip.textContent = op;
    chip.onclick = () => {
      if (activeFilters.has(op)) activeFilters.delete(op);
      else activeFilters.add(op);
      chip.classList.toggle('active');
      applyFilter();
    };
    chipsEl.appendChild(chip);
  });
}

function applyFilter() {
  document.querySelectorAll('.t-node').forEach(el => {
    el.classList.toggle('dimmed', !activeFilters.has(el.dataset.op));
  });
  document.querySelectorAll('#treeSvg path').forEach(path => {
    const pNode = document.querySelector(`.t-node[data-id="${path.dataset.parentId}"]`);
    const cNode = document.querySelector(`.t-node[data-id="${path.dataset.childId}"]`);
    const isDimmed = pNode?.classList.contains('dimmed') || cNode?.classList.contains('dimmed');
    path.style.opacity = isDimmed ? '0.1' : '1';
  });
}

/* ===== 5. 節點詳情 (Node Detail Modal) ===== */
function showNodeDetail(id) {
  const node = nodeRegistry[id];
  const body = document.getElementById('detailBody');
  const titleEl = document.getElementById('detailTitle');
  const overlay = document.getElementById('modalOverlay');

  body.innerHTML = '';
  const currentOp = (node.operation_history || ['root()']).at(-1);
  titleEl.innerHTML = createBadgeHTML(currentOp, "font-size:14px; padding:4px 12px; margin-bottom:0;");

  overlay.classList.add('visible');
  document.body.classList.add('modal-open');

  const levelDiv = document.createElement('div');
  levelDiv.className = 'detail-block full-width';
  levelDiv.innerHTML = `<div class="detail-block-label">level</div><div class="detail-block-content">${node._col}</div>`;
  body.appendChild(levelDiv);

  const histDiv = document.createElement('div');
  histDiv.className = 'detail-block full-width';
  const histBadges = (node.operation_history || []).map(op => createBadgeHTML(op)).join(' <span style="color:var(--muted); margin: 0 4px;">→</span> ');
  histDiv.innerHTML = `<div class="detail-block-label">operation_history</div><div class="detail-block-content" style="line-height:2.2;">${histBadges}</div>`;
  body.appendChild(histDiv);

  const poolDiv = document.createElement('div');
  poolDiv.className = 'detail-block full-width';
  const poolBadges = (node.operation_pool || []).map(op => createBadgeHTML(op)).join(' ');
  poolDiv.innerHTML = `<div class="detail-block-label">operation_pool</div><div class="detail-block-content" style="line-height:2.2;">${poolBadges || 'N/A'}</div>`;
  body.appendChild(poolDiv);

  // 處理多個表格顯示邏輯
  const tables = node.tables || (node.table ? { "Current": node.table } : {});
  Object.entries(tables).forEach(([name, data]) => {
    const div = document.createElement('div');
    div.className = 'detail-block full-width';
    div.innerHTML = `<div class="detail-block-label">table: ${name}</div><div class="detail-table-wrap">${renderCSVTable(data)}</div>`;
    body.appendChild(div);
  });

  if (node.report || (node.reports && node.reports.length)) {
    const content = node.report || node.reports.join('<br><br>');
    const div = document.createElement('div');
    div.className = 'detail-block full-width';
    div.innerHTML = `<div class="detail-block-label">report</div><div class="detail-block-content">${content}</div>`;
    body.appendChild(div);
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('visible');
  document.body.classList.remove('modal-open');
}

/* ===== 6. 文本比對 (Word-based Comparison) ===== */
function initComparison() {
  const refWords = new Set(refText.toLowerCase().match(/\w+/g) || []);
  const genWords = new Set(genText.toLowerCase().match(/\w+/g) || []);
  const sharedWords = new Set([...refWords].filter(w => genWords.has(w)));

  document.getElementById('referenceText').innerHTML = highlightText(refText, sharedWords);
  document.getElementById('generatedText').innerHTML = highlightText(genText, sharedWords);
}

function highlightText(text, sharedWords) {
  const parts = text.split(/(\W+)/);
  return parts.map(p => {
    if (/\w+/.test(p) && sharedWords.has(p.toLowerCase())) {
      return `<span class="match-hl">${p}</span>`;
    }
    return p;
  }).join('').replace(/\n/g, '<br>');
}

/* ===== 7. 事件綁定 ===== */
document.addEventListener('DOMContentLoaded', loadAll);
document.getElementById('detailClose').onclick = closeModal;
document.getElementById('modalOverlay').onclick = (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
};