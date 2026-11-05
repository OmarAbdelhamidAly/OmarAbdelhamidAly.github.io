/**
 * OMAR ABDELHAMID — PORTFOLIO ENGINE (v2.8)
 * Architecture: Zero-Bloat Vanilla JavaScript & High-Performance Micro-Interactions
 *
 * Core Features:
 * 1. Raycast-grade Command Palette (Ctrl+K / Cmd+K)
 * 2. Sliding Filter Track with Spring Physics & Instant Live Search
 * 3. Interactive Systems Laboratory & Terminal Inference Simulator
 * 4. Architecture Deep-Dive Modal (Visual Flowcharts & Latency Breakdown)
 * 5. BibTeX Research Citation Engine
 * 6. Dynamic Card Spotlight Cursor Follower (Linear / Raycast effect)
 * 7. Animated Telemetry Metric Counters
 * 8. Minimalist Ambient Constellation Canvas
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
  // 4. SPOTLIGHT CURSOR GLOW (LINEAR / RAYCAST EFFECT)
  // ==========================================
  const spotlightCards = document.querySelectorAll('.system-card, .research-entry, .terminal-shell, .math-card, .benchmark-table-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ==========================================
  // 5. ANIMATED METRIC COUNTERS
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  let hasAnimatedCounters = false;

  function animateCounters() {
    if (hasAnimatedCounters) return;
    hasAnimatedCounters = true;

    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const duration = 1400;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(ease * target);

        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(update);
    });
  }

  const indicatorsRow = document.querySelector('.indicators-row');
  if (indicatorsRow) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(indicatorsRow);
  }

  // ==========================================
  // 6. SLIDING FILTER TRACK & INSTANT LIVE SEARCH
  // ==========================================
  const filterTrack = document.getElementById('filterTrack');
  const filterHighlight = document.getElementById('filterHighlight');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const systemCards = document.querySelectorAll('.system-card');
  const systemSearchInput = document.getElementById('systemSearchInput');
  const clearSystemSearch = document.getElementById('clearSystemSearch');
  const visibleCountBadge = document.getElementById('visibleCount');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function applyFilters() {
    let count = 0;
    const query = currentSearchQuery.trim().toLowerCase();

    systemCards.forEach(card => {
      const categories = (card.getAttribute('data-category') || '').split(' ');
      const text = card.textContent.toLowerCase();

      const matchesCategory = (currentCategory === 'all' || categories.includes(currentCategory));
      const matchesSearch = (!query || text.includes(query));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        count++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCountBadge) {
      visibleCountBadge.textContent = count;
    }
  }

  function updateHighlight(targetBtn) {
    if (!filterHighlight || !targetBtn) return;
    const trackRect = filterTrack.getBoundingClientRect();
    const btnRect = targetBtn.getBoundingClientRect();
    const leftOffset = btnRect.left - trackRect.left;

    filterHighlight.style.width = `${btnRect.width}px`;
    filterHighlight.style.transform = `translateX(${leftOffset - 4}px)`;
    filterHighlight.style.opacity = '1';
  }

  const activeBtn = document.querySelector('.filter-btn.active');
  if (activeBtn) {
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

      currentCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (systemSearchInput) {
    systemSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (clearSystemSearch) {
        clearSystemSearch.style.display = currentSearchQuery ? 'block' : 'none';
      }
      applyFilters();
    });
  }

  if (clearSystemSearch) {
    clearSystemSearch.addEventListener('click', () => {
      if (systemSearchInput) {
        systemSearchInput.value = '';
        currentSearchQuery = '';
        clearSystemSearch.style.display = 'none';
        applyFilters();
        systemSearchInput.focus();
      }
    });
  }

  // ==========================================
  // 7. INTERACTIVE SYSTEMS LABORATORY (TERMINAL SIMULATOR)
  // ==========================================
  const simTabs = document.querySelectorAll('.sim-tab');
  const simPromptDisplay = document.getElementById('simPromptDisplay');
  const runSimBtn = document.getElementById('runSimBtn');
  const terminalStream = document.getElementById('terminalStream');
  const simStateBadge = document.getElementById('simStateBadge');
  const simTimeMetric = document.getElementById('simTimeMetric');
  const simCacheMetric = document.getElementById('simCacheMetric');
  const simGuardMetric = document.getElementById('simGuardMetric');
  const simTpsMetric = document.getElementById('simTpsMetric');

  const simulationPresets = {
    schoolify: {
      prompt: '"Calculate Navier-Stokes pressure Poisson gradient and output LaTeX derivation + Python solver"',
      steps: [
        { ts: '1.2ms', scope: 'GATEWAY', text: 'Token-bucket auth passed for user session. Microservice cluster: Healthy.', cls: 'info' },
        { ts: '5.8ms', scope: 'CACHE', text: 'Semantic Cache miss (cosine similarity: 0.76 < 0.94 threshold). Forwarding to LangGraph router.', cls: 'dim' },
        { ts: '14.2ms', scope: 'ROUTER', text: 'LangGraph intent classification: Multi-discipline query -> High STEM + AST Code requirements.', cls: 'highlight' },
        { ts: '22.0ms', scope: 'NODES', text: 'Dispatched in parallel: [STEM/LaTeX Specialist Node] and [AST Code Validator Node].', cls: 'info' },
        { ts: '36.5ms', scope: 'QDRANT', text: 'Hybrid search executed: Qdrant Dense HNSW (cosine: 0.89) + BM25 lexical fusion (RRF score: 0.92). Retrieved 5 context chunks.', cls: 'info' },
        { ts: '44.8ms', scope: 'GUARDRAIL', text: 'NeMo Guardrails verification: Attribution confidence 0.98. Factual grounding: PASS (Zero-Hallucination).', cls: 'success' },
        { ts: '58.4ms', scope: 'vLLM', text: 'PagedAttention active. Continuous batching stream: 146.2 tokens/sec. Derivation + code generated successfully.', cls: 'success' }
      ],
      metrics: { time: '58.4 ms', cache: 'MISS (0.76)', guard: 'PASS (0.98)', tps: '146 tok/s' }
    },
    rag: {
      prompt: '"Retrieve exact international trade tariff exception clauses in section 4.2 of treaty agreement"',
      steps: [
        { ts: '0.8ms', scope: 'QUERY-PROC', text: 'Applied pre-retrieval HyDE expansion and entity normalization.', cls: 'info' },
        { ts: '8.4ms', scope: 'DENSE-VECTOR', text: 'Vector search in Qdrant (HNSW index, 1536-dim) returned top-30 candidates.', cls: 'info' },
        { ts: '12.1ms', scope: 'BM25-SPARSE', text: 'BM25 keyword search retrieved exact matching clauses with BM25 score: 18.4.', cls: 'info' },
        { ts: '19.5ms', scope: 'RRF-FUSION', text: 'Reciprocal Rank Fusion (k=60) blended dense and sparse ranks into candidate set.', cls: 'highlight' },
        { ts: '28.0ms', scope: 'CROSS-ENCODER', text: 'bge-reranker-large scored top-30 candidates down to top-5 highest-relevance passages.', cls: 'info' },
        { ts: '33.2ms', scope: 'CACHE', text: 'Cached grounded context in Redis with TTL=3600s.', cls: 'dim' },
        { ts: '41.0ms', scope: 'SYNTHESIS', text: 'Verified context injected into LLM prompt with exact line-number citations.', cls: 'success' }
      ],
      metrics: { time: '41.0 ms', cache: 'STORED', guard: 'VERIFIED', tps: '158 tok/s' }
    },
    invgrpo: {
      prompt: '"Test code SLM on semantics-preserving AST perturbation: variable renaming & loop inversion"',
      steps: [
        { ts: '2.0ms', scope: 'AST-MUTATOR', text: 'Generated 6-tier Reduction Ladder AST perturbation level l=3 over HumanEval-64.', cls: 'info' },
        { ts: '11.5ms', scope: 'BASELINE-SLM', text: 'Standard SFT+DPO model evaluated: Memorized template broken. Collapse bound: l*=1 (FAILED).', cls: 'highlight' },
        { ts: '18.2ms', scope: 'INV-GRPO', text: 'Inv-GRPO policy rollouts executed under cross-perturbation invariance constraint.', cls: 'info' },
        { ts: '25.6ms', scope: 'CONSISTENCY', text: 'R_cons reward computed: 0.992 semantic consistency between mutated AST and original code.', cls: 'success' },
        { ts: '31.0ms', scope: 'EVALUATION', text: 'Invariance confirmed: Model maintains algorithmic reasoning across deep perturbations (Delta l* >= 2).', cls: 'success' },
        { ts: '32.1ms', scope: 'LATENCY', text: 'Inference latency penalty: 0.00ms. Standard checkpoint inference weights deployed.', cls: 'success' }
      ],
      metrics: { time: '32.1 ms', cache: 'N/A', guard: 'INVARIANT', tps: '0ms penalty' }
    }
  };

  let activeSim = 'schoolify';
  let isRunningSim = false;

  simTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (isRunningSim) return;
      simTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeSim = tab.getAttribute('data-sim') || 'schoolify';

      const config = simulationPresets[activeSim];
      if (config && simPromptDisplay) {
        simPromptDisplay.textContent = config.prompt;
      }
      if (simStateBadge) {
        simStateBadge.textContent = 'READY';
        simStateBadge.className = 't-val ready';
      }
      if (terminalStream) {
        terminalStream.innerHTML = `
          <div class="log-line info"><span class="log-ts">[0.00ms]</span> <span class="log-scope">[ACTIVE-PRESET]</span> Switched to ${activeSim.toUpperCase()} test suite.</div>
          <div class="log-line dim"><span class="log-ts">[0.10ms]</span> Press "Run Simulation" to execute live state machine routing and stream telemetry logs.</div>
        `;
      }
    });
  });

  if (runSimBtn) {
    runSimBtn.addEventListener('click', () => {
      if (isRunningSim) return;
      isRunningSim = true;
      runSimBtn.disabled = true;

      const preset = simulationPresets[activeSim];
      if (!preset || !terminalStream) return;

      terminalStream.innerHTML = `<div class="log-line highlight"><span class="log-ts">[0.00ms]</span> <span class="log-scope">[EXECUTION-START]</span> Dispatched query payload into cluster...</div>`;
      if (simStateBadge) {
        simStateBadge.textContent = 'RUNNING';
        simStateBadge.className = 't-val running';
      }

      let stepIdx = 0;
      const interval = setInterval(() => {
        if (stepIdx < preset.steps.length) {
          const s = preset.steps[stepIdx];
          const div = document.createElement('div');
          div.className = `log-line ${s.cls}`;
          div.innerHTML = `<span class="log-ts">[${s.ts}]</span> <span class="log-scope">[${s.scope}]</span> ${s.text}`;
          terminalStream.appendChild(div);
          terminalStream.scrollTop = terminalStream.scrollHeight;
          stepIdx++;
        } else {
          clearInterval(interval);
          isRunningSim = false;
          runSimBtn.disabled = false;
          if (simStateBadge) {
            simStateBadge.textContent = 'COMPLETED';
            simStateBadge.className = 't-val done';
          }
          if (simTimeMetric) simTimeMetric.textContent = preset.metrics.time;
          if (simCacheMetric) simCacheMetric.textContent = preset.metrics.cache;
          if (simGuardMetric) simGuardMetric.textContent = preset.metrics.guard;
          if (simTpsMetric) simTpsMetric.textContent = preset.metrics.tps;
          showToast('Simulation completed with 100% telemetry verification');
        }
      }, 260);
    });
  }

  // ==========================================
  // 8. ARCHITECTURE DEEP-DIVE MODAL ENGINE
  // ==========================================
  const archModalBackdrop = document.getElementById('archModalBackdrop');
  const closeArchModalBtn = document.getElementById('closeArchModalBtn');
  const closeArchModalFooterBtn = document.getElementById('closeArchModalFooterBtn');
  const archModalDomain = document.getElementById('archModalDomain');
  const archModalTitle = document.getElementById('archModalTitle');
  const archModalBody = document.getElementById('archModalBody');
  const archRepoLink = document.getElementById('archRepoLink');

  const architecturesData = {
    schoolify: {
      domain: 'Enterprise Multi-Agent Architecture',
      title: 'Schoolify AI — Production Multi-Agent & RAG Ecosystem',
      repo: 'https://github.com/OmarAbdelhamidAly',
      steps: [
        { num: '01', title: 'FastAPI Gateway & Token-Bucket Rate Limiter', desc: 'Receives authenticated client requests, enforces tenant quotas, and handles JWT validation under 1.8ms.' },
        { num: '02', title: 'LangGraph Pedagogical Master Router', desc: 'Stateful DAG router decomposes complex queries, delegating to specialized nodes: STEM/LaTeX, AST Code Validation, and Socratic Tutoring.' },
        { num: '03', title: 'Hybrid Retrieval Layer (Qdrant + BM25)', desc: 'Dense vector HNSW search in Qdrant combined with BM25 lexical search via Reciprocal Rank Fusion (RRF), backed by Redis semantic caching.' },
        { num: '04', title: 'NeMo Guardrails & Verification Node', desc: 'Performs self-reflection and factual consistency checks against retrieved curriculum context before response synthesis.' },
        { num: '05', title: 'High-Throughput Model Serving (vLLM)', desc: 'Continuous batching and PagedAttention streaming low-latency tokens to mobile and web frontends.' }
      ],
      metrics: [
        { val: '1.8ms', desc: 'p95 Gateway Auth Latency' },
        { val: '26ms', desc: 'Hybrid Retrieval + RRF Time' },
        { val: '5 DBs', desc: 'Domain-Isolated PostgreSQL Microservices' }
      ],
      tradeoffs: [
        { label: 'Qdrant vs. pgvector', text: 'Selected Qdrant for isolated high-throughput HNSW clustering and granular payload filtering without straining transactional databases.' },
        { label: 'LangGraph vs. Standard Chains', text: 'Cyclical graph state machine enables iterative self-healing loops, retry reflection, and stateful human-in-the-loop checkpoints.' }
      ]
    },
    'researcher-room': {
      domain: 'Cloud-Native Distributed Systems',
      title: 'Researcher Room — Collaborative Knowledge Platform on AWS EKS',
      repo: 'https://github.com/OmarAbdelhamidAly/Researcher-Room',
      steps: [
        { num: '01', title: 'Terraform IaC Provisioning on AWS EKS', desc: 'Production-ready infrastructure provisioning multi-AZ VPC, EKS worker nodegroups, RDS PostgreSQL with pgvector, and IAM least-privilege.' },
        { num: '02', title: 'Decoupled Asynchronous Ingestion (Celery + Redis)', desc: 'Large-scale PDF document upload decoupled from API threads into 8 parallel Celery worker containers handling layout-aware text extraction.' },
        { num: '03', title: 'Dense Semantic Vectorization (pgvector)', desc: 'Structural chunking with 600-800 token sliding windows indexed in pgvector for sub-second similarity matching.' },
        { num: '04', title: 'Real-Time WebSockets Synchronization', desc: 'High-throughput ConnectionManager synchronizing collaborative document annotations, cursor coordinates, and updates under 42ms.' },
        { num: '05', title: 'Interactive 3D Knowledge Graph (Three.js)', desc: 'Constructs dynamic visual subgraphs of interconnected citations and document entities rendered in WebGL.' }
      ],
      metrics: [
        { val: '<42ms', desc: 'WebSocket Sync Latency' },
        { val: '1,200', desc: 'PDF Pages Processed / Min' },
        { val: '8 Nodes', desc: 'Fault-Isolated Celery Workers on EKS' }
      ],
      tradeoffs: [
        { label: 'pgvector vs. Dedicated Vector DB', text: 'Utilized pgvector directly inside AWS RDS to unify transactional relational records and vector embeddings in a single ACID-compliant database.' },
        { label: 'WebSockets vs. Long-Polling', text: 'Low-latency bi-directional WebSockets protocol eliminated polling overhead for real-time collaborative multi-user editing.' }
      ]
    },
    openq: {
      domain: 'Federated Agentic Intelligence',
      title: 'OpenQ — Autonomous Enterprise Platform (GraphRAG + EKS)',
      repo: 'https://github.com/OmarAbdelhamidAly/OpenQ-Federated-Agentic-Intelligence-Platform',
      steps: [
        { num: '01', title: 'Autonomous Multi-Agent State Machine', desc: 'LangGraph orchestration decomposing business queries into multi-step execution plans with automatic 3-retry SQL self-healing.' },
        { num: '02', title: 'Hybrid GraphRAG Backend (Neo4j + Qdrant)', desc: 'Neo4j FastRP graph embeddings for structural entity traversal fused with Qdrant dense vector search.' },
        { num: '03', title: 'Distributed Task Partitioning', desc: 'Asynchronous task queues partitioned across 8 Celery worker pods for parallel data modality processing.' },
        { num: '04', title: 'Stateful HITL Checkpoints (AsyncRedisSaver)', desc: 'Human-in-the-loop validation checkpoints persisted in Redis for high-risk corporate database mutations.' }
      ],
      metrics: [
        { val: '8 Pods', desc: 'Fault-Isolated Workers' },
        { val: '3 Retries', desc: 'Self-Correcting SQL Healing Loop' },
        { val: '99.9%', desc: 'Aurora Serverless Uptime' }
      ],
      tradeoffs: [
        { label: 'GraphRAG vs. Pure Vector Search', text: 'Neo4j knowledge graphs capture multi-hop organizational relationships that pure dense embeddings consistently miss.' }
      ]
    },
    'arabic-llm': {
      domain: 'LLM Post-Training & Serving',
      title: 'Arabic Mental Health LLM — Distributed Alignment & Serving',
      repo: 'https://github.com/OmarAbdelhamidAly/arabic-peft-align-rag-tts',
      steps: [
        { num: '01', title: 'Automated Kubeflow (KFP v2) Pipeline', desc: 'End-to-end DAG orchestrating headless Papermill execution with MLflow model registry and lineage tracking.' },
        { num: '02', title: 'Unsloth 4-bit Quantization & Fine-Tuning', desc: 'Fine-tuned Qwen2.5-3B on curated Arabic psychological corpora using BitsAndBytes NF4, reducing VRAM footprint by 74%.' },
        { num: '03', title: '6-Way Post-Training Alignment Benchmark', desc: 'Benchmarked DPO, IPO, SimPO, RLOO, KTO, and ORPO; SimPO emerged as the winning policy and was auto-merged in BFloat16.' },
        { num: '04', title: 'High-Throughput Serving (NVIDIA Triton + vLLM)', desc: 'PagedAttention and Continuous Batching deployed behind a dual-protocol FastAPI & gRPC proxy layer achieving sub-40ms p95 latency.' }
      ],
      metrics: [
        { val: '<38ms', desc: 'p95 Serving Latency' },
        { val: '185 tok/s', desc: 'Throughput per GPU' },
        { val: '-74%', desc: 'VRAM Footprint with NF4' }
      ],
      tradeoffs: [
        { label: 'SimPO vs. DPO', text: 'SimPO eliminates the reference model requirement during alignment, reducing training memory by 30% while achieving superior margin separation.' }
      ]
    },
    'multilingual-rag': {
      domain: 'Enterprise RAG & Multi-Agent Reflection',
      title: 'Multilingual RAG Architecture with Multi-Agent Reflection',
      repo: 'https://github.com/OmarAbdelhamidAly/multilingual-rag-system',
      steps: [
        { num: '01', title: 'Query Rewriter & Language Identification Node', desc: 'Resolves ambiguous multi-turn context and extracts semantic language filters.' },
        { num: '02', title: '5-Stage Dense Retrieval Pipeline (FAISS HNSW)', desc: 'Fast HNSW vector search combined with BM25 sparse keyword search and Redis semantic caching.' },
        { num: '03', title: 'Cross-Encoder Reranking Layer', desc: 'Reranks top-30 candidates down to top-5 high-signal passages using cross-encoder scoring.' },
        { num: '04', title: 'LangGraph Multi-Agent Reflection Node', desc: 'LLaMA-3.3-70B iteratively verifies retrieved contexts, detecting and eliminating factual hallucinations.' }
      ],
      metrics: [
        { val: '5 Agents', desc: 'Coordinated LangGraph Topology' },
        { val: 'Sub-15ms', desc: 'FAISS HNSW Search Time' },
        { val: '0%', desc: 'Grounded Hallucination Tolerance' }
      ],
      tradeoffs: [
        { label: 'Cross-Encoder Reranking vs. Single-Stage', text: 'Two-stage retrieval drastically reduces LLM token consumption while boosting NDCG@5 by 24%.' }
      ]
    },
    'inv-grpo': {
      domain: 'Applied AI Research (Orange Innovation Labs)',
      title: 'Reduction Ladder & Inv-GRPO — Resolving Code SLM Shortcut Mimicry',
      repo: 'https://github.com/OmarAbdelhamidAly/diagnosing-resolving-code-slm-mimicry',
      steps: [
        { num: '01', title: 'Reduction Ladder Diagnostic Formulation', desc: '6-tier diagnostic suite evaluating collapse bounds across 664 coding tasks under semantics-preserving AST mutations.' },
        { num: '02', title: 'Invariance-Regularized Policy Optimization (Inv-GRPO)', desc: 'Mathematical derivation pairing cross-perturbation rollouts with semantic consistency rewards (R_cons) to break shortcut mimicry.' },
        { num: '03', title: 'Edge VRAM Constraint Optimization', desc: 'Benchmarked on Qwen2.5-Coder (1.5B and 7B) strictly under <=8GB edge GPU memory budgets.' },
        { num: '04', title: 'Zero Latency Runtime Guarantee', desc: 'Invariance constraints are applied exclusively during RLVR post-training; deployed checkpoint executes with 0.0ms inference overhead.' }
      ],
      metrics: [
        { val: '0.0ms', desc: 'Inference Latency Penalty' },
        { val: '+8.9%', desc: 'EvoEval-Hard Performance Gain' },
        { val: 'Delta l* >= 2', desc: 'Shift in Algorithmic Collapse Bound' }
      ],
      tradeoffs: [
        { label: 'Inv-GRPO vs. Standard DPO/SFT', text: 'Standard SFT/DPO memorizes AST surface templates, collapsing when variable names are mutated; Inv-GRPO enforces true invariant algorithmic reasoning.' }
      ]
    }
  };

  function openArchModal(archKey) {
    const data = architecturesData[archKey] || architecturesData.schoolify;
    if (!archModalBackdrop || !archModalBody) return;

    archModalDomain.textContent = data.domain;
    archModalTitle.textContent = data.title;
    if (archRepoLink) archRepoLink.href = data.repo;

    // Build Body HTML
    let stepsHtml = data.steps.map((s, idx) => `
      <div class="flow-step">
        <span class="step-num">${s.num}</span>
        <div class="step-content">
          <strong>${s.title}:</strong> ${s.desc}
        </div>
      </div>
      ${idx < data.steps.length - 1 ? '<div class="flow-arrow-down">&darr;</div>' : ''}
    `).join('');

    let metricsHtml = data.metrics.map(m => `
      <div class="arch-metric-card">
        <div class="am-val">${m.val}</div>
        <div class="am-desc">${m.desc}</div>
      </div>
    `).join('');

    let tradeoffsHtml = data.tradeoffs.map(t => `
      <li><strong>${t.label}:</strong> ${t.text}</li>
    `).join('');

    archModalBody.innerHTML = `
      <div class="arch-diagram-wrap">
        <div class="diagram-tag">TOPOLOGY &amp; DATA FLOW PIPELINE</div>
        <div class="arch-diagram-flow">
          ${stepsHtml}
        </div>
      </div>

      <div class="diagram-tag">ENGINEERING TELEMETRY &amp; SLA BENCHMARKS</div>
      <div class="arch-metrics-grid">
        ${metricsHtml}
      </div>

      <div class="arch-tradeoffs">
        <h4>Key Architectural Trade-Offs &amp; Design Decisions</h4>
        <ul>
          ${tradeoffsHtml}
        </ul>
      </div>
    `;

    archModalBackdrop.classList.add('active');
  }

  function closeArchModal() {
    if (archModalBackdrop) archModalBackdrop.classList.remove('active');
  }

  document.querySelectorAll('.btn-inspect-arch').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const archKey = btn.getAttribute('data-arch') || 'schoolify';
      openArchModal(archKey);
    });
  });

  if (closeArchModalBtn) closeArchModalBtn.addEventListener('click', closeArchModal);
  if (closeArchModalFooterBtn) closeArchModalFooterBtn.addEventListener('click', closeArchModal);
  if (archModalBackdrop) {
    archModalBackdrop.addEventListener('click', (e) => {
      if (e.target === archModalBackdrop) closeArchModal();
    });
  }

  // ==========================================
  // 9. BIBTEX CITATION MODAL ENGINE
  // ==========================================
  const bibtexModalBackdrop = document.getElementById('bibtexModalBackdrop');
  const closeBibtexBtn = document.getElementById('closeBibtexBtn');
  const closeBibtexActionBtn = document.getElementById('closeBibtexActionBtn');
  const copyBibtexActionBtn = document.getElementById('copyBibtexActionBtn');
  const copyBibtexBtnText = document.getElementById('copyBibtexBtnText');
  const bibtexCodeBlock = document.getElementById('bibtexCodeBlock');
  const bibtexModalHeading = document.getElementById('bibtexModalHeading');

  const bibtexEntries = {
    'reduction-ladder': {
      title: 'Reduction Ladder: Diagnosing & Resolving Code SLM Shortcut Mimicry',
      bibtex: `@article{abdelhamid2026reductionladder,
  title   = {Reduction Ladder: Diagnosing and Resolving Shortcut Mimicry in Code Small Language Models},
  author  = {Abdelhamid, Omar and Soliman, Ghada},
  journal = {Applied AI Research, Orange Innovation Labs},
  year    = {2026},
  url     = {https://github.com/OmarAbdelhamidAly/diagnosing-resolving-code-slm-mimicry}
}`
    },
    'nt-smoco': {
      title: 'NT-sMoCo: Dense Retrieval & Contrastive Learning for KBQA',
      bibtex: `@inproceedings{abdelhamid2026ntsmoco,
  title     = {NT-sMoCo: Normalized-Temperature Scaled Momentum Contrastive Learning for Incomplete Knowledge-Based QA},
  author    = {Abdelhamid, Omar},
  booktitle = {Faculty of Computers and Artificial Intelligence, Benha University},
  year      = {2026},
  url       = {https://github.com/OmarAbdelhamidAly/nt-smoco-kbqa}
}`
    }
  };

  let activeBibtexKey = 'reduction-ladder';

  function openBibtexModal(key) {
    const entry = bibtexEntries[key] || bibtexEntries['reduction-ladder'];
    activeBibtexKey = key;
    if (!bibtexModalBackdrop || !bibtexCodeBlock) return;

    if (bibtexModalHeading) bibtexModalHeading.textContent = entry.title;
    bibtexCodeBlock.textContent = entry.bibtex;
    if (copyBibtexBtnText) copyBibtexBtnText.textContent = 'Copy BibTeX Entry';

    bibtexModalBackdrop.classList.add('active');
  }

  function closeBibtexModal() {
    if (bibtexModalBackdrop) bibtexModalBackdrop.classList.remove('active');
  }

  document.querySelectorAll('.btn-cite-bibtex').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const citeKey = btn.getAttribute('data-cite') || 'reduction-ladder';
      openBibtexModal(citeKey);
    });
  });

  if (closeBibtexBtn) closeBibtexBtn.addEventListener('click', closeBibtexModal);
  if (closeBibtexActionBtn) closeBibtexActionBtn.addEventListener('click', closeBibtexModal);
  if (bibtexModalBackdrop) {
    bibtexModalBackdrop.addEventListener('click', (e) => {
      if (e.target === bibtexModalBackdrop) closeBibtexModal();
    });
  }

  if (copyBibtexActionBtn) {
    copyBibtexActionBtn.addEventListener('click', () => {
      const entry = bibtexEntries[activeBibtexKey] || bibtexEntries['reduction-ladder'];
      navigator.clipboard.writeText(entry.bibtex).then(() => {
        showToast('BibTeX citation copied to clipboard');
        if (copyBibtexBtnText) copyBibtexBtnText.textContent = 'Copied!';
        setTimeout(() => {
          if (copyBibtexBtnText) copyBibtexBtnText.textContent = 'Copy BibTeX Entry';
        }, 2200);
      });
    });
  }

  // ==========================================
  // 10. COMMAND PALETTE (Ctrl+K / Cmd+K)
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

  if (cmdPaletteBtn) cmdPaletteBtn.addEventListener('click', openPalette);
  if (closePaletteKey) closePaletteKey.addEventListener('click', closePalette);
  if (paletteBackdrop) {
    paletteBackdrop.addEventListener('click', (e) => {
      if (e.target === paletteBackdrop) closePalette();
    });
  }

  // Floating Status Pill Ctrl+K trigger
  const pillCmdBtn = document.getElementById('pillCmdBtn');
  if (pillCmdBtn) pillCmdBtn.addEventListener('click', openPalette);

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
      closeArchModal();
      closeBibtexModal();
    }
  });

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
    paletteInput.addEventListener('input', (e) => filterPalette(e.target.value));

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
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'copy') {
      const val = item.getAttribute('data-val');
      navigator.clipboard.writeText(val).then(() => {
        showToast('Email copied to clipboard');
      });
    } else if (action === 'download') {
      const url = item.getAttribute('data-url');
      if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Omar_Abdelhamid_AI_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('Downloading Resume PDF...');
      }
    } else if (action === 'external') {
      const url = item.getAttribute('data-url');
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  // ==========================================
  // 11. FLOATING STATUS PILL SCROLL VISIBILITY
  // ==========================================
  const floatingStatusPill = document.getElementById('floatingStatusPill');
  const contactSection = document.getElementById('contact');
  if (floatingStatusPill && contactSection) {
    window.addEventListener('scroll', () => {
      const contactRect = contactSection.getBoundingClientRect();
      // Hide pill when contact section is in viewport
      if (contactRect.top <= window.innerHeight - 100) {
        floatingStatusPill.style.opacity = '0';
        floatingStatusPill.style.pointerEvents = 'none';
      } else {
        floatingStatusPill.style.opacity = '1';
        floatingStatusPill.style.pointerEvents = 'auto';
      }
    }, { passive: true });
  }

});
