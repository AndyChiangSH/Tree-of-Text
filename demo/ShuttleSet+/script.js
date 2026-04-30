/* ===== DATA ===== */

const CSV = {
  match: `id,video,tournament,round,year,month,day,set,duration,winner,loser,set_1_winner_score,set_1_loser_score,set_2_winner_score,set_2_loser_score,set_3_winner_score,set_3_loser_score
36,Akane_YAMAGUCHI_CHEN_Yu_Fei_England_Open_2022_Semi_finals,YONEX All England Open Badminton Championships 2022,Semi-finals,2022,3,19,2,41,Akane YAMAGUCHI,CHEN Yufei,20,11,21,13,,`,

  set1: `rally,ball_round,time,winner_score,loser_score,getpoint_player,ball_type,lose_reason,win_reason
1,17,00:08:41,0,1,CHEN Yufei,return net,fails to clear the net,opponent fails to clear the net
2,18,00:09:13,0,2,CHEN Yufei,lob,goes out of bounds,opponent goes out of bounds
3,15,00:09:47,1,2,Akane YAMAGUCHI,net shot,fails to clear the net,opponent fails to clear the net
4,8,00:10:14,1,3,CHEN Yufei,clear,landing judgment error,opponent landing judgment error
5,11,00:10:47,1,4,CHEN Yufei,smash,opponent wins by landing,wins by landing
7,10,00:11:53,2,5,Akane YAMAGUCHI,return net,opponent wins by landing,wins by landing
9,4,00:12:41,4,5,Akane YAMAGUCHI,drop,hits the net,opponent hits the net
10,8,00:13:05,5,5,Akane YAMAGUCHI,return net,fails to clear the net,opponent fails to clear the net
11,9,00:13:29,5,6,CHEN Yufei,rush,goes out of bounds,opponent goes out of bounds
14,25,00:15:21,7,7,CHEN Yufei,cross-court net shot,hits the net,opponent hits the net
15,3,00:15:49,8,7,Akane YAMAGUCHI,return net,hits the net,opponent hits the net
16,3,00:16:09,9,7,Akane YAMAGUCHI,lob,landing judgment error,opponent landing judgment error
17,4,00:16:39,10,7,Akane YAMAGUCHI,lob,goes out of bounds,opponent goes out of bounds
18,11,00:17:04,11,7,Akane YAMAGUCHI,smash,opponent wins by landing,wins by landing
19,8,00:18:24,12,7,Akane YAMAGUCHI,return net,fails to clear the net,opponent fails to clear the net
20,17,00:18:57,12,8,CHEN Yufei,clear,goes out of bounds,opponent goes out of bounds
22,6,00:20:04,14,8,Akane YAMAGUCHI,return net,hits the net,opponent hits the net
23,6,00:20:36,15,8,Akane YAMAGUCHI,return net,fails to clear the net,opponent fails to clear the net
24,22,00:21:17,16,8,Akane YAMAGUCHI,drop,goes out of bounds,opponent goes out of bounds
25,2,00:21:41,16,9,CHEN Yufei,drop,opponent wins by landing,wins by landing
26,12,00:22:15,16,10,CHEN Yufei,clear,goes out of bounds,opponent goes out of bounds
27,10,00:22:46,17,10,Akane YAMAGUCHI,lob,landing judgment error,opponent landing judgment error
28,12,00:23:40,18,10,Akane YAMAGUCHI,lob,goes out of bounds,opponent goes out of bounds
30,13,00:24:31,19,11,Akane YAMAGUCHI,clear,goes out of bounds,opponent goes out of bounds
31,14,00:25:02,20,11,Akane YAMAGUCHI,lob,goes out of bounds,opponent goes out of bounds
32,15,00:25:52,21,11,Akane YAMAGUCHI,clear,goes out of bounds,opponent goes out of bounds`,

  set2: `rally,ball_round,time,winner_score,loser_score,getpoint_player,ball_type,lose_reason,win_reason
1,22,00:28:00,1,0,Akane YAMAGUCHI,lob,goes out of bounds,opponent goes out of bounds
2,21,00:28:38,1,1,CHEN Yufei,net shot,goes out of bounds,opponent goes out of bounds
3,2,00:29:08,2,1,Akane YAMAGUCHI,wrist smash,landing judgment error,opponent landing judgment error
4,6,00:29:50,3,1,Akane YAMAGUCHI,clear,goes out of bounds,opponent goes out of bounds
5,21,00:30:45,3,2,CHEN Yufei,lob,hits the net,opponent hits the net
7,6,00:31:53,5,2,Akane YAMAGUCHI,net shot,hits the net,opponent hits the net
9,8,00:32:55,7,2,Akane YAMAGUCHI,defensive return lob,goes out of bounds,opponent goes out of bounds
10,7,00:33:30,8,2,Akane YAMAGUCHI,defensive return lob,landing judgment error,opponent landing judgment error
11,13,00:34:00,9,2,Akane YAMAGUCHI,smash,opponent wins by landing,wins by landing
12,22,00:34:42,9,3,CHEN Yufei,wrist smash,opponent wins by landing,wins by landing
13,12,00:35:21,9,4,CHEN Yufei,smash,goes out of bounds,opponent goes out of bounds
14,10,00:35:58,10,4,Akane YAMAGUCHI,back-court drive,landing judgment error,opponent landing judgment error
17,13,00:38:51,12,5,Akane YAMAGUCHI,smash,hits the net,opponent hits the net
18,18,00:39:36,13,5,Akane YAMAGUCHI,clear,goes out of bounds,opponent goes out of bounds
19,13,00:40:09,14,5,Akane YAMAGUCHI,net shot,opponent wins by landing,wins by landing
20,7,00:40:44,14,6,CHEN Yufei,return net,fails to clear the net,opponent fails to clear the net
21,6,00:41:10,15,6,Akane YAMAGUCHI,smash,opponent wins by landing,wins by landing
22,2,00:41:31,16,6,Akane YAMAGUCHI,wrist smash,goes out of bounds,opponent goes out of bounds
23,9,00:41:54,16,7,CHEN Yufei,clear,goes out of bounds,opponent goes out of bounds
24,12,00:42:46,16,8,CHEN Yufei,smash,hits the net,opponent hits the net
26,6,00:43:45,17,9,CHEN Yufei,wrist smash,opponent wins by landing,wins by landing
27,18,00:44:27,17,10,CHEN Yufei,lob,goes out of bounds,opponent goes out of bounds
28,20,00:45:22,17,11,CHEN Yufei,return net,fails to clear the net,opponent fails to clear the net
30,2,00:47:23,19,11,Akane YAMAGUCHI,smash,goes out of bounds,opponent goes out of bounds
31,13,00:48:01,19,12,CHEN Yufei,return net,hits the net,opponent hits the net
32,7,00:48:29,19,13,CHEN Yufei,smash,opponent wins by landing,wins by landing
33,16,00:49:05,20,13,Akane YAMAGUCHI,unknown,opponent wins by landing,wins by landing
34,4,00:49:33,21,13,Akane YAMAGUCHI,return net,hits the net,opponent hits the net`
};

const CONFIG = {
  dataset: "ShuttleSet+",
  mode: "test",
  prompt: "Zero-shot",
  operation_history: "chain",
  operation_argument: "one-step",
  operation_pool: ["root","select_table","select_row","select_col","count","sort","filter","write"],
  max_depth: 5,
  max_degree: 5,
  tree_traversal: "DFS",
  table_format: "CSV",
  planning_model: "gpt-4o-mini",
  planning_tokens: 100,
  planning_temperature: 0.7,
  write_model: "gpt-4o-mini",
  write_tokens: 100,
  write_temperature: 0.3,
  generating_model: "gpt-4o-mini",
  generating_tokens: 1000,
  generating_temperature: 0.5,
  extraction_prompt: "zero-shot_2",
  extraction_model: "gpt-4o-mini",
  extraction_tokens: 100,
  extraction_temperature: 0.5
};

// The actual tree from log.json (condensed)
const TREE = {
  op: "root",
  label: "root()",
  level: 1,
  children: [
    {
      op: "select_table",
      label: "select_table(set_1)",
      level: 2,
      children: [{
        op: "select_row",
        label: "select_row(0:10)",
        level: 3,
        children: [{
          op: "select_col",
          label: "select_col(getpoint_player,\nball_type, win_reason)",
          level: 4,
          children: [{
            op: "write",
            label: "write()",
            level: 5,
            report: "In a thrilling match between CHEN Yufei and Akane YAMAGUCHI, both players showcased their skills in set 1. CHEN's successful lob forced Akane out of bounds and a decisive smash landed in. Akane demonstrated her prowess with a net shot and return net, capitalizing on CHEN's errors.",
            children: []
          }]
        }]
      }]
    },
    {
      op: "select_table",
      label: "select_table(set_2)",
      level: 2,
      children: [{
        op: "select_row",
        label: "select_row(0, 10:20)",
        level: 3,
        children: [{
          op: "select_col",
          label: "select_col(getpoint_player,\nball_type, win_reason)",
          level: 4,
          children: [{
            op: "write",
            label: "write()",
            level: 5,
            report: "In the second set, Akane Yamaguchi showcased a lob and back-court drive, capitalizing on CHEN's errors. Yamaguchi dominated with clear and net shot wins by landing. CHEN responded with smash and wrist smash, but Yamaguchi maintained control throughout the set.",
            children: []
          }]
        }]
      }]
    },
    {
      op: "count",
      label: "count(getpoint_player)",
      level: 2,
      children: [{
        op: "select_table",
        label: "select_table(set_1)",
        level: 3,
        children: [{
          op: "filter",
          label: "filter(count >= 10)",
          level: 4,
          children: [{
            op: "write",
            label: "write()",
            level: 5,
            report: "In the first set of the match, Akane Yamaguchi demonstrated her dominance by winning a total of 16 rallies, showcasing her exceptional skills and strategic play.",
            children: []
          }]
        }],
      }, {
        op: "select_table",
        label: "select_table(set_2)",
        level: 3,
        children: [{
          op: "filter",
          label: "filter(count >= 10)",
          level: 4,
          children: [{
            op: "write",
            label: "write()",
            level: 5,
            report: "In the second set, Akane Yamaguchi emerged as the dominant player, winning 21 rallies compared to CHEN Yufei's 13. This performance highlights Yamaguchi's strong gameplay.",
            children: []
          }]
        }]
      }, {
        op: "select_table",
        label: "select_table(match)",
        level: 3,
        children: [{
          op: "write",
          label: "write()",
          level: 4,
          report: "In the semi-finals of the YONEX All England Open Badminton Championships 2022, Akane Yamaguchi triumphed over CHEN Yufei with a match duration of 41 minutes, winning in two sets. The first set concluded with Yamaguchi scoring 20 points to CHEN's 11, while the second set ended 21-13.",
          children: []
        }]
      }]
    },
    {
      op: "count",
      label: "count(ball_type)",
      level: 2,
      children: [{
        op: "sort",
        label: "sort(count:descending)",
        level: 3,
        children: [{
          op: "select_table",
          label: "select_table(set_1)",
          level: 4,
          children: [{
            op: "write",
            label: "write()",
            level: 5,
            report: "In the first set, \"return net\" was the most frequent shot at 7 occurrences, followed by \"lob\" at 6 and \"clear\" at 4. Other shots included \"drop\" with 3, \"smash\" with 2, and single instances of \"cross-court net shot,\" \"net shot,\" and \"rush.\"",
            children: []
          }]
        }, {
          op: "write",
          label: "write()",
          level: 4,
          report: "In the semi-finals of the YONEX All England Open Badminton Championships 2022, held on March 19, Akane Yamaguchi triumphed over CHEN Yufei in 41 minutes, winning with scores of 20-11 and 21-13. The first set featured 7 return net shots and 6 lobs, while the second showcased Yamaguchi's dominant performance.",
          children: []
        }]
      }, {
        op: "select_table",
        label: "select_table(set_2)",
        level: 3,
        children: [{
          op: "sort",
          label: "sort(count:descending)",
          level: 4,
          children: [{
            op: "write",
            label: "write()",
            level: 5,
            report: "In the second set, the smash was the most frequent shot at 7 times. The wrist smash followed with 4 instances, while return net and lob were executed 4 and 3 times. Other shots included clear and net shot each 3 times, 2 defensive return lobs, a back-court drive, and one unknown shot.",
            children: []
          }]
        }]
      }]
    },
    {
      op: "write",
      label: "write()",
      level: 2,
      report: "In the semi-finals of the YONEX All England Open Badminton Championships 2022, Akane Yamaguchi triumphed over Chen Yufei in 41 minutes, winning in two sets with scores of 20-11 and 21-13. The first set saw rallies showcasing both players' skills, but Yamaguchi capitalized on errors to secure the lead.",
      children: []
    }
  ]
};

// Final generated report
const FINAL_REPORT = `In the semi-finals of the YONEX All England Open Badminton Championships 2022, Akane Yamaguchi faced off against CHEN Yufei in a thrilling match that lasted 41 minutes. Yamaguchi emerged victorious, winning in two sets with scores of 21-11 and 21-13.

In the first set, both players showcased their skills, with CHEN Yufei initially taking the lead. CHEN displayed impressive shots, including a successful lob that forced Akane out of bounds and a decisive smash. However, Akane Yamaguchi demonstrated her dominance by winning a total of 16 rallies, showcasing her exceptional skills and strategic play. She capitalized on CHEN's errors, including landing judgment mistakes and hitting the net, effectively turning the tide in her favor. The set concluded with Yamaguchi scoring 21 points to CHEN's 11.

The first set featured a diverse range of shot types, with "return net" being the most frequent at 7 occurrences, followed by "lob" at 6 and "clear" at 4. Other notable shots included "drop" with 3, "smash" with 2, and single instances of "cross-court net shot," "net shot," and "rush." This variety contributed to the dynamics of the set.

In the second set, Akane Yamaguchi continued her strong performance, winning 21 rallies compared to CHEN Yufei's 13. Yamaguchi utilized a series of effective shots, including a lob and a back-court drive, while CHEN managed to respond with a smash and a wrist smash, winning some points. The second set was marked by strategic plays and errors from both players, but Yamaguchi maintained her dominance, ultimately winning the set 21-13.

The second set showcased a different shot distribution, with the smash being the most frequent, occurring 7 times. The wrist smash followed closely with 4 instances, while both the return net and lob were executed 4 and 3 times, respectively. Other notable shots included the clear and net shot, each appearing 3 times, along with 2 defensive return lobs and a back-court drive. An unknown shot type was also recorded once during this set, highlighting the diverse range of techniques employed by both players.

Overall, Akane Yamaguchi's performance in the semi-finals of the YONEX All England Open Badminton Championships was a testament to her skill and strategic gameplay, leading her to a well-deserved victory against CHEN Yufei.`;

const REFERENCE_TEXT = `Yamaguchi Akane defeats Chen Yufei in the women's singles semi-final

Yamaguchi Akane has beaten Chen Yufei 21-11, 21-13 in the women's All England semi-final, setting up a final with An Seyoung tomorrow, Sunday 20 March.

Billed as a battle between the world champ and the Olympic champ, Yamaguchi came out on top and put on a clinic after a slow start.

She came from 1-5 down to clinch the first game 21-11 and never looked back, Chen simply had no answer to Yamaguchi's all-action style as she returned absolutely everything and took her chances clinically.

11-4 ahead at the interval of game two there was no coming back for Chen and Yamaguchi put it away with some breathtaking badminton.

She'll face South Korean An tomorrow who also had a straight games victory over Tai Tzu Ying in her semi-final.`;

// Leaf reports for merge tree
const LEAF_REPORTS = [
  { label: "Leaf 1 · Set 1 Rally Details", text: "In a thrilling match between CHEN Yufei and Akane YAMAGUCHI, both players showcased their skills in set 1. CHEN's successful lob forced Akane out of bounds and a decisive smash landed in." },
  { label: "Leaf 2 · Set 2 Rally Details", text: "In the second set, Akane Yamaguchi showcased a lob and back-court drive, capitalizing on CHEN's errors. Yamaguchi dominated with clear and net shot wins by landing." },
  { label: "Leaf 3 · Set 1 Rally Count", text: "In the first set, Akane Yamaguchi demonstrated her dominance by winning a total of 16 rallies, showcasing her exceptional skills and strategic play." },
  { label: "Leaf 4 · Set 2 Rally Count", text: "In the second set, Akane Yamaguchi emerged as the dominant player, winning 21 rallies compared to CHEN Yufei's 13." },
  { label: "Leaf 5 · Match Overview", text: "In the YONEX All England Open 2022 semi-finals, Akane Yamaguchi triumphed over CHEN Yufei in 41 minutes, winning two sets. Set 1: 20-11, Set 2: 21-13." },
  { label: "Leaf 6 · Set 1 Shot Types", text: "\"Return net\" was the most frequent shot at 7, followed by \"lob\" at 6 and \"clear\" at 4. Other shots: \"drop\" ×3, \"smash\" ×2, single instances of others." },
  { label: "Leaf 7 · Set 2 Shot Types", text: "Smash was most frequent at 7 times. Wrist smash ×4, return net ×4, lob ×3, clear ×3, net shot ×3, defensive return lob ×2, back-court drive ×1, unknown ×1." },
];

/* ===== OP COLORS ===== */
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

/* ===== CSV PARSER ===== */
function parseCSV(text) {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
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

/* ===== RENDER TABLE ===== */
function renderTable(csvText, tableKey) {
  const { headers, rows } = parseCSV(csvText);
  const numericCols = new Set(['id','rally','ball_round','year','month','day','set','duration',
    'winner_score','loser_score','set_1_winner_score','set_1_loser_score','set_2_winner_score',
    'set_2_loser_score','set_3_winner_score','set_3_loser_score']);

  let html = '<table class="data-table"><thead><tr>';
  headers.forEach(h => { html += `<th>${h}</th>`; });
  html += '</tr></thead><tbody>';

  rows.forEach(row => {
    html += '<tr>';
    headers.forEach((h, i) => {
      const val = (row[i] || '').trim();
      let cls = '';
      if (numericCols.has(h)) cls = 'num';
      if (h === 'winner' || h === 'getpoint_player') {
        cls = val.includes('YAMAGUCHI') ? 'player-winner' : 'player-loser';
      }
      html += `<td class="${cls}">${val || '—'}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  return html;
}

/* ===== INIT TABLES ===== */
function initTables() {
  const container = document.getElementById('tableContainer');
  const tabs = document.querySelectorAll('.tab-btn');
  const tableMap = { match: CSV.match, set1: CSV.set1, set2: CSV.set2 };

  function showTab(key) {
    container.innerHTML = renderTable(tableMap[key], key);
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === key));
  }

  tabs.forEach(t => t.addEventListener('click', () => showTab(t.dataset.tab)));
  showTab('match');
}

/* ===== INIT CONFIG ===== */
function initConfig() {
  const grid = document.getElementById('configGrid');
  const entries = Object.entries(CONFIG);
  grid.innerHTML = entries.map(([k, v]) => {
    const isArr = Array.isArray(v);
    const display = isArr ? v.join(', ') : String(v);
    return `<div class="config-item">
      <div class="config-key">${k}</div>
      <div class="config-value${isArr ? ' is-array' : ''}">${display}</div>
    </div>`;
  }).join('');
}

/* ===== TREE RENDERING ===== */
let activeFilters = new Set(Object.keys(OP_COLORS));

function getOpName(label) {
  const m = label.match(/^([a-z_]+)/);
  return m ? m[1] : 'root';
}

function buildNodeEl(node, depth) {
  const op = node.op || getOpName(node.label);
  const color = OP_COLORS[op] || '#888';
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = !hasChildren;

  const nodeEl = document.createElement('div');
  nodeEl.className = 'tree-node';
  nodeEl.dataset.op = op;

  const bodyEl = document.createElement('div');
  bodyEl.className = 'node-body';
  bodyEl.dataset.op = op;

  // Node box
  const box = document.createElement('div');
  box.className = `node-box op-${op}`;
  box.style.background = color;
  box.style.boxShadow = `0 2px 8px ${color}55`;

  const labelLines = node.label.split('\n');
  box.innerHTML = labelLines.map((l, i) => i === 0 ? l : `<br><span style="opacity:0.8;font-size:10px">${l}</span>`).join('');

  if (hasChildren) {
    const icon = document.createElement('span');
    icon.className = 'toggle-icon';
    icon.textContent = '▾';
    box.appendChild(icon);
  }

  const lvl = document.createElement('span');
  lvl.className = 'node-level';
  lvl.textContent = `L${node.level}`;
  box.appendChild(lvl);

  bodyEl.appendChild(box);

  // Report tooltip for write nodes
  if (op === 'write' && node.report) {
    const rpt = document.createElement('div');
    rpt.className = 'node-report';
    rpt.textContent = node.report.slice(0, 200) + (node.report.length > 200 ? '…' : '');
    bodyEl.appendChild(rpt);
    box.style.cursor = 'help';
  }

  nodeEl.appendChild(bodyEl);

  if (hasChildren) {
    // Connector line
    const conn = document.createElement('div');
    conn.className = 'node-connector-right';
    conn.style.background = color + '88';
    nodeEl.appendChild(conn);

    // Children column
    const childCol = document.createElement('div');
    childCol.className = 'children-col';
    childCol.dataset.parentOp = op;

    node.children.forEach(child => {
      const childRow = document.createElement('div');
      childRow.className = 'child-row';

      const elbow = document.createElement('div');
      elbow.className = 'child-elbow';
      childRow.appendChild(elbow);

      const childNode = buildNodeEl(child, depth + 1);
      childRow.appendChild(childNode);
      childCol.appendChild(childRow);
    });

    // Toggle collapse on click
    box.addEventListener('click', (e) => {
      if (op === 'write') return;
      const collapsed = childCol.classList.toggle('collapsed');
      box.querySelector('.toggle-icon').textContent = collapsed ? '▸' : '▾';
    });

    nodeEl.appendChild(childCol);
  }

  return nodeEl;
}

function initTree() {
  const wrapper = document.getElementById('treeWrapper');
  const treeEl = buildNodeEl(TREE, 0);
  wrapper.appendChild(treeEl);

  // Filter chips
  const chipsEl = document.getElementById('filterChips');
  Object.entries(OP_COLORS).forEach(([op, color]) => {
    const chip = document.createElement('div');
    chip.className = 'chip active';
    chip.dataset.op = op;
    chip.textContent = op;
    chip.style.background = color;
    chip.style.borderColor = color;
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      if (activeFilters.has(op)) activeFilters.delete(op);
      else activeFilters.add(op);
      applyFilter();
    });
    chipsEl.appendChild(chip);
  });

  // Expand / collapse all
  document.getElementById('expandAll').addEventListener('click', () => {
    wrapper.querySelectorAll('.children-col').forEach(c => c.classList.remove('collapsed'));
    wrapper.querySelectorAll('.toggle-icon').forEach(i => i.textContent = '▾');
  });

  document.getElementById('collapseAll').addEventListener('click', () => {
    wrapper.querySelectorAll('.children-col:not(:first-of-type)').forEach(c => {
      const lvl = c.closest('.tree-node')?.querySelector('.node-level');
      if (lvl && parseInt(lvl.textContent.replace('L','')) > 1) c.classList.add('collapsed');
    });
    // collapse all children of root
    wrapper.querySelectorAll('.children-col').forEach(c => {
      if (!c.closest('.tree-node').parentElement.classList.contains('tree-wrapper')) {
        c.classList.add('collapsed');
      }
    });
    wrapper.querySelectorAll('.toggle-icon').forEach(i => i.textContent = '▸');
  });
}

function applyFilter() {
  const wrapper = document.getElementById('treeWrapper');
  wrapper.querySelectorAll('.node-body').forEach(body => {
    const op = body.dataset.op;
    if (activeFilters.has(op)) {
      body.classList.remove('dimmed');
    } else {
      body.classList.add('dimmed');
    }
  });
}

/* ===== MERGE TREE ===== */
function initMergeTree() {
  const wrapper = document.getElementById('mergeWrapper');

  // Final output (top / root of inverted tree)
  const finalBox = document.createElement('div');
  finalBox.className = 'merge-final';
  finalBox.innerHTML = `<div class="merge-final-label">⬇ Final Generated Report (Merged Output)</div>
    <div>${FINAL_REPORT.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>`;
  wrapper.appendChild(finalBox);

  // Connector down
  const conn1 = document.createElement('div');
  conn1.className = 'merge-connector merge-connector-down';
  wrapper.appendChild(conn1);

  // Generate box
  const genBox = document.createElement('div');
  genBox.className = 'merge-generate-box';
  genBox.innerHTML = `<div class="merge-generate-icon">⚙️</div>
    <strong>generate()</strong><br>
    <span style="font-size:11px;color:#888;margin-top:4px;display:block">gpt-4o-mini · max 1000 tokens · Merge & rewrite all leaf reports</span>`;
  wrapper.appendChild(genBox);

  // Connector up
  const conn2 = document.createElement('div');
  conn2.className = 'merge-connector';
  wrapper.appendChild(conn2);

  // Leaf reports row
  const leavesRow = document.createElement('div');
  leavesRow.className = 'merge-leaves-row';

  LEAF_REPORTS.forEach(leaf => {
    const leafEl = document.createElement('div');
    leafEl.className = 'merge-leaf';
    leafEl.innerHTML = `<div class="merge-leaf-label">${leaf.label}</div>${leaf.text}`;
    leavesRow.appendChild(leafEl);
  });

  wrapper.appendChild(leavesRow);
}

/* ===== COMPARISON ===== */
function initComparison() {
  const refEl = document.getElementById('referenceText');
  const genEl = document.getElementById('generatedText');

  // Reference
  REFERENCE_TEXT.split('\n\n').forEach(para => {
    const p = document.createElement('p');
    p.textContent = para;
    refEl.appendChild(p);
  });

  // Generated
  FINAL_REPORT.split('\n\n').forEach(para => {
    const p = document.createElement('p');
    p.textContent = para;
    genEl.appendChild(p);
  });
}

/* ===== INIT ALL ===== */
document.addEventListener('DOMContentLoaded', () => {
  initTables();
  initConfig();
  initTree();
  initMergeTree();
  initComparison();
});
