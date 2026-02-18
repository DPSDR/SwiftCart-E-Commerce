let allProducts = [];

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      displayTrendingProduct(data);
      displayProduct(data);
    });
};

const loadProductCategory = () => {
  const url = `https://fakestoreapi.com/products/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProductCatergoryLevel(data));
};

const loadLevelCategory = (category) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProduct(data));
};

const loadProductDetail = async (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayProductDetails(details);
};

const displayProductCatergoryLevel = (levels) => {
  const productCatergoryLevel = document.getElementById(
    "product-category-level",
  );

  levels.forEach((level) => {
    const div = document.createElement("div");
    const btn = document.createElement("button");

    btn.className = "btn btn-soft btn-primary rounded-full";
    btn.innerText = level;

    btn.addEventListener("click", () => {
      loadLevelCategory(level);
    });

    div.appendChild(btn);
    productCatergoryLevel.appendChild(div);
  });
};

const displayTrendingProduct = (products) => {
  const trendingProductContainer = document.getElementById(
    "trending-product-container",
  );
  trendingProductContainer.innerHTML = "";

  products.slice(0, 3).forEach((product) => {
    const trendingProductCard = document.createElement("div");
    trendingProductCard.innerHTML = `
        <div class="card bg-base-100 w-auto shadow-sm">
          <figure class="bg-gray-100 h-56 flex items-center justify-center p-4">
            <img class="h-full w-full object-contain"
              src=${product.image}
              alt="Shoes"
            />
          </figure>
          <div class="card-body space-y-3">
            <span class="flex justify-between">
              <p class="text-sm text-blue-600 bg-gray-100 rounded-lg font-bold text-center">${product.category}</p>
              <p class="text-end"> <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate} (${product.rating.count})</p>
            </span>
            <h4 class="font-semibold">
              ${product.title}
            </h4>
            <h4 class="font-semibold">$${product.price}</h4>
            <div class="flex gap-1">
              <button onClick="loadProductDetail(${product.id})" class="btn btn-outline btn-primary w-1/2">
                <i class="fa-regular fa-eye"></i> Details
              </button>
              <button class="btn btn-primary w-1/2">
                <i class="fa-solid fa-cart-shopping"></i> Add
              </button>
            </div>
          </div>
        </div>
    `;

    trendingProductContainer.appendChild(trendingProductCard);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("allBtn").addEventListener("click", () => {
    displayProduct(allProducts);
  });
});

const displayProduct = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const totalProducts = document.createElement("div");
    totalProducts.innerHTML = `
        <div class="card bg-base-100 w-auto shadow-sm">
          <figure class="bg-gray-100 h-56 flex items-center justify-center p-4">
            <img class="h-full w-full object-contain"
              src=${product.image}
              alt="Shoes"
            />
          </figure>
          <div class="card-body space-y-3">
            <span class="flex justify-between">
              <p class="text-sm text-blue-600 bg-gray-100 rounded-lg font-bold text-center">${product.category}</p>
              <p class="text-end"> <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate} (${product.rating.count})</p>
            </span>
            <h4 class="font-semibold">
              ${product.title}
            </h4>
            <h4 class="font-semibold">$${product.price}</h4>
            <div class="flex gap-1">
              <button onClick="loadProductDetail(${product.id})" class="btn btn-outline btn-primary w-1/2">
                <i class="fa-regular fa-eye"></i> Details
              </button>
              <button class="btn btn-primary w-1/2">
                <i class="fa-solid fa-cart-shopping"></i> Add
              </button>
            </div>
          </div>
        </div>
    `;
    productContainer.appendChild(totalProducts);
  });
};

const displayProductDetails = (product) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
          <div>
            <h2 class="text-2xl font-bold">
               Product: ${product.title}
            </h2>
          </div>
          <div>
            <h2 class="text-xl font-bold">Price: $${product.price}</h2>
            <p class="font-bangla">Details: ${product.description}</p>

          </div>
  `;
  document.getElementById("product_modal").showModal();
};

loadProducts();
loadProductCategory();
