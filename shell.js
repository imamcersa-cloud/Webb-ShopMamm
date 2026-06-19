// ============================================
// SHOP MAM — Shell JS
// Controls iframe navigation & cart badge sync
// ============================================

const frame = document.getElementById('contentFrame');
const loadingBar = document.getElementById('loadingBar');

// ── Navigate ──────────────────────────────────
function navigate(url, pageKey) {
  // Loading bar
  loadingBar.className = 'loading';
  loadingBar.style.width = '0%';

  // Set active nav tab
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.page === pageKey);
  });

  // Load into iframe
  frame.src = url;
}

// ── Frame loaded ──────────────────────────────
function onFrameLoad() {
  loadingBar.className = 'done';
  setTimeout(() => { loadingBar.className = ''; loadingBar.style.width = '0%'; }, 500);

  // Sync cart badge from localStorage
  syncCartBadge();

  // Let child page call parent.syncCartBadge() after cart changes
  try {
    if (frame.contentWindow) {
      frame.contentWindow._parentShell = window;
    }
  } catch(e) {}
}

// ── Cart Badge Sync ────────────────────────────
function syncCartBadge() {
  try {
    const cart = JSON.parse(localStorage.getItem('shopmam_cart') || '[]');
    document.getElementById('cartBadge').textContent = cart.length;
  } catch(e) {}
}

// Listen for storage changes (cart updated in iframe)
window.addEventListener('storage', syncCartBadge);
// Also poll every second as fallback for same-origin iframes
setInterval(syncCartBadge, 1000);

// ── Search ────────────────────────────────────
function handleSearch(e) {
  if (e.key === 'Enter') doSearch();
}

function doSearch() {
  const q = document.getElementById('globalSearch').value.trim();
  if (!q) return;
  navigate(`pages/home.html?search=${encodeURIComponent(q)}`, 'beranda');
}

// ── Initial badge sync ────────────────────────
syncCartBadge();
