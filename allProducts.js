import supabase from "./config.js";

let productsList = document.getElementById("products");

async function renderProducts() {
  try {
    const { data, error } = await supabase.from("ProductCards").select("*");
    if (data) {
      console.log(data);

      data.forEach((product) => {
        productsList.innerHTML += `<div class="card col-md-6" style="width: 18rem;" >
  <img src="${product.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.description}</p>
    <div class="colors">
    ${product.colors.map((color) => {
        console.log(color);
        return `<div style="background-color:${color}; height:20px; width:20px" ></div>`;
      })
      .join("")}

  </div>
    <button  class="btn btn-primary" onclick="window.location.href='productDetail.html?id=${
      product.id
    }'">view Details</button>
  </div>
</div>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

renderProducts()
