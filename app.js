/**
 * OMAR ABDELHAMID — PORTFOLIO INTERACTION ENGINE
 * Components:
 * 1. Interactive Neural Network Particle Canvas
 * 2. Filterable Projects Hub
 * 3. Interactive Agentic RAG Lab Simulator
 * 4. Interactive CLI Terminal Modal & Command Parser
 * 5. Toast Notification & Clipboard Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. NEURAL PARTICLE NETWORK CANVAS
  // ==========================================
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const maxDistance = 120;
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.6 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse repulsion/attraction
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.2;
            this.y -= (dy / dist) * force * 1.2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = 1 - (dist / maxDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.22})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==========================================
  // 2. PROJECT FILTERING ENGINE
  // ==========================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle Active Tab State
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 3. INTERACTIVE AGENTIC RAG LAB SIMULATOR
  // ==========================================
  const nodes = [
    document.getElementById('node-1'),
    document.getElementById('node-2'),
    document.getElementById('node-3'),
    document.getElementById('node-4')
  ];
  const connectors = [
    document.getElementById('conn-1'),
    document.getElementById('conn-2'),
    document.getElementById('conn-3')
  ];

  const prevStepBtn = document.getElementById('prevStepBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');
  const resetLabBtn = document.getElementById('resetLabBtn');
  const consoleLogs = document.getElementById('consoleLogs');
  const consoleLatency = document.getElementById('consoleLatency');

  let currentLabStep = 0;

  const stepTelemetryData = [
    {
      title: "STAGE 1: SLIDING WINDOW & QUERY REFINER",
      latency: "p95: 14ms",
      log: `[SPAN: query_refiner] status=OK duration=14.2ms
- Input: "Compare its zero-shot transfer collapse on AST mutations vs standard GRPO"
- Conversation Window: 4 turns [2 User + 2 Assistant cached]
- Anaphora Resolution: "its" resolved -> "Inv-GRPO (Invariance-Regularized Policy Optimization)"
- Refined Output: "Compare Inv-GRPO zero-shot transfer collapse on semantics-preserving AST mutations vs standard GRPO"
- Metric: semantic_drift_score = 0.02 (Optimal)`
    },
    {
      title: "STAGE 2: HYBRID RETRIEVAL BACKBONE",
      latency: "p95: 38ms",
      log: `[SPAN: hybrid_retrieval] status=OK duration=38.6ms
- Qdrant Vector Search: 10 dense embeddings retrieved (Similarity: 0.924)
- Neo4j GraphRAG: 2-hop subgraph traversal over entity [Inv-GRPO] -> [SemanticConsistencyReward] -> [AST_Perturbations]
- Sparse BM25: Keyword overlap match on "HumanEval", "EvoEval", "GRPO"
- Reciprocal Rank Fusion (RRF): Top 5 synthesized chunks fed to cross-encoder reranker
- Cache Bypass: True (Multi-turn dialogue detected)`
    },
    {
      title: "STAGE 3: MULTI-AGENT REFLECTION NODE",
      latency: "p95: 72ms",
      log: `[SPAN: agentic_reflection] status=OK duration=72.1ms
- Reflection Agent: LLaMA-3.3-70B node verifying cross-chunk attribution
- Hallucination Check: Passed (Grounding score: 0.981)
- Fact Check: Inv-GRPO achieves delta_l* >= 2 collapse shift with 0ms inference overhead
- Attribution Rate: 99.4% (Directly grounded in Orange Innovation experimental run records)`
    },
    {
      title: "STAGE 4: GALILEO RAG EVALUATION & TELEMETRY",
      latency: "p95: 84ms (Total E2E)",
      log: `[SPAN: rag_telemetry_export] status=OK duration=8.4ms
- Context Relevance: 0.952 (Threshold: > 0.85) -> [PASS]
- Chunk Utilization: 0.884 (Threshold: > 0.70) -> [PASS]
- Attribution Score: 0.991 -> [PASS]
- Prometheus Metrics Emitted:
  * rag_context_relevance_gauge{subject="slm_reasoning"} 0.952
  * rag_request_latency_seconds_bucket{le="0.1"} 1
- PostgreSQL Persistence: Saved audit message_id=8f1c4a09-e85d-4074`
    }
  ];

  function updateLabUI() {
    nodes.forEach((node, idx) => {
      if (!node) return;
      const statusEl = node.querySelector('.node-status');
      
      if (idx + 1 < currentLabStep) {
        node.className = 'graph-node completed';
        if (statusEl) statusEl.textContent = 'Completed';
      } else if (idx + 1 === currentLabStep) {
        node.className = 'graph-node active';
        if (statusEl) statusEl.textContent = 'Running...';
      } else {
        node.className = 'graph-node';
        if (statusEl) statusEl.textContent = 'Idle';
      }
    });

    connectors.forEach((conn, idx) => {
      if (!conn) return;
      if (idx + 1 < currentLabStep) {
        conn.className = 'graph-connector active';
      } else {
        conn.className = 'graph-connector';
      }
    });

    // Update Buttons
    if (prevStepBtn) prevStepBtn.disabled = currentLabStep <= 1;
    if (nextStepBtn) {
      if (currentLabStep >= 4) {
        nextStepBtn.textContent = 'Completed (Restart)';
      } else {
        nextStepBtn.textContent = 'Next Stage →';
      }
    }

    // Update Console
    if (currentLabStep === 0) {
      consoleLogs.innerHTML = `<code>[INIT] Agentic RAG state graph compiled successfully.\n[INFO] Waiting for user execution... Click "Next Stage" to trigger pipeline execution.</code>`;
      consoleLatency.textContent = 'p95 Latency: —';
    } else {
      const data = stepTelemetryData[currentLabStep - 1];
      consoleLatency.textContent = data.latency;
      consoleLogs.innerHTML = `<code>// ==========================================\n// ${data.title}\n// ==========================================\n${data.log}</code>`;
    }
  }

  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
      if (currentLabStep >= 4) {
        currentLabStep = 1;
      } else {
        currentLabStep++;
      }
      updateLabUI();
    });
  }

  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', () => {
      if (currentLabStep > 1) {
        currentLabStep--;
        updateLabUI();
      }
    });
  }

  if (resetLabBtn) {
    resetLabBtn.addEventListener('click', () => {
      currentLabStep = 0;
      updateLabUI();
    });
  }

  // ==========================================
  // 4. INTERACTIVE CLI TERMINAL ENGINE
  // ==========================================
  const terminalModal = document.getElementById('terminalModal');
  const toggleTerminalBtn = document.getElementById('toggleTerminalBtn');
  const closeTerminalBtn = document.getElementById('closeTerminalBtn');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  function openTerminal() {
    if (terminalModal) {
      terminalModal.classList.add('open');
      terminalInput.focus();
    }
  }

  function closeTerminal() {
    if (terminalModal) {
      terminalModal.classList.remove('open');
    }
  }

  if (toggleTerminalBtn) toggleTerminalBtn.addEventListener('click', openTerminal);
  if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminal);

  if (terminalModal) {
    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) closeTerminal();
    });
  }

  // Hotkey: press '~' or '`' to open terminal
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (terminalModal.classList.contains('open')) {
          closeTerminal();
        } else {
          openTerminal();
        }
      }
    }
    if (e.key === 'Escape' && terminalModal.classList.contains('open')) {
      closeTerminal();
    }
  });

  const commands = {
    help: () => `Available Commands:
  • <span class="term-hl">skills</span>       : View primary technical stack & frameworks
  • <span class="term-hl">research</span>     : Summary of Inv-GRPO & Elsevier published paper
  • <span class="term-hl">repos</span>        : List top production GitHub repositories
  • <span class="term-hl">certs</span>        : List 4x AWS & Azure credentials
  • <span class="term-hl">contact</span>      : Show direct email, phone, and LinkedIn
  • <span class="term-hl">whoami</span>       : Display candidate summary profile
  • <span class="term-hl">clear</span>        : Clear the terminal console
  • <span class="term-hl">exit</span>         : Close the terminal modal`,

    skills: () => `Technical Taxonomy:
  [Core]: Python (Asyncio), C++, SQL, PyTorch, LangGraph, vLLM
  [Alignment]: Inv-GRPO, RLVR, DPO, SimPO, SFT, LoRA/QLoRA, Unsloth, TRL
  [Retrieval]: Qdrant, Neo4j (GraphRAG), FAISS HNSW, ColPali Multimodal
  [Serving]: NVIDIA Triton, vLLM, PagedAttention, Continuous Batching, gRPC
  [Cloud/MLOps]: AWS (EKS, SageMaker), Docker, Kubernetes, Kubeflow, Prometheus, Grafana`,

    research: () => `Frontier AI Research:
  1. "Reduction Ladder: Diagnosing & Resolving Code SLM Shortcut Mimicry"
     - Applied AI R&D @ Orange Innovation Labs
     - Formulated Inv-GRPO (Invariance-Regularized Policy Optimization)
     - Benchmarking Qwen2.5-Coder under <=8GB edge budgets.
  2. "NT-sMoCo: Dense Retrieval & Contrastive Learning for KBQA"
     - Published in Elsevier (Expert Systems with Applications, Vol. 296, 2026)
     - DOI: 10.1016/j.eswa.2025.129025
     - +7.9% Hits@1 over published SOTA baselines.`,

    repos: () => `Top Production Codebases:
  • OpenQ Platform     : github.com/OmarAbdelhamidAly/OpenQ-Federated-Agentic-Intelligence-Platform
  • Arabic LLM Serving : github.com/OmarAbdelhamidAly/arabic-peft-align-rag-tts
  • Multilingual RAG   : github.com/OmarAbdelhamidAly/multilingual-rag-system
  • Inv-GRPO Suite     : github.com/OmarAbdelhamidAly/diagnosing-resolving-code-slm-mimicry
  • NT-sMoCo Dense     : github.com/OmarAbdelhamidAly/nt-smoco-kbqa`,

    certs: () => `Verified Credentials:
  • AWS Solutions Architect - Associate (Credly Verified)
  • AWS Machine Learning Engineer - Associate (Credly Verified)
  • AWS AI Practitioner (Credly Verified)
  • AWS Cloud Practitioner (Credly Verified)
  • Azure AI Apps & Agents Developer - Associate (Microsoft AI-103)
  • ICPC / ECPC Finalist (Ranked 4th at Arab Open University)`,

    contact: () => `Direct Communication Channels:
  • Email    : omarabdelhamid347@gmail.com
  • Phone    : +20 112 599 4141
  • LinkedIn : linkedin.com/in/omar-abdelhamid-ai/
  • GitHub   : github.com/OmarAbdelhamidAly
  • Location : Cairo, Egypt (Available Worldwide Remote & Relocation)`,

    whoami: () => `Omar Abdelhamid Aly — AI Systems Engineer & Researcher
Specializing in Agentic Systems (LangGraph), Post-Training Alignment (GRPO/DPO),
Enterprise RAG (Qdrant/Neo4j), and High-Concurrency Model Serving (vLLM, Triton).`
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = terminalInput.value.trim();
        terminalInput.value = '';
        if (!rawCmd) return;

        // Print entered command
        const cmdLine = document.createElement('div');
        cmdLine.className = 'term-line';
        cmdLine.innerHTML = `<span class="term-prompt">omar@lab:~$</span> ${escapeHTML(rawCmd)}`;
        terminalOutput.appendChild(cmdLine);

        const lowerCmd = rawCmd.toLowerCase();

        if (lowerCmd === 'clear') {
          terminalOutput.innerHTML = '';
          return;
        }

        if (lowerCmd === 'exit' || lowerCmd === 'quit') {
          closeTerminal();
          return;
        }

        const outLine = document.createElement('div');
        outLine.className = 'term-line';

        if (commands[lowerCmd]) {
          outLine.innerHTML = commands[lowerCmd]();
        } else {
          outLine.innerHTML = `zsh: command not found: ${escapeHTML(rawCmd)}. Type <span class="term-hl">'help'</span> for available commands.`;
        }

        terminalOutput.appendChild(outLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // ==========================================
  // 5. TOAST NOTIFICATION & CLIPBOARD ENGINE
  // ==========================================
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Copy email triggers
  const heroCopyEmailBtn = document.getElementById('heroCopyEmailBtn');
  if (heroCopyEmailBtn) {
    heroCopyEmailBtn.addEventListener('click', () => {
      const email = heroCopyEmailBtn.getAttribute('data-email') || 'omarabdelhamid347@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
      });
    });
  }

  const copyChannelBtns = document.querySelectorAll('.btn-copy-channel');
  copyChannelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        showToast('✓ Copied to clipboard: ' + text);
      });
    });
  });

  // Smooth scroll offset adjustment for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
