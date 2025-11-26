// ========== MENU TOGGLE ==========
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".header-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// ===== Product Fetching =====

async function getProducts(filters = {}) {
  const queryParams = new URLSearchParams(filters);
  const res = await fetch(`/api/products?${queryParams}`);
  return await res.json();
}

// ===== Product Rendering =====

function renderProducts(products) {
  const albumsContainer = document.getElementById("products-container");
  const cards = products
    .map((album) => {
      return `
      <div class="product-card">
        <img src="./images/${album.image}" alt="${album.title}">
        <h2>${album.title}</h2>
        <h3>${album.artist}</h3>
        <p>$${album.price}</p>
        <button class="add-btn">Add to Cart</button>
        <p class="genre-label">${album.genre}</p>
      </div>
    `;
    })
    .join("");

  albumsContainer.innerHTML = cards;
}

// ========= Genre Dropdown ========
// populates the genre dropdown with available genres from the API

async function populateGenreSelect() {
  const res = await fetch("/api/products/genres");
  const genres = await res.json();
  console.log(genres);
  const select = document.getElementById("genre-select");

  // each genre is a string
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });
}

// ===== Initial Load =====

/**
 * Fetches and displays all products on initial page load.
 */
async function init() {
  // generate dropdown menu of genres - first fetch genres from endpoint
  populateGenreSelect();
  // fetch all products
  const products = await getProducts();
  // render the products as cards
  renderProducts(products);
}

init();
