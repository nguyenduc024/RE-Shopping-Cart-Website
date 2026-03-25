async function loadProducts() {
  const res = await fetch('products.json');
  const data = await res.json();
  return data.products;
}

function renderProductCard(product) {
  return `
    <div class="col-sm-4">
      <div class="product-image-wrapper">
        <div class="single-products">
          <div class="productinfo text-center">
            <img src="${product.image}" alt="${product.name}" />
            <h2>${product.price.toLocaleString('vi-VN')}đ</h2>
            <p>${product.name}</p>
            <a href="product-details.html?id=${product.id}"
               class="btn btn-default add-to-cart"
               onclick="addToCart(${product.id})">
              <i class="fa fa-shopping-cart"></i> Thêm vào giỏ
            </a>
          </div>
        </div>
        ${product.badge ? `<img src="images/home/${product.badge}.png" class="new" alt="${product.badge}" />` : ''}
      </div>
    </div>
  `;
}

async function initProductGrid() {
  const products = await loadProducts();
  products.forEach(product => {
    const wrapper = document.querySelector(`[data-id="${product.id}"]`);
    if (wrapper) {
      const nameP = wrapper.querySelector('.productinfo p');
      if (nameP) nameP.textContent = product.name;
      const overlayP = wrapper.querySelector('.overlay-content p');
      if (overlayP) overlayP.textContent = product.name;
      const priceH2 = wrapper.querySelector('.productinfo h2');
      if (priceH2) priceH2.textContent = `${product.price.toLocaleString('vi-VN')}đ`;
      const overlayH2 = wrapper.querySelector('.overlay-content h2');
      if (overlayH2) overlayH2.textContent = `${product.price.toLocaleString('vi-VN')}đ`;
    }
  });
}

document.addEventListener('DOMContentLoaded', initProductGrid);