// ========== MENU TOGGLE ==========
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".header-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// ======== PRODUCT FETCHING =======
async function getProducts(filter = {}) {
  const queryParams = new URLSearchParams(filter);

  const res = await fetch(`/api/products?${queryParams}`);
  return await res.json();
}

// ========= PRODUCT RENDERING ========
function renderProducts(products) {
  const albumsContainer = document.getElementById("products-container");
  const cards = products
    .map((album) => {
      return `
      <div class="product-card">
        <img src="./images/${album.image}" alt="${album.title}">
        <h2>${album.title}</h2>
        <h3>${album.artist}</h3>
        <p>${album.price}</p>
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

// INITIAL LOAD

async function init() {
  populateGenreSelect();
  // fetch all products based on query params
  const products = await getProducts();
  // render the returned products as product cards
  renderProducts(products);
  // populate the genres in the select menu
}

init();
