import supabase from "./config.js";

// let searchParam = window.location.search;
// console.log(searchParam);

// let pId = searchParam.split('?')[1];
// console.log(pId);

let params = new URLSearchParams(window.location.search);
console.log(params);
let pId = params.get("id");
console.log(pId);

let pCard = document.getElementById("pcard");

async function productRender() {
  try {
    const { data, error } = await supabase
      .from("ProductCards")
      .select("*")
      .eq("id", pId)
      .single();
    if (data) {
      console.log(data);
      pCard.innerHTML = `
        <div class="col-md-6">
        <img src='${data.imageUrl}' width='100'>
        <br>
         <label>Name : </label>
            <h1 class="display-5 fw-bold">${data.name}</h1>
       <label>price: </label>
            <h3 class="text-primary mb-3">${data.price}</h3>
            <label>category: </label>
            <p class="text-muted">${data.category}</p>
<label>description: </label>
            <p class="text-muted">${data.description}</p>
            
            <!-- Selection Options -->
            <div class="mb-4">
            <label class="form-label fw-semibold">Select Color:</label>
            ${data.colors
              .map((color) => {
                return `  
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-dark rounded-circle p-3 b" style="background-color:${color};" ></button>
                   
                </div>`;
              })
              .join("")}
              
            </div>

            <div class="d-flex gap-3 mb-4">
               
                <button onclick="addtocart(${JSON.stringify(data).replace(
                  /"/g,
                  "&quot;"
                )})" class="btn btn-primary px-5 py-2 w-100"><i class="bi bi-cart-plus me-2"></i>Add to Cart</button>
            </div>
            
            <button class="btn btn-outline-danger w-100"><i class="bi bi-heart me-2"></i>Add to Wishlist</button>
        </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}

productRender();

//Offcanvas

window.addtocart = function (data) {
  console.log(data);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);
  let exixt = cart.find((item) => item.id === data.id);
  console.log(exixt);

  if (exixt) {
    exixt.quantity += 1;
  } else {
    cart.push({
      id: data.id,
      price: data.price,
      name: data.name,
      imgUrl: data.imageUrl,
      quantity: 1,
    });
  }

  console.log(cart);
  localStorage.setItem('cart',JSON.stringify(cart))
  alert('item added in cart')

//Showing cart continer in offcanvas
let cartContainer = document.querySelector('.cartContainer');

function cartHandle(){
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach(element => {
        console.log(element);
        
    });
}

cartHandle()

}
 

