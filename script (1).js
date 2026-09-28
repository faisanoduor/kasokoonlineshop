// ─── Configuration ───────────────────────────────────────────────
const WHATSAPP_NUMBER = "254797691323";

// ─── WhatsApp SVG icon ───────────────────────────────────────────
const WA_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.25a.75.75 0 0 0 .916.916l5.426-1.466A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 0 1-4.95-1.357l-.355-.21-3.676.993.993-3.676-.21-.355A9.695 9.695 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
</svg>`;

// ─── Data ────────────────────────────────────────────────────────
const categories = [
  { id: "bags",    label: "Bags",    emoji: "👜" },
  { id: "jewelry", label: "Jewelry", emoji: "💍" },
  { id: "watches", label: "Watches", emoji: "⌚" },
  { id: "other",   label: "Other",   emoji: "✨" },
];

const products = [
  { id: 1, name: "Quartz Watch Bracelets",      category: "bags",    price: "KES 4,500", size: "Large",    img: "assets/product1.jpg" },
  { id: 2, name: "Beaded Choker Necklace",  category: "jewelry", price: "KES 1,200", size: "One size", img: "assets/product2.jpg" },
  { id: 3, name: "Brass Cuff Bracelet",     category: "jewelry", price: "KES 950",   size: "One size", img: "assets/product3.jpg" },
  { id: 4, name: "Vintage Slim Watch",      category: "watches", price: "KES 7,800", size: "38mm",     img: "assets/product4.jpg" },
  { id: 5, name: "Sisal Crossbody Bag",     category: "bags",    price: "KES 3,200", size: "Medium",   img: "assets/product5.jpg" },
  { id: 6, name: "Gold-Tone Stud Earrings", category: "jewelry", price: "KES 650",   size: "One size", img: "assets/product6.jpg" },
  { id: 7, name: "Chronograph Sport Watch", category: "watches", price: "KES 12,000",size: "42mm",     img: "assets/watch1.jpg" },
  { id: 8, name: "Ankara Print Clutch",     category: "bags",    price: "KES 2,800", size: "Small",    img: "assets/product8.jpg" },
];

// ─── Render Categories ───────────────────────────────────────────
function renderCategories() {
  const grid = document.getElementById("catGrid");
  if (!grid) return;
  grid.innerHTML = categories.map(cat => `
    <button class="cat-card" data-category="${cat.id}" onclick="filterByCategory('${cat.id}')">
      <span class="cat-emoji">${cat.emoji}</span>
      <span class="cat-label">${cat.label}</span>
    </button>
  `).join("");
}

// ─── Render Products ─────────────────────────────────────────────
function renderProducts(list = products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `<p class="no-results">No products found. Try a different search.</p>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="product-card" data-category="${p.category}">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.src='assets/placeholder.jpg'" />
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="product-size">Size: ${p.size}</p>
        <div class="product-footer">
          <span class="product-price">${p.price}</span>
        </div>
        <button
          class="btn-whatsapp order-btn"
          data-name="${p.name}"
          data-size="${p.size}"
          data-price="${p.price}"
          aria-label="Order ${p.name} via WhatsApp"
        >
          ${WA_ICON} Order via WhatsApp
        </button>
      </div>
    </div>
  `).join("");

  attachOrderListeners();
}

// ─── WhatsApp Redirect ───────────────────────────────────────────
function attachOrderListeners() {
  document.querySelectorAll(".order-btn").forEach(button => {
    button.addEventListener("click", () => {
      const name  = button.dataset.name;
      const size  = button.dataset.size;
      const price = button.dataset.price;

      const message =
`Hello Kasoko! 👋
I'm interested in ordering this item:

🛍 *Product:* ${name}
📐 *Size:* ${size}
💰 *Price:* ${price}

Is it still available?`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
  });
}

// ─── Filter by Category ──────────────────────────────────────────
function filterByCategory(category) {
  document.querySelectorAll(".cat-card").forEach(card => {
    card.classList.toggle("active", card.dataset.category === category);
  });

  const filtered = products.filter(p => p.category === category);
  renderProducts(filtered);
  document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
}

// ─── Search & Filter ─────────────────────────────────────────────
function setupSearch() {
  const searchBar      = document.getElementById("searchBar");
  const categoryFilter = document.getElementById("categoryFilter");

  function applyFilters() {
    const text     = searchBar?.value.toLowerCase() ?? "";
    const category = categoryFilter?.value ?? "all";

    const filtered = products.filter(p => {
      const matchesSearch   = p.name.toLowerCase().includes(text);
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
  }

  searchBar?.addEventListener("keyup", applyFilters);
  categoryFilter?.addEventListener("change", applyFilters);
}

// ─── Cart button → redirect hint ─────────────────────────────────
function setupCartButton() {
  document.getElementById("cartBtn")?.addEventListener("click", () => {
    alert("To place an order, tap 'Order via WhatsApp' on any product. 🛍");
  });
}

// ─── Footer year ─────────────────────────────────────────────────
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ─── Mobile nav toggle ───────────────────────────────────────────
function setupMobileNav() {
  const toggle = document.getElementById("menuToggle");
  const nav    = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => nav?.classList.toggle("open"));
}

// ─── Init ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  setupSearch();
  setupCartButton();
  setYear();
  setupMobileNav();
});
