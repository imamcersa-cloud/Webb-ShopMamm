// ============================================
// SHOP MAM — Products Data (shared)
// Edit produk di sini. Foto: images/burung/, images/pakan/, images/sangkar/
// ============================================

const PRODUCTS = [
  // ── BURUNG ──
  { id:1,  name:"Burung Kalimantan",   sub:"Eksotis & Langka",       category:"burung",  price:150000000, img:"../images/burung/pteranodon.jpg",  emoji:"🦜" },
  { id:2,  name:"Burung Beo",  sub:"Imup dan cantik",      category:"burung",  price:230000, img:"../images/burung/Beo.jpeg", emoji:"🐦" },
  { id:3,  name:"Burung kakatua",        sub:"Gacor & Jinak",           category:"burung",  price:450000,  img:"../images/burung/Kakatua.jpeg",       emoji:"🐤" },
  { id:4,  name:"Dokbird",          sub:"Langka & Kharismatik",    category:"burung",  price:990000000,  img:"../images/burung/Dokbird.jpeg",       emoji:"🦅" },
  { id:5,  name:"Digidaw",        sub:"Mungil",          category:"burung",  price:25000,  img:"../images/burung/digidaw.jpeg",       emoji:"🐦" },
  { id:6,  name:"Lovebird",            sub:"Berwarna & Penyayang",    category:"burung",  price:380000,  img:"../images/burung/lovebird.jpg",    emoji:"💚" },

  // ── PAKAN ──
  { id:7,  name:"Pakan Premium",       sub:"Formula Terbaik",         category:"pakan",   price:85000,   img:"../images/pakan/Premium.jpeg",      emoji:"🌾" },
  { id:8,  name:"Pakan B.A.J",         sub:"Biji Aneka Jenis",        category:"pakan",   price:45000,   img:"../images/pakan/Biasa.jpeg",          emoji:"🌿" },
  { id:9,  name:"Pakan Protein",       sub:"Untuk Pertumbuhan Optimal",category:"pakan",  price:120000,  img:"../images/pakan/Protein.jpeg",      emoji:"💪" },
  { id:10, name:"Rendang", sub:"Stok Terbatas 😄",  category:"pakan",   price:65000,   img:"../images/pakan/Rendang.jpeg",       emoji:"🥩" },

  // ── SANGKAR ──
  { id:11, name:"Sangkar Tradisional", sub:"Kayu Jati Alami",         category:"sangkar", price:125000,  img:"../images/sangkar/Sangkar Tradisional.jpg",emoji:"🏠" },
  { id:12, name:"Sangkar Bambuu",    sub:"Standard Berkualitas",     category:"sangkar", price:95000,   img:"../images/sangkar/Bambuu.jpeg",   emoji:"🏡" },
  { id:13, name:"Sangkar emas kuno kerajaan zaman dinasti wong",   sub:"Edisi Spesial",            category:"sangkar", price:17500000000,  img:"../images/sangkar/Emas.jpeg",  emoji:"🏰" },
  { id:14, name:"Sangkar Besi",        sub:"Anti Karat & Kokoh",       category:"sangkar", price:220000,  img:"../images/sangkar/Sangkar besi.jpeg",       emoji:"⚙️" },
];

// ── Cart helpers (shared across all pages) ──

function getCart() {
  return JSON.parse(localStorage.getItem('shopmam_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('shopmam_cart', JSON.stringify(cart));
  // Notify parent shell to update badge
  try { window.parent.syncCartBadge(); } catch(e) {}
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const cart = getCart();
  cart.push({ ...product });
  saveCart(cart);
  showToast(`✅ ${product.name} ditambahkan!`);

  const btn = document.querySelector(`[data-add="${id}"]`);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '✓ Ditambahkan';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '🛒 Tambah ke Keranjang';
    }, 1600);
  }
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

// ── Toast ──
function showToast(msg) {
  let t = document.getElementById('globalToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'globalToast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tmr);
  t._tmr = setTimeout(() => t.classList.remove('show'), 2400);
}

// ── Navigate from inside iframe ──
function goPage(url, pageKey) {
  try {
    window.parent.navigate('../' + url, pageKey);
  } catch(e) {
    window.location.href = '../' + url;
  }
}

// ── Format currency ──
function rupiah(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}
