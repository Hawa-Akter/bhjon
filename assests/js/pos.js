const { remote, app, ipcRenderer, ipcMain } = require("electron");

const categoryUl = document.getElementById("category_item");
const foodList = document.getElementById("foods");
const foodByAllCategory = document.getElementById("allCategory");

//different tabs
function pos(evt, posSytem) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(posSytem).style.display = "block";
  evt.currentTarget.className += " active";
}

//sending category id to fetch foods by specific category
function getCategoryId(id) {
  console.log("categoryId", id);
  ipcRenderer.send("categoryId", id);
}

//creating dynamic category on pos page
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("categoryNamesLoaded");
});

ipcRenderer.on("categoryNamesReplySent", function (event, results) {
  results.forEach(function (result) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.textContent = result.name;
    li.appendChild(a);
    li.onclick = () => getCategoryId(result.id);
    categoryUl.appendChild(li);
  });
});
//end of dynamic category on pos page

// displaying food by category
ipcRenderer.on("foodsByCategoryReplySent", (evt, foods) => {
  foodList.innerHTML = "";
  var div = "";

  foods.forEach((food) => {
    div += `
    <div class="card col-md-3" style="width: 12rem; height: 170px; margin: 4px;">
    <img src="${food.product_image}" height="100" width="206" class="card-img-top">
      <div style="text-align: center;"><p><a href="#"  style="text-decoration:none; color:black;" id=${food.id} onclick = {getFoodId(${food.id})}>
      ${food.product_name}
        </a></p>
      </div>
    </div>`;
  });

  foodList.innerHTML += div;
});

// displaying food by all  category
foodByAllCategory.addEventListener("click", () => {
  ipcRenderer.send("foodByALlCategory");
});
ipcRenderer.on("foodsByAllCategoryReplySent", (evt, foods) => {
  foodList.innerHTML = "";
  var div = "";

  foods.forEach((food) => {
    div += `
    <div class="card col-md-3" style="width: 12rem; height: 170px; margin: 4px;">
    <img src="${food.product_image}" height="100" width="206" class="card-img-top">
      <div style="text-align: center;"><p><a href="#"  style="text-decoration:none; color:black;" id=${food.id} onclick = {getFoodId(${food.id})}>
      ${food.product_name}
        </a></p>
      </div>
    </div>`;
  });

  foodList.innerHTML += div;
});
// end of displaying food by all category

// displaying the foods when the page loaded
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("foodOnPageLoaded");
});
ipcRenderer.on("foodOnPageLoadedReplySent", (evt, foods) => {
  foodList.innerHTML = "";
  var div = "";

  foods.forEach((food) => {
    div += `
    <div class="card col-md-3" style="width: 12rem; height: 170px; margin: 4px;">
    <img src="${food.product_image}" height="100" width="206" class="card-img-top">
      <div style="text-align: center;"><p><a href="#"  style="text-decoration:none; color:black;" id=${food.id} onclick = {getFoodId(${food.id})}>
      ${food.product_name}
        </a></p>
      </div>
    </div>`;
  });

  foodList.innerHTML += div;
});
