/**
 * OMAR ABDELHAMID — PORTFOLIO ENGINE
 * Architecture: Zero-Bloat Vanilla JavaScript
 * Features:
 * 1. Raycast-grade Command Palette (Ctrl+K / Cmd+K)
 * 2. Sliding Filter Track with Spring Physics
 * 3. Interactive Agentic RAG Pipeline Simulator
 * 4. BibTeX Citation Modal & Clipboard Engine
 * 5. Minimalist Ambient Constellation Canvas
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MINIMALIST AMBIENT CANVAS
  // ==========================================
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    const count = Math.min(Math.floor((width * height) / 32000), 45);
    const maxDist = 110;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.2 + 0.6;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // ==========================================
  // 2. TOAST NOTIFICATION ENGINE
  // ==========================================
  const toastBar = document.getElementById('toastBar');
  let toastTimer = null;

  function showToast(message = 'Copied to clipboard') {
    if (!toastBar) return;
    toastBar.textContent = message;
    toastBar.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastBar.classList.remove('show');
    }, 2400);
  }

  // ==========================================
  // 3. CLIPBOARD COPY TRIGGERS
  // ==========================================
  const quickEmailBtn = document.getElementById('copyEmailQuickBtn');
  if (quickEmailBtn) {
    quickEmailBtn.addEventListener('click', () => {
      const email = quickEmailBtn.getAttribute('data-email') || 'omarabdelhamid347@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard');
        const span = quickEmailBtn.querySelector('span');
        const originalText = span.textContent;
        span.textContent = 'Copied!';
        setTimeout(() => { span.textContent = originalText; }, 2000);
      });
    });
  }

  document.querySelectorAll('.btn-copy-method').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy') || 'omarabdelhamid347@gmail.com';
      navigator.clipboard.writeText(val).then(() => {
        showToast('Email copied to clipboard');
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 2000);
      });
    });
  });

  // ==========================================
  // 4. COMMAND PALETTE (Ctrl+K)
  // ==========================================
  const paletteBackdrop = document.getElementById('paletteBackdrop');
  const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
  const paletteInput = document.getElementById('paletteInput');
  const closePaletteKey = document.getElementById('closePaletteKey');
  const paletteItems = Array.from(document.querySelectorAll('.palette-item'));

  function openPalette() {
    if (!paletteBackdrop) return;
    paletteBackdrop.classList.add('active');
    if (paletteInput) {
      paletteInput.value = '';
      filterPalette('');
      setTimeout(() => paletteInput.focus(), 50);
    }
  }

  function closePalette() {
    if (!paletteBackdrop) return;
    paletteBackdrop.classList.remove('active');
  }

  if (cmdPaletteBtn) {
    cmdPaletteBtn.addEventListener('click', openPalette);
  }

  if (closePaletteKey) {
    closePaletteKey.addEventListener('click', closePalette);
  }

  if (paletteBackdrop) {
    paletteBackdrop.addEventListener('click', (e) => {
      if (e.target === paletteBackdrop) closePalette();
    });
  }

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteBackdrop && paletteBackdrop.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Filter items in palette
  function filterPalette(query) {
    const q = query.trim().toLowerCase();
    let firstVisible = null;

    paletteItems.forEach(item => {
      const text = item.querySelector('.item-name')?.textContent.toLowerCase() || '';
      if (!q || text.includes(q)) {
        item.style.display = 'flex';
        if (!firstVisible) firstVisible = item;
      } else {
        item.style.display = 'none';
        item.classList.remove('selected');
      }
    });

    paletteItems.forEach(i => i.classList.remove('selected'));
    if (firstVisible) firstVisible.classList.add('selected');
  }

  if (paletteInput) {
    paletteInput.addEventListener('input', (e) => {
      filterPalette(e.target.value);
    });

    paletteInput.addEventListener('keydown', (e) => {
      const visibleItems = paletteItems.filter(i => i.style.display !== 'none');
      if (!visibleItems.length) return;

      const currentIndex = visibleItems.findIndex(i => i.classList.contains('selected'));

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % visibleItems.length;
        visibleItems.forEach(i => i.classList.remove('selected'));
        visibleItems[nextIndex].classList.add('selected');
        visibleItems[nextIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        visibleItems.forEach(i => i.classList.remove('selected'));
        visibleItems[prevIndex].classList.add('selected');
        visibleItems[prevIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = visibleItems[currentIndex >= 0 ? currentIndex : 0];
        if (selected) executePaletteAction(selected);
      }
    });
  }

  paletteItems.forEach(item => {
    item.addEventListener('click', () => executePaletteAction(item));
    item.addEventListener('mouseenter', () => {
      paletteItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
    });
  });

  function executePaletteAction(item) {
    const action = item.getAttribute('data-action');
    closePalette();

    if (action === 'nav') {
      const target = item.getAttribute('data-target');
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action === 'copy') {
      const val = item.getAttribute('data-val');
      navigator.clipboard.writeText(val).then(() => {
        showToast('Email copied to clipboard');
      });
    } else if (action === 'external') {
      const url = item.getAttribute('data-url');
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  // ==========================================
  // 5. SLIDING FILTER TRACK & CARD FILTERING
  // ==========================================
  const filterTrack = document.getElementById('filterTrack');
  const filterHighlight = document.getElementById('filterHighlight');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const systemCards = document.querySelectorAll('.system-card');

  function updateHighlight(targetBtn) {
    if (!filterHighlight || !targetBtn) return;
    const trackRect = filterTrack.getBoundingClientRect();
    const btnRect = targetBtn.getBoundingClientRect();
    const leftOffset = btnRect.left - trackRect.left;

    filterHighlight.style.width = `${btnRect.width}px`;
    filterHighlight.style.transform = `translateX(${leftOffset - 4}px)`;
    filterHighlight.style.opacity = '1';
  }

  // Initial highlight placement
  const activeBtn = document.querySelector('.filter-btn.active');
  if (activeBtn) {
    // Wait for layout calculation
    setTimeout(() => updateHighlight(activeBtn), 80);
  }

  window.addEventListener('resize', () => {
    const curActive = document.querySelector('.filter-btn.active');
    if (curActive) updateHighlight(curActive);
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateHighlight(btn);

      const filter = btn.getAttribute('data-filter');

      systemCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. INTERACTIVE AGENTIC RAG LAB SIMULATION
  // ==========================================
  const prevLabStep = document.getElementById('prevLabStep');
  const nextLabStep = document.getElementById('nextLabStep');
  const resetLab = document.getElementById('resetLab');
  const labTimer = document.getElementById('labTimer');
  const labConsole = document.getElementById('labConsole');

  const stages = [
    document.getElementById('stg-1'),
    document.getElementById('stg-2'),
    document.getElementById('stg-3'),
    document.getElementById('stg-4')
  ];

  const wires = [
    document.getElementById('wire-1'),
    document.getElementById('wire-2'),
    document.getElementById('wire-3')
  ];

  let currentStageIndex = 0;

  const telemetryData = [
    {
      latency: 'p95 Latency: 14.2ms',
      state: 'Running...',
      console: `[SPAN: query_refiner] status=OK duration=14.2ms
- Input Query: "Compare its zero-shot transfer collapse on AST mutations vs standard GRPO"
- Sliding Window: 4 turns [2 User + 2 Assistant cached]
- Anaphora Resolution: "its" resolved -> "Inv-GRPO (Invariance-Regularized Policy Optimization)"
- Refined Output: "Compare Inv-GRPO zero-shot transfer collapse on semantics-preserving AST mutations vs standard GRPO"
- Semantic Drift Metric: 0.02 (Optimal boundary)`
    },
    {
      latency: 'p95 Latency: 38.6ms',
      state: 'Traversing...',
      console: `[SPAN: hybrid_retrieval_backbone] status=OK duration=38.6ms
- Dense Vector: Qdrant HNSW (Cosine Distance, dim=1536) -> 12 chunks retrieved (score >= 0.84)
- Knowledge Graph: Neo4j GraphRAG -> 2-hop entity traversal (Inv-GRPO -[EVALUATED_ON]-> Reduction_Ladder)
- Subgraph Extraction: 7 nodes, 11 relation edges extracted
- Reranking: Reciprocal Rank Fusion (RRF k=60) + Cross-Encoder MiniLM-L6
- Fused Context Window: 1,840 tokens prepared for reasoning agents`
    },
    {
      latency: 'p95 Latency: 74.1ms',
      state: 'Evaluating...',
      console: `[SPAN: multi_agent_reflection] status=OK duration=74.1ms
- Agent 1 (ReAct Core): Drafted comparison across 664 coding tasks under AST semantic perturbation
- Agent 2 (Critic & Reflection Node): Evaluated claim attribution against retrieved Elsevier ESWA ground-truth
- Hallucination Probability: 0.00% (Strictly grounded in empirical benchmarks)
- Contradiction Detector: 0 conflicts found across graph relations
- Human-in-the-Loop Checkpoint: AsyncRedisSaver committed state hash (thread_id: sim-9941)`
    },
    {
      latency: 'p95 Latency: 91.8ms (Total)',
      state: 'Verified',
      console: `[SPAN: observability_telemetry] status=SUCCESS total_duration=91.8ms
- Galileo Quality Index:
    • Context Relevance: 0.98
    • Chunk Utilization: 94.2%
    • Hallucination Risk: None
- Prometheus Metrics Export:
    • inference_latency_p95: 91.8ms
    • tokens_per_second: 114.2 t/s
    • kv_cache_hit_rate: 88.5%
- Pipeline Status: Execution Complete (All assertions satisfied)`
    }
  ];

  function updateLabUI(index) {
    currentStageIndex = index;

    stages.forEach((stg, i) => {
      if (!stg) return;
      const stateEl = stg.querySelector('.stage-state');
      if (i < index) {
        stg.className = 'stage-node completed';
        if (stateEl) stateEl.textContent = 'Completed';
      } else if (i === index) {
        stg.className = 'stage-node active';
        if (stateEl) stateEl.textContent = telemetryData[index].state;
      } else {
        stg.className = 'stage-node';
        if (stateEl) stateEl.textContent = 'Idle';
      }
    });

    wires.forEach((wire, i) => {
      if (!wire) return;
      if (i < index) {
        wire.classList.add('active');
      } else {
        wire.classList.remove('active');
      }
    });

    if (labTimer) labTimer.textContent = telemetryData[index].latency;
    if (labConsole) {
      labConsole.innerHTML = `<code>${telemetryData[index].console}</code>`;
    }

    if (prevLabStep) prevLabStep.disabled = index === 0;
    if (nextLabStep) {
      if (index === stages.length - 1) {
        nextLabStep.textContent = 'Completed';
        nextLabStep.disabled = true;
      } else {
        nextLabStep.textContent = 'Advance Stage →';
        nextLabStep.disabled = false;
      }
    }
  }

  if (nextLabStep) {
    nextLabStep.addEventListener('click', () => {
      if (currentStageIndex < stages.length - 1) {
        updateLabUI(currentStageIndex + 1);
      }
    });
  }

  if (prevLabStep) {
    prevLabStep.addEventListener('click', () => {
      if (currentStageIndex > 0) {
        updateLabUI(currentStageIndex - 1);
      }
    });
  }

  if (resetLab) {
    resetLab.addEventListener('click', () => {
      updateLabUI(0);
    });
  }

});
