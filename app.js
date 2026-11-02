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

});
