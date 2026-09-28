const SUPABASE_URL = "https://idimxniyngvbcxklfoss.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kbirGHO6lmJcuohUry7cZw_V_QkaEGz";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const loginView = document.getElementById("loginView");
const dashboardView = document.getElementById("dashboardView");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const productForm = document.getElementById("productForm");
const formMessage = document.getElementById("formMessage");
const tableMessage = document.getElementById("tableMessage");
const productsTable = document.getElementById("productsTable");

let products = [];

function showMessage(el, message, error = false) {
  el.textContent = message;
  el.className = `message ${error ? "error" : "success"}`;
}

function clearMessage(el) {
  el.textContent = "";
  el.className = "message";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function imageSource(path) {
  if (!path) return "assets/placeholder.jpg";
  return /^(https?:)?\/\//i.test(path) || path.startsWith("/") ? path : path;
}

async function isAdmin(user) {
  if (!user) return false;

  const { data, error } = await supabaseClient
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Admin check failed:", error);
    return false;
  }

  return Boolean(data);
}

async function showDashboard(user) {
  if (!(await isAdmin(user))) {
    await supabaseClient.auth.signOut();
    showMessage(loginMessage, "This account is not authorized as a Kasoko administrator.", true);
    return;
  }

  loginView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
  document.getElementById("adminEmail").textContent = user.email || "";
  await loadProducts();
}

async function loadProducts() {
  clearMessage(tableMessage);

  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    showMessage(tableMessage, error.message, true);
    return;
  }

  products = data || [];
  document.getElementById("productCount").textContent =
    `${products.length} product${products.length === 1 ? "" : "s"}`;
  renderTable();
}

function renderTable() {
  if (!products.length) {
    productsTable.innerHTML = '<tr><td colspan="6" class="empty">No products found.</td></tr>';
    return;
  }

  productsTable.innerHTML = products.map(product => `
    <tr>
      <td>
        <img class="thumb" src="${escapeHtml(imageSource(product.image_url))}"
             alt="${escapeHtml(product.name)}"
             onerror="this.src='assets/placeholder.jpg'">
      </td>
      <td>
        <strong>${escapeHtml(product.name)}</strong>
        <small>${escapeHtml(product.size || "One Size")}</small>
      </td>
      <td>${escapeHtml(product.category)}</td>
      <td>${escapeHtml(product.currency)} ${Number(product.price).toLocaleString()}</td>
      <td><span class="status ${product.available ? "available" : "unavailable"}">
        ${product.available ? "Available" : "Hidden"}
      </span></td>
      <td class="actions">
        <button class="small-btn edit" data-action="edit" data-id="${product.id}">Edit</button>
        <button class="small-btn delete" data-action="delete" data-id="${product.id}">Delete</button>
      </td>
    </tr>
  `).join("");
}

function resetForm() {
  productForm.reset();
  document.getElementById("productId").value = "";
  document.getElementById("productCurrency").value = "FBU";
  document.getElementById("productAvailable").checked = true;
  document.getElementById("formTitle").textContent = "Add Product";
  document.getElementById("saveProductBtn").textContent = "Add Product";
  document.getElementById("cancelEditBtn").classList.add("hidden");
  clearMessage(formMessage);
}

function startEdit(product) {
  document.getElementById("productId").value = product.id;
  document.getElementById("productName").value = product.name || "";
  document.getElementById("productCategory").value = product.category || "Other";
  document.getElementById("productPrice").value = product.price ?? "";
  document.getElementById("productCurrency").value = product.currency || "FBU";
  document.getElementById("productSize").value = product.size || "";
  document.getElementById("productImage").value = product.image_url || "";
  document.getElementById("productDescription").value = product.description || "";
  document.getElementById("productAvailable").checked = Boolean(product.available);
  document.getElementById("formTitle").textContent = "Edit Product";
  document.getElementById("saveProductBtn").textContent = "Save Changes";
  document.getElementById("cancelEditBtn").classList.remove("hidden");
  clearMessage(formMessage);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

productForm.addEventListener("submit", async event => {
  event.preventDefault();
  clearMessage(formMessage);

  const id = document.getElementById("productId").value;
  const payload = {
    name: document.getElementById("productName").value.trim(),
    category: document.getElementById("productCategory").value,
    price: Number(document.getElementById("productPrice").value),
    currency: document.getElementById("productCurrency").value.trim().toUpperCase(),
    size: document.getElementById("productSize").value.trim() || null,
    image_url: document.getElementById("productImage").value.trim() || null,
    description: document.getElementById("productDescription").value.trim() || null,
    available: document.getElementById("productAvailable").checked
  };

  if (!payload.name || Number.isNaN(payload.price)) {
    showMessage(formMessage, "Enter a product name and valid price.", true);
    return;
  }

  const button = document.getElementById("saveProductBtn");
  button.disabled = true;
  button.textContent = id ? "Saving..." : "Adding...";

  const result = id
    ? await supabaseClient.from("products").update(payload).eq("id", id)
    : await supabaseClient.from("products").insert(payload);

  button.disabled = false;

  if (result.error) {
    showMessage(formMessage, result.error.message, true);
    button.textContent = id ? "Save Changes" : "Add Product";
    return;
  }

  showMessage(formMessage, id ? "Product updated successfully." : "Product added successfully.");
  resetForm();
  await loadProducts();
});

productsTable.addEventListener("click", async event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const product = products.find(item => Number(item.id) === id);

  if (button.dataset.action === "edit" && product) {
    startEdit(product);
    return;
  }

  if (button.dataset.action === "delete" && product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;

    const { error } = await supabaseClient
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      showMessage(tableMessage, error.message, true);
      return;
    }

    showMessage(tableMessage, "Product deleted.");
    await loadProducts();
  }
});

document.getElementById("cancelEditBtn").addEventListener("click", resetForm);
document.getElementById("refreshBtn").addEventListener("click", loadProducts);

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  dashboardView.classList.add("hidden");
  loginView.classList.remove("hidden");
  loginForm.reset();
  clearMessage(loginMessage);
  resetForm();
});

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  clearMessage(loginMessage);

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    showMessage(loginMessage, error.message, true);
    return;
  }

  await showDashboard(data.user);
});

(async function init() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session?.user) {
    await showDashboard(session.user);
  }
})();
