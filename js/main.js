let title = document.getElementById("title");
let priceCalc = document.querySelectorAll(".price input");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.querySelector(".total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.querySelector(".create");
let search = document.getElementById("search");
let mood = "create";
let tmp;

priceCalc.forEach((e) => {
    e.addEventListener("keyup", getTotal)
})

priceCalc.forEach((e) => {
    e.addEventListener("change", getTotal)
})

function getTotal() {
    let result;
    if (price.value != "") {
        result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.textContent = result;
        total.style.backgroundColor = "rgb(0 150 86)";
    } else {
        total.textContent = "";
        total.style.backgroundColor = "#002e4d"
    }
}

let myData;
if (localStorage.products != null) {
    myData = JSON.parse(localStorage.products);
} else {
    myData = [];
}

submit.onclick = () => {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (title.value != "" && price.value != "" && count.value < 101 && category.value != "") {        
        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i <= newProduct.count; i++){
                    myData.push(newProduct);
                }
            } else {
                myData.push(newProduct);
            }
        } else {
            myData[tmp] = newProduct;
            mood = "create";
            submit.textContent = "Create";
            count.style.display = "block";
        }
        clearData()
    }

    localStorage.setItem("products", JSON.stringify(myData));
    clearData()
    showData()
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.textContent = '';
    count.value = '';
    category.value = '';
}

function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < myData.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${myData[i].title}</td>
            <td>${myData[i].price}</td>
            <td>${myData[i].taxes}</td>
            <td>${myData[i].ads}</td>
            <td>${myData[i].discount}</td>
            <td>${myData[i].total}</td>
            <td>${myData[i].category}</td>
            <td><button onclick = 'updateItem(${i})' id="update">update</button></td>
            <td><button onclick = 'deleteItem(${i})' id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tBody").innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");
    if (myData.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${myData.length})</button>`
    } else {
        deleteAll.innerHTML = "";
    }
}
showData()

function deleteItem(i) {
    myData.splice(i, 1);
    localStorage.products = JSON.stringify(myData)
    showData()
}

function deleteAll() {
    localStorage.clear();
    myData = []
    showData()
}

function updateItem(i) {
    title.value = myData[i].title;
    price.value = myData[i].price;
    taxes.value = myData[i].taxes;
    ads.value = myData[i].ads;
    discount.value = myData[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = myData[i].category;
    submit.textContent = 'Update';
    mood = "update";
    tmp = i
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

let searchMood = "Title";

function getSearchMood(value) {
    let search = document.getElementById("search");
    if (value == "searchTitle") {
        searchMood = "Title";
    } else {
        searchMood = "Category"
    }
    search.placeholder = `Search By ${searchMood}`;
    search.focus();
    search.value = '';
    searchData(value);
    showData();
}

function searchData(value) {
    table = "";
    for (let i = 0; i < myData.length; i++){
        if (searchMood == "Title") {
            if (myData[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${myData[i].title}</td>
                        <td>${myData[i].price}</td>
                        <td>${myData[i].taxes}</td>
                        <td>${myData[i].ads}</td>
                        <td>${myData[i].discount}</td>
                        <td>${myData[i].total}</td>
                        <td>${myData[i].category}</td>
                        <td><button onclick = 'updateItem(${i})' id="update">update</button></td>
                        <td><button onclick = 'deleteItem(${i})' id="delete">Delete</button></td>
                    </tr>
                    `
            }
        } else {
            if (myData[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${myData[i].title}</td>
                        <td>${myData[i].price}</td>
                        <td>${myData[i].taxes}</td>
                        <td>${myData[i].ads}</td>
                        <td>${myData[i].discount}</td>
                        <td>${myData[i].total}</td>
                        <td>${myData[i].category}</td>
                        <td><button onclick = 'updateItem(${i})' id="update">update</button></td>
                        <td><button onclick = 'deleteItem(${i})' id="delete">Delete</button></td>
                    </tr>
                    `
            }
        }
    }
    document.getElementById("tBody").innerHTML = table;
}






// get Total == done
// create product == done
// save localStorage == done
// clear inputs == done
// read == done
// count == done
// delete == done
// update == done
// search == done
// clean data == done