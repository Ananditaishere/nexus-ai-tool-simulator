/**
 * NEXUS — AI Tool Decision Simulator
 * ui.js — DOM rendering, component builders, animations
 */

const UI = (() => {

  /* ---------- Task Grid ---------- */
  function renderTaskGrid(selectedTaskId, onSelect) {
    const grid = document.getElementById('taskGrid');
    if (!grid) return;

    grid.innerHTML = TASKS.map(task => `
      <div
        class="task-card${selectedTaskId === task.id ? ' selected' : ''}"
        data-task="${task.id}"
        role="button"
        tabindex="0"
        aria-pressed="${selectedTaskId === task.id}"
        aria-label="Select task: ${task.name}"
      >
        <span class="task-icon" aria-hidden="true">${task.icon}</span>
        <div class="task-name">${task.name}</div>
        <div class="task-desc">${task.desc}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.task-card').forEach(card => {
      const handler = () => onSelect(card.dataset.task);
      card.addEventListener('click', handler);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
    });
  }

  /* ---------- Weights Grid ---------- */
  function renderWeightsGrid(weights, onChange) {
    const grid = document.getElementById('weightsGrid');
    if (!grid) return;

    grid.innerHTML = PARAMS.map(param => `
      <div class="weight-block">
        <div class="weight-top">
          <span class="weight-label">${param.label}</span>
          <span class="weight-val" id="wval-${param.id}">${weights[param.id]}/10</span>
        </div>
        <input
          type="range"
          min="1" max="10"
          step="1"
          value="${weights[param.id]}"
          id="wrange-${param.id}"
          aria-label="${param.label} weight"
        />
        <div class="weight-desc">${param.desc}</div>
      </div>
    `).join('');

    PARAMS.forEach(({ id }) => {
      const input = document.getElementById(`wrange-${id}`);
      const display = document.getElementById(`wval-${id}`);
      if (!input || !display) return;
      input.addEventListener('input', () => {
        const val = parseInt(input.value, 10);
        display.textContent = `${val}/10`;
        onChange(id, val);
      });
    });
  }

  /* ---------- Requirement Chips ---------- */
  function renderReqChips(activeReqs, onToggle) {
    const container = document.getElementById('reqChips');
    if (!container) return;

    container.innerHTML = REQUIREMENTS.map(req => `
      <button
        class="chip${activeReqs.has(req.key) ? ' selected' : ''}"
        data-req="${req.key}"
        aria-pressed="${activeReqs.has(req.key)}"
        aria-label="Require: ${req.label}"
      >${req.label}</button>
    `).join('');

    container.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => onToggle(chip.dataset.req));
    });
  }

  /* ---------- Results ---------- */
  function renderResults(results, taskId) {
    const list = document.getElementById('resultsList');
    const banner = document.getElementById('verdictBanner');
    if (!list || !banner) return;

    // Verdict banner
    banner.innerHTML = Engine.buildVerdict(results[0], results[1], taskId);

    // Cards (top 4 only)
    list.innerHTML = results.slice(0, 4).map((tool, idx) => {
      const rank = idx + 1;
      const isTop = rank === 1;
      return `
        <article
          class="result-card${isTop ? ' rank-1' : ''}"
          data-rank="${rank}"
          aria-label="Rank ${rank}: ${tool.name}"
        >
          ${isTop ? '<div class="best-tag">★ BEST MATCH</div>' : ''}
          <div class="result-head">
            <div class="tool-avatar" style="background: ${tool.color}" aria-hidden="true">
              ${tool.icon}
            </div>
            <div class="tool-info">
              <div class="tool-name">${tool.name}</div>
              <div class="tool-tagline">${tool.tagline}</div>
            </div>
            <div class="score-badge" aria-label="Score: ${tool.finalScore} out of 100">
              <span class="score-num">${tool.finalScore}</span>
              <span class="score-denom">/100</span>
            </div>
          </div>
          <div class="param-bars">
            ${PARAMS.map(p => `
              <div class="param-row">
                <span class="param-name">${p.label}</span>
                <div class="bar-track">
                  <div
                    class="bar-fill"
                    style="width: 0%"
                    data-target="${tool.adjScores[p.id] * 10}"
                    role="progressbar"
                    aria-valuenow="${tool.adjScores[p.id]}"
                    aria-valuemin="0"
                    aria-valuemax="10"
                    aria-label="${p.label}: ${tool.adjScores[p.id]} out of 10"
                  ></div>
                </div>
                <span class="param-score">${tool.adjScores[p.id]}/10</span>
              </div>
            `).join('')}
          </div>
        </article>
      `;
    }).join('');

    // Animate bars after a tick (CSS transition kicks in)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        list.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = `${bar.dataset.target}%`;
        });
      });
    });
  }

  /* ---------- Step Progress ---------- */
  function updateProgress(currentStep) {
    document.querySelectorAll('.progress-step').forEach((el, i) => {
      el.classList.toggle('active', i === currentStep);
      el.classList.toggle('done', i < currentStep);
    });
    document.querySelectorAll('.progress-line').forEach((el, i) => {
      el.classList.toggle('done', i < currentStep);
    });
  }

  /* ---------- Panel Switching ---------- */
  function showPanel(stepIndex) {
    document.querySelectorAll('.step-panel').forEach((panel, i) => {
      panel.classList.toggle('active', i === stepIndex);
    });
    updateProgress(stepIndex);
    // Scroll to simulator top
    const sim = document.getElementById('simulator');
    if (sim) sim.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return { renderTaskGrid, renderWeightsGrid, renderReqChips, renderResults, showPanel };
})();
