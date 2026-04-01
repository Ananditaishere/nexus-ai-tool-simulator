/**
 * NEXUS — AI Tool Decision Simulator
 * main.js — Application state, event wiring, cursor, theme toggle
 */

/* ============================================================
   STATE
   ============================================================ */
const State = {
  selectedTask: null,
  weights: { quality: 5, speed: 5, cost: 5, ease: 5, privacy: 5, integration: 5 },
  activeReqs: new Set(),
  currentStep: 0,
};

/* ============================================================
   STEP NAVIGATION
   ============================================================ */
function goStep(step) {
  if (step === 1 && !State.selectedTask) {
    // Shake the task grid to hint user
    const grid = document.getElementById('taskGrid');
    grid.style.animation = 'none';
    grid.offsetHeight; // reflow
    grid.style.animation = 'shake 0.4s ease';
    return;
  }

  State.currentStep = step;
  UI.showPanel(step);

  if (step === 1) {
    UI.renderWeightsGrid(State.weights, (id, val) => {
      State.weights[id] = val;
    });
    UI.renderReqChips(State.activeReqs, (key) => {
      if (State.activeReqs.has(key)) State.activeReqs.delete(key);
      else State.activeReqs.add(key);
      UI.renderReqChips(State.activeReqs, arguments.callee);
    });
  }
}

function runScoring() {
  if (!State.selectedTask) { goStep(0); return; }

  const results = Engine.recommend(State.selectedTask, State.weights, State.activeReqs);
  UI.renderResults(results, State.selectedTask);
  goStep(2);
}

function restart() {
  State.selectedTask = null;
  State.weights = { quality: 5, speed: 5, cost: 5, ease: 5, privacy: 5, integration: 5 };
  State.activeReqs = new Set();
  State.currentStep = 0;

  UI.renderTaskGrid(null, handleTaskSelect);
  toggleNextBtn(false);
  goStep(0);
}

function scrollToSimulator() {
  document.getElementById('simulator').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============================================================
   TASK SELECTION
   ============================================================ */
function handleTaskSelect(taskId) {
  State.selectedTask = taskId;
  UI.renderTaskGrid(taskId, handleTaskSelect);
  toggleNextBtn(true);
}

function toggleNextBtn(enabled) {
  const btn = document.getElementById('toStep1');
  if (btn) btn.disabled = !enabled;
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  if (!cursor || !dot) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Smooth follow for outer ring
  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states
  const hoverEls = 'button, a, .task-card, .chip, input[type="range"]';
  document.addEventListener('mouseover', e => {
    if (e.target.matches(hoverEls) || e.target.closest(hoverEls)) {
      cursor.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.matches(hoverEls) || e.target.closest(hoverEls)) {
      cursor.classList.remove('hovering');
    }
  });
  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  const icon = btn ? btn.querySelector('.theme-icon') : null;

  const saved = localStorage.getItem('nexus-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    if (icon) icon.textContent = saved === 'light' ? '◐' : '◑';
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nexus-theme', next);
      if (icon) icon.textContent = next === 'light' ? '◐' : '◑';
    });
  }
}

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.how-card, .about-grid > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/* ============================================================
   KEYBOARD ACCESSIBILITY
   ============================================================ */
function initA11y() {
  // Allow Enter on task cards
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && State.currentStep === 2) goStep(1);
  });
}

/* ============================================================
   SHAKE ANIMATION (inject keyframe)
   ============================================================ */
function injectShakeKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  injectShakeKeyframe();
  initCursor();
  initTheme();
  initScrollAnimations();
  initA11y();

  // Initial render — step 0
  UI.renderTaskGrid(null, handleTaskSelect);
  UI.showPanel(0);
  toggleNextBtn(false);
});
