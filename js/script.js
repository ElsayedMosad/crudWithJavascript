// Inputs
const title = document.getElementById("title");

const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");

const count = document.getElementById("count");
const category = document.getElementById("category");

const total = document.getElementById("total");

// Buts
const create = document.getElementById("create");
const sTitle = document.getElementById("s-title");
const sCategory = document.getElementById("s-category");

const search = document.getElementById("search");
const tBody = document.getElementById("tbody");

const deleteAll = document.getElementById("delete-all");

// global variable
let updateMood = false;
let updateIndex;

let searchMood = "title";

let arrOfData = [];

// Get Total Value Inputs

function getTotalValue() {
  document.querySelectorAll(".values-inputs input").forEach((e) => {
    e.addEventListener("mouseup", calcTotal);
    e.addEventListener("keyup", calcTotal);
  });
}

function calcTotal() {
  if (price.value !== "") {
    let totalValue = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerText = totalValue;
    total.style.cssText = `background-color: rgb(23, 84, 15);`;
  } else {
    total.innerText = "";
    total.style.cssText = `background-color: rgb(111, 19, 19);`;
  }
}
getTotalValue();

if (localStorage.dataProducts) {
  arrOfData = JSON.parse(localStorage.dataProducts);
  createTrProduct();
}

create.addEventListener("click", () => {
  if (title.value !== "" && price.value !== "" && count.value < 100 && count.value != "0" && category.value !== "") {
    nums = count.value ? count.value : 1;
    let objDataItem = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.textContent,
      category: category.value,
      // total: +price.value + +taxes.value + +ads.value - +discount.value,
    };
    if (!updateMood) {
      for (let i = 0; i < nums; i++) {
        arrOfData.push(objDataItem);
      }
    } else {
      arrOfData[updateIndex] = objDataItem;
      create.textContent = `create`;
      count.style.cssText = `display: block`;
    }
    createTrProduct();
    playDeleteAll();
    clearInputs();
    addToLocalStorage();
  }
});

function createTrProduct() {
  tBody.innerHTML = ``;
  let i = 0;
  let length = arrOfData.length;
  while (i < length) {
    let trProduct = document.createElement("tr");
    trProduct.innerHTML = `
      <td>${i + 1}</td>
      <td>${arrOfData[i].title}</td>
      <td>${arrOfData[i].price}</td>
      <td>${arrOfData[i].taxes}</td>
      <td>${arrOfData[i].ads}</td>
      <td>${arrOfData[i].discount}</td>
      <td>${arrOfData[i].total}</td>
      <td>${arrOfData[i].category}</td>
      <td><button onclick = "updateProduct (${i})" class="update">update</button></td>
      <td><button onclick = "deleteProduct (${i})" class="delete">delete</button></td>
      `;
    trProduct.setAttribute("data-id", i + 1);
    tBody.appendChild(trProduct);
    i++;
  }
}

function addToLocalStorage() {
  localStorage.setItem("dataProducts", JSON.stringify(arrOfData));
}

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.textContent = "";
  count.value = "";
  category.value = "";
  total.style.cssText = `background-color: rgb(111, 19, 19);`;
}

function deleteProduct(index) {
  arrOfData.splice(index, 1);
  createTrProduct();
  playDeleteAll();
  addToLocalStorage();
}

function updateProduct(index) {
  title.value = arrOfData[index].title;
  price.value = arrOfData[index].price;
  taxes.value = arrOfData[index].taxes;
  ads.value = arrOfData[index].ads;
  discount.value = arrOfData[index].discount;
  total.textContent = arrOfData[index].total;
  category.value = arrOfData[index].category;
  calcTotal();
  create.textContent = `update`;
  count.style.cssText = `display: none`;
  updateIndex = index;
  updateMood = true;
}

function playDeleteAll() {
  if (tBody.querySelectorAll("tr").length) {
    deleteAll.style.cssText = `display: block`;
    deleteAll.querySelector("span").textContent = arrOfData.length;
  } else {
    deleteAll.style.cssText = `display: none`;
  }
}

playDeleteAll();

deleteAll.addEventListener("click", () => {
  tBody.innerHTML = ``;
  arrOfData = [];
  localStorage.clear();
  deleteAll.style.cssText = `display: none`;
});



search.addEventListener("keyup", () => {
  searchData(search.value);
});


sTitle.addEventListener("click", () => {
  if (searchMood == "category" && search.value.length) {
    search.value = ``;
    createTrProduct();
  }
  searchMood = "title";
  search.placeholder = `search by title`;
});
sCategory.addEventListener("click", () => {
  if (searchMood == "title" && search.value.length) {
    search.value = ``;
    createTrProduct();
  }
  searchMood = "category";
  search.placeholder = `search by category`;
});


function searchData(value) {
  tBody.innerHTML = ``;
  let i = 0;
  let length = arrOfData.length;
  while (i < length) {
    if (searchMood == "title") {
      if (arrOfData[i].title.toLowerCase().includes(value.toLowerCase())) {
        let trProduct = document.createElement("tr");
        trProduct.innerHTML = `
          <td>${i + 1}</td>
          <td>${arrOfData[i].title}</td>
          <td>${arrOfData[i].price}</td>
          <td>${arrOfData[i].taxes}</td>
          <td>${arrOfData[i].ads}</td>
          <td>${arrOfData[i].discount}</td>
          <td>${arrOfData[i].total}</td>
          <td>${arrOfData[i].category}</td>
          <td><button onclick = "updateProduct (${i})" class="update">update</button></td>
          <td><button onclick = "deleteProduct (${i})" class="delete">delete</button></td>
          `;
        trProduct.setAttribute("data-id", i + 1);
        tBody.appendChild(trProduct);
      }
    } else {
      if (arrOfData[i].category.toLowerCase().includes(value.toLowerCase())) {
        let trProduct = document.createElement("tr");
        trProduct.innerHTML = `
          <td>${i + 1}</td>
          <td>${arrOfData[i].title}</td>
          <td>${arrOfData[i].price}</td>
          <td>${arrOfData[i].taxes}</td>
          <td>${arrOfData[i].ads}</td>
          <td>${arrOfData[i].discount}</td>
          <td>${arrOfData[i].total}</td>
          <td>${arrOfData[i].category}</td>
          <td><button onclick = "updateProduct (${i})" class="update">update</button></td>
          <td><button onclick = "deleteProduct (${i})" class="delete">delete</button></td>
          `;
        trProduct.setAttribute("data-id", i + 1);
        tBody.appendChild(trProduct);
      }
    }
    i++;
  }
}


// console.log(JSON.parse(localStorage.getItem("dataPro")))
