// ─── Configuration ───────────────────────────────────────────────
const WHATSAPP_NUMBER = "254797691323"; // From your footer contact

// ─── Data ────────────────────────────────────────────────────────
const categories = [
  { id: "bags",    label: "Bags",    emoji: "👜" },
  { id: "jewelry", label: "Jewelry", emoji: "💍" },
  { id: "watches", label: "Watches", emoji: "⌚" },
  { id: "other",   label: "Other",   emoji: "✨" },
];

const products = [
  { id: 1, name: "Vintage Slim Watch",      category: "watches",    price: "Fbu 45,000", size: "Large",    img: "assets/watch3.jpg" },
  { id: 2, name: "9D HIFI Sound",  category: "other", price: "Fbu 50,000", size: "One size", img: "assets/other1.jpg" },
  { id: 3, name: "Electro Mate Pump",     category: "other", price: "Fbu 38,000",   size: "One size", img: "assets/other2.jpg" },
  { id: 4, name: "Vintage Slim Watch",      category: "watches", price: "Fbu 50,000", size: "38mm",     img: "assets/watch2.jpg" },
  { id: 5, name: "16 Colors Bulb",     category: "other",    price: "Fbu 45,000", size: "Medium",   img: "assets/other3.jpg" },
  { id: 6, name: "Home Decor", category: "other", price: "Fbu 42,000",   size: "One size", img: "assets/other4.jpg" },
  { id: 7, name: "Vintage Slim Watch", category: "watches", price: "Fbu 50,000","size": "42mm",   img: "assets/watch1.jpg" },
  { id: 8, name: "Zqzq Cliper",     category: "other",    price: "Fbu 42,000", size: "Small",    img: "assets/other5.jpg" },
  { id: 9, name: "Portable Fun",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other6.jpg" },
  { id: 10, name: "Smart sensor",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other7.jpg" },
  { id: 11, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other8.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 45,000", size: "Small",    img: "assets/other9.jpg" },
  { id: 12, name: "flexible lazy phone holder",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other10.jpg" },
  { id: 12, name: "portable solarpower bank",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other11.jpg" },
  { id: 12, name: "En Rouge Aussi",     category: "other",    price: "Fbu 70,000", size: "Small",    img: "assets/other12.jpg" },
  { id: 12, name: "sunglasess",     category: "other",    price: "Fbu 35,000", size: "Small",    img: "assets/other13.jpg" },
  { id: 12, name: "Butterfly blue sunglasess",     category: "other",    price: "Fbu 35,000", size: "Small",    img: "assets/other14.jpg" },
  { id: 12, name: "White flexible lazy phone holder",     category: "other",    price: "Fbu 50,000", size: "70cm",    img: "assets/other15.jpg" },
  { id: 12, name: "portable humidifier",     category: "other",    price: "Fbu 35,000", size: "Small",    img: "assets/other16.jpg" },
  { id: 12, name: "En Rouge Aussi",     category: "other",    price: "Fbu 70,000", size: "Small",    img: "assets/other17.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other18.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other19.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other20.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other21.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other22.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other23.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other24.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other25.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other26.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other27.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other28.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other29.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other30.jpg" },
  { id: 12, name: "Weight-lifting gloves",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other31.jpg" },
  { id: 12, name: "other",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other32.jpg" },
  { id: 12, name: "other",     category: "other",    price: "Fbu 38,000", size: "Small",    img: "assets/other33.jpg" },
  { id: 12, name: "Watch",     category: "watches",    price: "Fbu 38,000", size: "Small",    img: "assets/watch4.jpg" },
  { id: 12, name: "Watch",     category: "watches",    price: "Fbu 38,000", size: "Small",    img: "assets/watch5.jpg" },
  { id: 12, name: "Watch",     category: "watches",    price: "Fbu 38,000", size: "Small",    img: "assets/watch6.jpg" },
  { id: 12, name: "Watch",     category: "watches",    price: "Fbu 38,000", size: "Small",    img: "assets/watch7.jpg" },
  { id: 12, name: "Watch",     category: "watches",    price: "Fbu 38,000", size: "Small",    img: "assets/watch8.jpg" },
  { id: 12, name: "Watch",     category: "watches",    price: "Fbu 38,000", size: "Small",    img: "assets/watch9.jpg" },
  { id: 12, name: "Watch",     category: "watches",    price: "Fbu 38,000", size: "Small",    img: "assets/watch10.jpg" },
  { id: 12, name: "Watch",     category: "watches",    price: "Fbu 38,000", size: "Small",    img: "assets/watch11.jpg" },
  { id: 12, name: "jewelry",     category: "jewelry",    price: "Fbu 28,000", size: "Small",    img: "assets/jewel1.jpg" },
  { id: 12, name: "jewelry",     category: "jewelry",    price: "Fbu 33,000", size: "Small",    img: "assets/jewel2.jpg" },
  { id: 12, name: "jewelry",     category: "jewelry",    price: "Fbu 38,000", size: "Small",    img: "assets/jewel3.jpg" },
  { id: 12, name: "jewelry",     category: "jewelry",    price: "Fbu 38,000", size: "Small",    img: "assets/jewel4.jpg" },
  { id: 12, name: "jewelry",     category: "jewelry",    price: "Fbu 25,000", size: "Small",    img: "assets/jewel5.jpg" },
  { id: 12, name: "jewelry",     category: "jewelry",    price: "Fbu 38,000", size: "Small",    img: "assets/jewel6.jpg" },
  { id: 12, name: "jewelry",     category: "jewelry",    price: "Fbu 25,000", size: "Small",    img: "assets/jewel7.jpg" },
  { id: 12, name: "jewelry",     category: "jewelry",    price: "Fbu 32,000", size: "Small",    img: "assets/jewel8.jpg" },
  { id: 12, name: "Earing",     category: "jewelry",    price: "Fbu 37,000", size: "Small",    img: "assets/jewel9.jpg" },
  { id: 12, name: "jewelry",     category: "jewelry",    price: "Fbu 38,000", size: "Small",    img: "assets/jewel10.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag1.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag2.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag3.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag4.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag5.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag6.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag7.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag8.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag9.jpg" },
  { id: 12, name: "Bag",     category: "bags",    price: "Fbu 38,000", size: "Small",    img: "assets/bag10.jpg" },
 
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
          <button
            class="btn btn-gold order-btn"
            data-name="${p.name}"
            data-size="${p.size}"
            data-price="${p.price}"
            aria-label="Order ${p.name} via WhatsApp"
          >
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  `).join("");

  // Attach WhatsApp listeners to freshly rendered buttons
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

// ─── Filter by Category (from category cards) ────────────────────
function filterByCategory(category) {
  // Highlight active category card
  document.querySelectorAll(".cat-card").forEach(card => {
    card.classList.toggle("active", card.dataset.category === category);
  });

  const filtered = products.filter(p => p.category === category);
  renderProducts(filtered);

  // Scroll to collection
  document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
}

// ─── Search & Filter Bar ─────────────────────────────────────────
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

// ─── Cart button → just shows count (no cart page) ───────────────
// The cart UI is replaced by WhatsApp, but we keep the button alive
// in case you want a wishlist in the future.
function setupCartButton() {
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      alert("To place an order, tap 'Order via WhatsApp' on any product. 🛍");
    });
  }
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
