const { ipcRenderer } = require("electron");

const addToCartBtn = document.getElementById("addToCartBtn");
const cart_food_info = document.getElementById("cart_food_info");
const add_on_table = document.getElementById("add_on_table");
const addOnTable = document.querySelector("#add_on_table");

addOnTable.addEventListener("click", (e) => {
  const targetEl = e.target;

  if (e.target.classList.contains("cart-quantity-input")) {
    const price = targetEl.parentElement.nextElementSibling.textContent;
    const quantity = targetEl.value;

    totalPrice = price * quantity;
    console.log(totalPrice);
    targetEl.parentElement.lastElementChild.innerHTML = totalPrice;
    console.log(targetEl.parentElement.lastElementChild.value);
  }
});

//price quantity calculation
function calculatePriceQty() {
  const priceElement = document.querySelector("#cart_food_info #product_price");
  const quantityElement = document.querySelector(
    "#cart_food_info #quantity_input"
  );
  const total_price = document.querySelector("#cart_food_info #total_price");

  let price = parseInt(priceElement?.textContent);
  let quantity = parseInt(quantityElement?.value);
  let total = price * quantity;

  total_price.innerHTML = total;
}

//get total price of varient
function getTotalPrice() {
  let price = document.getElementById("addonPriceId").innerHTML;
  let quantity = document.getElementById("quantity").value;
  let totalPrice = document.querySelector("#addonTotalId");
  let total = price * quantity;
  totalPrice.innerHTML = total;
}

addToCartBtn.addEventListener("click", () => {});

function getPriceByVarient() {
  var proportion = document.getElementById("mySelect").value;
  var price = document.getElementById("product_price");
  if (proportion == "1:1") {
    price.innerHTML = proportion;
  } else if (proportion == "1:3") {
    price.innerHTML = proportion;
  } else {
    price.innerHTML = proportion;
  }
}

ipcRenderer.on("foodVarientResultSent", (evt, results) => {
  console.log("foodVarientResultSent", results);
  var tr = "";
  tr = `

      <tr>
        <td >${results[0].product_name}</td>
        <td><input id="quantity_input" class="cart-quantity-input" type="number" value="1" style="width: 5em" onchange=calculatePriceQty()></td>

        <td class="dropdown">
          <select class="form-select" id="mySelect" onchange=getPriceByVarient() aria-label="Default select example">
            
          ${results.map((food) => {
            return `<option value=${food.price}>${food.name}</option>`;
          })}
         
          </select>          
        </td>       
        <td id="product_price">${results[0].price}</td>
        <td id="total_price">${results[0].price}</td>  
      </tr>      
    `;

  cart_food_info.innerHTML = tr;
});

ipcRenderer.on("addOnResultSent", (evt, results) => {
  add_on_table.innerHTML = "";
  var tr = "";

  results.map((x) => {
    tr += `<tr>
          <td>${x.add_on_name}</td>
          <td><input id="quantity" class="cart-quantity-input" type="number" value="1" style="width: 5em"></td>
          <td class="add_on_priceId">${x.price}</td>
          <td class="total_price">${x.price}</td>

        </tr>`;
  });
  add_on_table.innerHTML += tr;
});
