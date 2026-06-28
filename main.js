/* ============================================================
   DHRITI — Main Application Logic
   ============================================================ */

/* ── UTILITY ──────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const qs = id => document.getElementById(id);

/* ── NAV SCROLL BEHAVIOUR ──────────────────────────────────── */
function initNav() {
  const nav = qs('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    const btt = qs('back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Hamburger
  const ham = qs('nav-hamburger');
  const mob = qs('mobile-nav');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('open');
    });
  }

  // Close mobile nav on link click
  $$('#mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      ham?.classList.remove('open');
      mob?.classList.remove('open');
    });
  });
}

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
function initScrollReveal() {
  const els = $$('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  els.forEach(el => io.observe(el));
}

/* ── BACK TO TOP ───────────────────────────────────────────── */
function initBackToTop() {
  const btn = qs('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── TOAST ─────────────────────────────────────────────────── */
function showToast(msg, type = 'success', duration = 4000) {
  const container = qs('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠'}</span>${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}
function createToastContainer() {
  const el = document.createElement('div');
  el.className = 'toast-container';
  el.id = 'toast-container';
  document.body.appendChild(el);
  return el;
}

/* ── PRODUCT IMAGE PLACEHOLDER ─────────────────────────────── */
function productImgHTML(product) {
  return `
    <div class="product-img-placeholder">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span>Image Coming</span>
    </div>`;
}

/* ── PRODUCT CARD RENDER ───────────────────────────────────── */
function renderProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card reveal';
  card.dataset.id = product.id;
  card.dataset.category = product.category;

  const tagHTML = product.tag
    ? `<span class="product-tag ${product.tag}">${product.tag === 'bestseller' ? '🔥 Bestseller' : '⚡ New'}</span>`
    : '';

  card.innerHTML = `
    <div class="product-img-wrap">
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.style.display='none';this.parentElement.innerHTML+='${productImgHTML(product).replace(/\n\s+/g, ' ')}'">
      ${tagHTML}
    </div>
    <div class="product-info">
      <span class="product-cat">${getCategoryLabel(product.category)}</span>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-short-desc">${product.shortDesc}</p>
      <div class="product-footer">
        <span class="product-price">${product.price}</span>
        <button class="product-order-btn" data-id="${product.id}">Order Now</button>
      </div>
    </div>`;

  card.querySelector('.product-order-btn').addEventListener('click', e => {
    e.stopPropagation();
    openOrderModal(product);
  });

  card.addEventListener('click', () => {
    window.location.href = `product.html?id=${product.id}`;
  });

  return card;
}

function getCategoryLabel(id) {
  const map = { men: "Men's Wear", women: "Women's Wear", kids: "Kids' Wear", equipment: "Equipment" };
  return map[id] || id;
}

/* ── RENDER PRODUCT GRIDS ──────────────────────────────────── */
function renderProducts(containerId, filterFn = null, limit = null) {
  const container = qs(containerId);
  if (!container) return;
  container.innerHTML = '';

  let items = filterFn ? PRODUCTS.filter(filterFn) : PRODUCTS;
  if (limit) items = items.slice(0, limit);

  if (!items.length) {
    container.innerHTML = '<div class="empty-state"><h3>No products found</h3><p>Try a different category.</p></div>';
    return;
  }

  items.forEach(p => container.appendChild(renderProductCard(p)));
  // Stagger delays
  $$('.product-card', container).forEach((card, i) => {
    card.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });
  setTimeout(initScrollReveal, 50);
}

/* ── CATEGORY FILTER ───────────────────────────────────────── */
function initCategoryFilter() {
  const tabs = $$('.filter-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      renderProducts('products-grid', cat === 'all' ? null : p => p.category === cat);
    });
  });
}

/* ── NEW ARRIVALS SECTION ──────────────────────────────────── */
function renderNewArrivals() {
  const container = qs('arrivals-container');
  if (!container) return;

  const arrivals = PRODUCTS.filter(p => p.newArrival);
  if (!arrivals.length) return;

  const [featured, ...rest] = arrivals;

  const featuredEl = document.createElement('div');
  featuredEl.className = 'arrival-featured reveal';
  featuredEl.innerHTML = `
    <img src="${featured.image}" alt="${featured.name}"
      onerror="this.style.display='none'">
    <div class="overlay">
      <span class="product-tag new">⚡ New Arrival</span>
      <h3 class="arrival-name" style="margin-top:0.75rem">${featured.name}</h3>
      <span class="arrival-price">${featured.price}</span>
      <button class="btn btn-primary btn-sm" style="margin-top:1rem" data-id="${featured.id}">Order Now</button>
    </div>`;
  featuredEl.querySelector('button').addEventListener('click', () => openOrderModal(featured));

  const smallWrap = document.createElement('div');
  smallWrap.style.display = 'flex';
  smallWrap.style.flexDirection = 'column';
  smallWrap.style.gap = '1.5rem';

  rest.slice(0, 3).forEach(p => {
    const el = document.createElement('div');
    el.className = 'arrival-sm reveal';
    el.innerHTML = `
      <img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">
      <div class="overlay">
        <h4 class="arrival-name">${p.name}</h4>
        <span class="arrival-price">${p.price}</span>
      </div>`;
    el.addEventListener('click', () => openOrderModal(p));
    smallWrap.appendChild(el);
  });

  container.appendChild(featuredEl);
  container.appendChild(smallWrap);
}

/* ── ORDER MODAL ───────────────────────────────────────────── */
let currentProduct = null;
let qty = 1;

function openOrderModal(product) {
  currentProduct = product;
  qty = 1;

  qs('modal-product-name').textContent = product.name;
  qs('modal-product-price').textContent = product.price;
  qs('order-product-name').value = product.name;
  qs('order-product-price').value = product.price;
  qs('qty-display').textContent = qty;

  // Populate sizes
  const sizeSelect = qs('order-size');
  sizeSelect.innerHTML = '<option value="">Select Size</option>';
  (product.sizes || ['S', 'M', 'L', 'XL']).forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    sizeSelect.appendChild(opt);
  });

  // Reset form & success state
  qs('order-form').reset();
  qs('order-product-name').value = product.name;
  qs('order-product-price').value = product.price;
  qs('qty-display').textContent = qty;
  qs('modal-form-content').style.display = '';
  qs('modal-success').classList.remove('show');

  qs('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  qs('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initModal() {
  // Close on overlay click
  qs('modal-overlay')?.addEventListener('click', e => {
    if (e.target === qs('modal-overlay')) closeOrderModal();
  });

  // Close button
  qs('modal-close')?.addEventListener('click', closeOrderModal);

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeOrderModal();
  });

  // Quantity controls
  qs('qty-minus')?.addEventListener('click', () => {
    if (qty > 1) { qty--; qs('qty-display').textContent = qty; }
  });
  qs('qty-plus')?.addEventListener('click', () => {
    if (qty < 20) { qty++; qs('qty-display').textContent = qty; }
  });

  // Form submit
  qs('order-form')?.addEventListener('submit', handleOrderSubmit);
}

/* ── ORDER FORM SUBMISSION (Web3Forms) ─────────────────────── */
async function handleOrderSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = qs('modal-submit-btn');
  const originalHTML = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> Placing Order...`;

  const data = new FormData(form);
  data.set('quantity', qty);

  // Build readable message for owner
  const ownerMsg = `
🛒 NEW ORDER — DHRITI
═══════════════════════
👤 Customer: ${data.get('customer_name')}
📞 Phone: ${data.get('phone')}
📧 Email: ${data.get('email')}
📍 Address: ${data.get('address')}

📦 Product: ${data.get('product_name')}
💰 Price: ${data.get('product_price')}
📐 Size: ${data.get('size')}
🔢 Quantity: ${qty}
📝 Notes: ${data.get('notes') || 'None'}
═══════════════════════
Please contact the customer shortly.
  `.trim();

  // Customer confirmation message
  const customerMsg = `
Hi ${data.get('customer_name')},

Thank you for ordering from Dhriti! 🏆

Your order has been received and our team will contact you shortly to confirm.

ORDER SUMMARY:
• Product: ${data.get('product_name')}
• Size: ${data.get('size')}
• Quantity: ${qty}
• Price: ${data.get('product_price')}

We'll reach out to you on ${data.get('phone')} or ${data.get('email')} to confirm delivery details and payment.

Thank you for choosing Dhriti — Where Champions Train.

Warm regards,
Team Dhriti
  `.trim();

  try {
    // Send owner notification via Web3Forms
    const ownerPayload = {
      access_key: STORE_CONFIG.web3formsKey,
      subject: `🛒 New Order — ${data.get('product_name')} from ${data.get('customer_name')}`,
      from_name: "Dhriti Order System",
      email: STORE_CONFIG.ownerEmail,
      message: ownerMsg,
      customer_name: data.get('customer_name'),
      customer_email: data.get('email'),
      customer_phone: data.get('phone'),
    };

    const ownerRes = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(ownerPayload),
    });

    // Send customer confirmation
    const custPayload = {
      access_key: STORE_CONFIG.web3formsKey,
      subject: `✅ Order Confirmation — Dhriti`,
      from_name: "Dhriti Sports",
      email: data.get('email'),
      message: customerMsg,
    };

    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(custPayload),
    });

    const result = await ownerRes.json();

    if (result.success) {
      // Show success state
      qs('modal-form-content').style.display = 'none';
      qs('modal-success').classList.add('show');
      qs('success-customer-name').textContent = data.get('customer_name');
      qs('success-product-name').textContent = data.get('product_name');
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (err) {
    console.error('Order error:', err);
    showToast('Something went wrong. Please try again or contact us directly.', 'error');
    btn.disabled = false;
    btn.innerHTML = originalHTML;
  }
}

/* ── CATEGORY CARDS ────────────────────────────────────────── */
function renderCategoryCards() {
  const container = qs('category-cards');
  if (!container) return;

  CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'cat-card reveal';
    card.innerHTML = `
      <span class="cat-icon">${cat.icon}</span>
      <h3 class="cat-name">${cat.label}</h3>
      <p class="cat-desc">${cat.desc}</p>`;
    card.addEventListener('click', () => {
      const productsSection = qs('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          $$('.filter-tab').forEach(t => t.classList.remove('active'));
          const tab = $(`.filter-tab[data-cat="${cat.id}"]`);
          if (tab) {
            tab.classList.add('active');
            renderProducts('products-grid', p => p.category === cat.id);
          }
        }, 600);
      }
    });
    container.appendChild(card);
  });
}

/* ── MARQUEE (duplicate for seamless loop) ─────────────────── */
function initMarquee() {
  const track = $('.marquee-track');
  if (!track) return;
  // Already duplicated in HTML, just ensure it's there
}

/* ── HERO ANIMATION ────────────────────────────────────────── */
function initHeroAnimations() {
  const heroEls = $$('.hero-content > *');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });
}

/* ── SMOOTH ACTIVE NAV LINK ────────────────────────────────── */
function initActiveSections() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => io.observe(s));
}

/* ── PRODUCT DETAIL PAGE ───────────────────────────────────── */
function initProductDetailPage() {
  const detailContainer = qs('product-detail-root');
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    detailContainer.innerHTML = `
      <div style="text-align:center;padding:8rem 1rem;">
        <h2>Product Not Found</h2>
        <p style="color:var(--grey3);margin:1rem 0;">This product doesn't exist or has been removed.</p>
        <a href="index.html" class="btn btn-primary" style="display:inline-flex;margin-top:1rem">Back to Home</a>
      </div>`;
    return;
  }

  // Update page meta
  document.title = `${product.name} — Dhriti`;
  const metaDesc = $('meta[name="description"]');
  if (metaDesc) metaDesc.content = product.shortDesc;

  // Breadcrumb
  const breadEl = qs('product-breadcrumb');
  if (breadEl) {
    breadEl.innerHTML = `
      <a href="index.html">Home</a>
      <span class="sep">/</span>
      <a href="index.html#products">${getCategoryLabel(product.category)}</a>
      <span class="sep">/</span>
      <span>${product.name}</span>`;
  }

  // Image
  const imgEl = qs('detail-main-img');
  if (imgEl) {
    imgEl.innerHTML = `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">`;
  }

  // Tag
  const tagEl = qs('detail-tag');
  if (tagEl && product.tag) {
    tagEl.innerHTML = `<span class="product-tag ${product.tag}">${product.tag === 'bestseller' ? '🔥 Bestseller' : '⚡ New Arrival'}</span>`;
  }

  // Text
  qs('detail-name').textContent       = product.name;
  qs('detail-price').textContent      = product.price;
  qs('detail-description').textContent = product.description;

  // Features
  const featEl = qs('detail-features');
  if (featEl) {
    featEl.innerHTML = product.features.map(f =>
      `<div class="detail-feature-item">${f}</div>`
    ).join('');
  }

  // Sizes
  const sizeGrid = qs('detail-size-grid');
  if (sizeGrid) {
    sizeGrid.innerHTML = product.sizes.map(s =>
      `<button class="size-chip">${s}</button>`
    ).join('');
    $$('.size-chip', sizeGrid).forEach(chip => {
      chip.addEventListener('click', () => {
        $$('.size-chip', sizeGrid).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  }

  // CTA
  qs('detail-order-btn')?.addEventListener('click', () => openOrderModal(product));

  // Related products
  renderProducts('related-products-grid', p => p.category === product.category && p.id !== product.id, 4);
}

/* ── CONTACT FORM (Web3Forms) ──────────────────────────────── */
function initContactForm() {
  const form = qs('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = qs('contact-submit-btn');
    const origHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Sending...`;

    const data = new FormData(form);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: STORE_CONFIG.web3formsKey,
          subject: `Contact Form — Dhriti`,
          from_name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });
      const result = await res.json();
      if (result.success) {
        showToast('Message sent! We\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      showToast('Failed to send message. Please email us directly.', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = origHTML;
    }
  });
}

/* ── HERO COUNTER ANIMATION ────────────────────────────────── */
function animateCounters() {
  $$('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();
    const update = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Universal inits
  initNav();
  initModal();
  initBackToTop();
  initScrollReveal();

  const isHome = qs('hero');
  const isDetail = qs('product-detail-root');

  if (isHome) {
    initHeroAnimations();
    renderCategoryCards();
    renderProducts('products-grid', null, null);
    renderProducts('featured-grid', p => p.featured, 4);
 initCategoryFilter();
    initActiveSections();
    initContactForm();
    initMarquee();
    setTimeout(animateCounters, 800);
  }

  if (isDetail) {
    initProductDetailPage();
    initModal();
  }
});