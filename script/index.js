const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTrendingProduct(data));
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
              <button class="btn btn-outline btn-primary w-1/2">
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
    console.log(product.rating.rate);
  });
};

loadProducts();
