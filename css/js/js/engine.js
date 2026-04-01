/**
 * NEXUS — AI Tool Decision Simulator
 * engine.js — Rule-based weighted scoring algorithm
 *
 * Algorithm:
 *   1. Start with base scores per tool per parameter (from data.js)
 *   2. Apply requirement boosts if the tool supports that requirement
 *   3. Multiply each adjusted score by the user's weight for that parameter
 *   4. Normalise: finalScore = Σ(adj_score × weight) / Σ(10 × weight) × 100
 *   5. Sort descending; return ranked array with per-param breakdown
 */

const Engine = (() => {

  /**
   * Score a single tool against user weights and active requirements.
   * @param {Object} tool        — tool definition from TOOLS[taskId]
   * @param {Object} weights     — { quality: 1–10, speed: 1–10, … }
   * @param {Set}    activeReqs  — Set of requirement keys ('free', 'api', …)
   * @returns {Object}           — { ...tool, adjScores, finalScore }
   */
  function scoreTool(tool, weights, activeReqs) {
    const caps = TOOL_CAPS[tool.name] || {};
    const adjScores = {};

    let weightedSum = 0;
    let weightedMax = 0;

    PARAMS.forEach(({ id }) => {
      let score = tool.scores[id];
      const w = weights[id];

      // Apply requirement boosts
      activeReqs.forEach(reqKey => {
        const req = REQUIREMENTS.find(r => r.key === reqKey);
        if (!req) return;
        // Only boost if this tool actually supports the requirement
        if (caps[reqKey]) {
          const boost = req.boosts[id] || 0;
          score = Math.min(10, score + boost);
        }
      });

      adjScores[id] = score;
      weightedSum += score * w;
      weightedMax += 10 * w;
    });

    const finalScore = weightedMax > 0
      ? Math.round((weightedSum / weightedMax) * 100)
      : 0;

    return { ...tool, adjScores, finalScore };
  }

  /**
   * Run the full scoring pipeline for a task category.
   * @param {string} taskId      — one of TASKS[].id
   * @param {Object} weights     — user-defined param weights
   * @param {Set}    activeReqs  — active requirement keys
   * @returns {Array}            — sorted tool results (best first)
   */
  function recommend(taskId, weights, activeReqs) {
    const tools = TOOLS[taskId];
    if (!tools || tools.length === 0) return [];

    return tools
      .map(tool => scoreTool(tool, weights, activeReqs))
      .sort((a, b) => b.finalScore - a.finalScore);
  }

  /**
   * Build a human-readable verdict string from the top result.
   * @param {Object} best      — top-ranked tool result
   * @param {Object} second    — second-ranked tool result
   * @param {string} taskId    — the selected task category ID
   * @returns {string}         — HTML verdict string
   */
  function buildVerdict(best, second, taskId) {
    const taskObj = TASKS.find(t => t.id === taskId);
    const taskName = taskObj ? taskObj.name.toLowerCase() : taskId;

    const gap = best.finalScore - second.finalScore;
    let confidence = 'a solid';
    if (gap >= 15) confidence = 'a clear standout';
    else if (gap >= 8) confidence = 'a strong';
    else if (gap <= 2) confidence = 'a marginal';

    return `
      <strong>${best.name}</strong> is ${confidence} recommendation for
      <strong>${taskName}</strong> tasks — scoring
      <span class="verdict-accent">${best.finalScore}/100</span>
      against your priorities.
      ${second ? `Runner-up: <strong>${second.name}</strong> at <span class="verdict-accent">${second.finalScore}/100</span>${gap <= 3 ? ' — very close race.' : '.'}` : ''}
    `;
  }

  return { recommend, buildVerdict };
})();
