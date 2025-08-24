const products = [
  { id:1, name:"Wireless Headphones", price:1999, img:"https://via.placeholder.com/200" },
  { id:2, name:"Smartphone", price:14999, img:"https://via.placeholder.com/200" },
  { id:3, name:"Coffee Maker", price:2999, img:"https://via.placeholder.com/200" },
  { id:4, name:"Office Chair", price:6999, img:"https://via.placeholder.com/200" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if(countEl) countEl.textContent = cart.reduce((sum,c)=>sum+c.qty,0);
}

function renderProducts() {
  const list = document.getElementById("product-list");
  if(list){
    list.innerHTML = products.map(p=>`
      <div class="card">
        <a href="product.html?id=${p.id}">
          <img src="${p.img}" alt="${p.name}">
          <h3>${p.name}</h3>
        </a>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `).join("");
  }
}

function renderProductDetail() {
  const detail = document.getElementById("product-detail");
  if(detail){
    const id = new URLSearchParams(window.location.search).get("id");
    const p = products.find(x=>x.id==id);
    if(!p) return detail.innerHTML="Product not found";
    detail.innerHTML = `
      <h2>${p.name}</h2>
      <img src="${p.img}" width="250">
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
  }
}

function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if(itemsEl){
    itemsEl.innerHTML = cart.map(c=>`
      <div>${c.name} x${c.qty} = ₹${c.price*c.qty}</div>
    `).join("");
    totalEl.textContent = cart.reduce((sum,c)=>sum+c.price*c.qty,0);
  }
}

function addToCart(id){
  const item = products.find(p=>p.id===id);
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty++;
  else cart.push({...item, qty:1});
  saveCart();
  updateCartCount();
  renderCart();
}

// Run appropriate render function
renderProducts();
renderProductDetail();
renderCart();
updateCartCount();
