// Kasoko Online Shop — Supabase-powered product catalogue
const WHATSAPP_NUMBER = "254797691323";

const SUPABASE_URL = "https://idimxniyngvbcxklfoss.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_kbirGHO6lmJcuohUry7cZw_V_QkaEGz";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Keep the existing category experience.
const categories = [
  { id: "bags", label: "Bags", emoji: "👜" },
  { id: "jewelry", label: "Jewelry", emoji: "💍" },
  { id: "watches", label: "Watches", emoji: "⌚" },
  { id: "other", label: "Other", emoji: "✨" }
];

let products = [];
let activeCategory = "all";

// Normalize Supabase rows so the existing cards, filters and WhatsApp flow
// continue to work even if the database stores price as a number.
function normalizeProduct(p) {
  const category = String(p.category ?? "other").toLowerCase().trim();
  const rawPrice = p.price;
  const price = typeof rawPrice === "number"
    ? `Fbu ${rawPrice.toLocaleString()}`
    : String(rawPrice ?? "");

  let img = p.img ?? p.image ?? p.image_url ?? "";
  if (img && !/^https?:\\/\\//i.test(img) && !img.startsWith("/")) {
    img = img.replace(/^\.\\//, "");
  }

  return {
    id: p.id,
    name: String(p.name ?? p.product_name ?? "Unnamed product"),
    category,
    price,
    size: String(p.size ?? "One size"),
    img
  };
}

function imageSource(path) {
  if (!path) return "assets/placeholder.jpg";
  if (/^(https?:)?\\/\\//i.test(path) || path.startsWith("/")) return path;
  return path;
}

function renderCategories() {
  const grid = document.getElementById("catGrid");
  const select = document.getElementById("categoryFilter");

  if (grid) {
    grid.innerHTML = categories.map(cat => `
      <button class="cat-card" data-category="${cat.id}" onclick="filterByCategory('${cat.id}')">
        <span class="cat-emoji">${cat.emoji}</span>
        <span class="cat-label">${cat.label}</span>
      </button>
    `).join("");
  }

  if (select) {
    select.innerHTML = '<option value="all">All categories</option>' +
      categories.map(cat => `<option value="${cat.id}">${cat.label}</option>`).join("");
  }
}

function setStatus(message = "") {
  const status = document.getElementById("productsStatus");
  if (status) status.textContent = message;
}

function renderProducts(list = products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">No products found. Try a different search or category.</p>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="product-card" data-category="${escapeHtml(p.category)}">
      <div class="product-img-wrap">
        <img src="${escapeHtml(imageSource(p.img))}" alt="${escapeHtml(p.name)}" loading="lazy"
             onerror="this.src='assets/placeholder.jpg'" />
      </div>
      <div class="product-info">
        <span class="product-category">${escapeHtml(p.category)}</span>
        <h3>${escapeHtml(p.name)}</h3>
        <p class="product-size">Size: ${escapeHtml(p.size)}</p>
        <div class="product-footer">
          <span class="product-price">${escapeHtml(p.price)}</span>
          <button
            class="btn btn-gold order-btn"
            data-name="${escapeHtml(p.name)}"
            data-size="${escapeHtml(p.size)}"
            data-price="${escapeHtml(p.price)}"
            aria-label="Order ${escapeHtml(p.name)} via WhatsApp"
          >Order via WhatsApp</button>
        </div>
      </div>
    </div>
  `).join("");

  attachOrderListeners();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function attachOrderListeners() {
  document.querySelectorAll(".order-btn").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const size = button.dataset.size;
      const price = button.dataset.price;

      const message = `Hello Kasoko! 👋
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

function filterByCategory(category) {
  activeCategory = category;

  document.querySelectorAll(".cat-card").forEach(card => {
    card.classList.toggle("active", card.dataset.category === category);
  });

  const select = document.getElementById("categoryFilter");
  if (select) select.value = category;

  applyFilters();
  document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
}

function setupSearch() {
  const searchBar = document.getElementById("searchBar");
  const categoryFilter = document.getElementById("categoryFilter");

  function applyFilters() {
    const text = searchBar?.value.toLowerCase().trim() ?? "";
    const category = categoryFilter?.value ?? activeCategory;

    activeCategory = category;

    const filtered = products.filter(p => {
      const searchable = `${p.name} ${p.category} ${p.size}`.toLowerCase();
      return searchable.includes(text) &&
        (category === "all" || p.category === category);
    });

    renderProducts(filtered);
    setStatus(`${filtered.length} product${filtered.length === 1 ? "" : "s"}`);
  }

  window.applyFilters = applyFilters;
  searchBar?.addEventListener("input", applyFilters);
  categoryFilter?.addEventListener("change", applyFilters);
}

async function loadProducts() {
  const grid = document.getElementById("productGrid");
  setStatus("Loading products...");

  try {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    products = (data ?? []).map(normalizeProduct);
    renderProducts(products);
    setStatus(`${products.length} product${products.length === 1 ? "" : "s"}`);
  } catch (error) {
    console.error("Supabase product load failed:", error);
    if (grid) {
      grid.innerHTML = '<p class="no-results">Unable to load products right now. Please try again later.</p>';
    }
    setStatus("Could not connect to the product catalogue.");
  }
}

function setupCartButton() {
  document.getElementById("cartBtn")?.addEventListener("click", () => {
    alert("To place an order, tap 'Order via WhatsApp' on any product. 🛍");
  });
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function setupMobileNav() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => nav?.classList.toggle("open"));
}

document.addEventListener("DOMContentLoaded", async () => {
  renderCategories();
  setupSearch();
  setupCartButton();
  setYear();
  setupMobileNav();
  await loadProducts();
});
