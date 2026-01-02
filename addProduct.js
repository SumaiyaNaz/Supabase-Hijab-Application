import supabase from "./config.js";

//Add product
let pname = document.getElementById("pname");
let pcategory = document.getElementById("pcategory");
let pprice = document.getElementById("pprice");
let pimage = document.getElementById("pimage");
let pdesc = document.getElementById("pdesc");
let addColor = document.getElementById("addColor");
let colorGroup = document.getElementById("colorGroup");
let pForm = document.getElementById("pForm");

// console.log(pForm , pcategory , pdesc , pimage , pname , pprice , addColor , colorGroup);

//Color div where color will show when we add color
addColor.addEventListener("click", () => {
    
  let div = document.createElement("div");
  div.className = "color-field";
  div.innerHTML = `<div class = 'row'>
      <div class="col-md-6 mb-3">
                <input type="color" class="colorInput" id="pcolor" name="price">
                </div>
                   <div class="col-md-6 mb-3">
                <button class ='btn btn-primary ' type="button" id='removeColor' class = >✕</button>
                   </div>
                </div>`;
    colorGroup.appendChild(div);
    div.querySelector('#removeColor').addEventListener('click', ()=> {
        div.remove();
    })
});

let imgUrl ;

//Function for uploading file to storage in supabase
async function uploadfile(f) {
    let fileName = `${Date.now()} - ${f?.name}`;
    //console.log(fileName);
    
    try {
    const { data, error } = await supabase
  .storage
  .from('Products')
  .upload(fileName, f)
  if (data) {
    const { data:uploadData} = supabase
  .storage
  .from('Products')
  .getPublicUrl(data.path)
  if (uploadData) {
    imgUrl = uploadData.publicUrl
  }
  }
  
  else{
    console.log('There is an error.');
  }
    } catch (error) {
        console.log(error);
    }
    return imgUrl;
}

//uploadfile()

async function addProduct(e) {
    e.preventDefault();
    let pcolor = document.querySelectorAll('.colorInput');

    let colorsArr = [];
    pcolor.forEach((inp)=>{
        if(inp.value.trim() !== ''){
            colorsArr.push(inp.value)
        }
        console.log(colorsArr)
    })

    let imageadd = await uploadfile(pimage.files[0]);

    try {
        const { error } = await supabase.from("ProductCards").insert({
      name: pname.value,
      category: pcategory.value,
      price: pprice.value,
      description: pdesc.value,
      colors: colorsArr,
      imageUrl: imageadd,
    });
    if (error) {
      console.log(error);
    } else {
      alert("Product added successfully");
    }
    } catch (error) {
      console.log('Error in adding product to table ' + error);
        
    }
    
}

pForm.addEventListener("submit", addProduct);