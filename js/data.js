const Search = document.getElementById("search");
const container = document.getElementById("icon-container");

Search.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search";
    input.className = "form-control"; // bootstrap style

    // Replace icon with input
    container.replaceChild(input, Search);

    // Focus on input
    input.focus();

    // Press Esc to return icon
    input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            container.replaceChild(Search, input);
        }
    });
});

// cardphoto
let photocard = [];
let cardItem = [];

const Productnow = (products = photocard) => {
    let show = ``;
    products.forEach(menunow => {
        show += `
        <div class="pro col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <img class="card-img-top img-fixed my-3" src="${menunow.image}" alt="">
            <div class="card-body text-center">
              <h3 class="card-title">${menunow.name}</h3>
              <p style="font-size: 16px;" class="card-text">${menunow.description.substring(0,80)}</p>
              <p class="fw-bold fs-2 text-danger">${menunow.price}$</p>
              <div class="icons my-2 d-flex justify-content-center align-items-center gap-4 py-2 rounded" style="background-color: pink;">
                <i class="bi bi-envelope-paper-heart fs-2"></i>
                <button onclick="AddtoCart(${menunow.id})" class="btn btn-light fw-semibold fs-3">Add to Cart</button>
                <i class="bi bi-suit-heart fs-2"></i>
              </div>
            </div>
          </div>
        </div>
        `;
    });
    document.getElementById('product-show').innerHTML = show;
};

fetch("https://tholsreymey.github.io/skincare/skincare.json")
    .then(res => res.json())
    .then(item => {
        photocard = item;
        Productnow();
    })
    .catch(err => alert(err));
//Add your Card
const AddtoCart=(productId)=> {
  const product = photocard.find(p=> p.id === productId)
  const cardreader = cardItem.find(p => p.id === productId)
  if(cardreader){
    cardreader.qurity+=1
  }else {
    cardItem.push({...product,qurity:1})
  }
  Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${product.name} Thank you for order`,
  showConfirmButton: false,
  timer: 1500
});
Updatetocard ();
}
//update to card
const Updatetocard =() => {
  const count = document.getElementById('cart-count')
  const itemcard = document.getElementById('cart-item')
  //updatetotelitem
  const totalitem = cardItem.reduce((sum, i) => sum + i.qurity, 0);
  if (count) count.innerText = totalitem;
  // If cart is empty
  if(cardItem.length===0){
    itemcard.innerHTML = `
  <div class="text-center py-5">
    <i class="bi bi-cart-x fs-1 text-muted"></i>
    <p class="mt-3 fs-5 text-secondary">Your Cart Is Empty</p>
  </div>`;

    return;
  }
  // Render card items
  let show=``
  cardItem.forEach(item => {
    show +=`
    <div class="d-flex align-items-center mb-3 border-bottom pb-2">
        <img src="${item.image}" alt="${item.name}" class="rounded me-3" style="width:70px; height:70px; object-fit:cover;">
        <div class="flex-grow-1">
          <h6 class="mb-0">${item.name}</h6>
          <small class="text-muted">${item.price}$</small>
          <div class="d-flex align-items-center mt-1">
            <button class="btn btn-sm btn-outline-secondary" onclick="Updatequrity(${item.id}, -1)">-</button>
            <input type="text" class="form-control form-control-sm text-center mx-1" value="${item.qurity}" style="width: 45px;" readonly>
           <button class="btn btn-sm btn-outline-secondary" onclick="Updatequrity(${item.id}, 1)">+</button>

          </div>
        </div>
        <div class="d-flex flex-column align-items-end ms-2">
          <span class="fw-bold">${(item.qurity *  item.price).toFixed(2)}$</span>
          <button class="btn btn-sm btn-outline-danger mt-1" onclick="RemoveCart(${item.id})">

            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `
  })
  // Cart summary
  const subtotal = cardItem.reduce((sum ,i) => sum + i.qurity * i.price , 0);
  const delivery = 10;
  const total = subtotal + delivery;
  show += `
  <div class="cart-summary border-top pt-3">
      <div class="d-flex justify-content-between mb-2">
        <span>Subtotal</span>
        <span class="fw-bold">$${subtotal.toFixed(2)}</span>
      </div>
      <div class="d-flex justify-content-between mb-3">
        <span>Delivery</span>
        <span class="fw-bold">$${delivery.toFixed(2)}</span>
      </div>
      <div class="d-flex justify-content-between fs-5 fw-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}$</span>
      </div>
      <button onclick="Checkout()" class="btn btn-warning w-100 mt-3">Proceed to Checkout</button>
    </div>`;

  itemcard.innerHTML = show;
}
//update qurity
const Updatequrity = (productId,change) => {
  const item = cardItem.find(i =>  i.id === productId);
  if (item){
    item.qurity += change;
    if(item.qurity<1){
      RemoveCart(productId)
    }else{
      Updatetocard();
    }
  }
} 
//Remove card
const RemoveCart = (productId) => {
  cardItem =cardItem.filter(i => i.id !== productId)
  Updatetocard();
}
//Check out
const Checkout = () => {
  Swal.fire({
  title: "Thank you 🥰",
  icon: "success",
  draggable: true
});
}

