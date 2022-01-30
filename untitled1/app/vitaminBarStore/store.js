"use strict";
/* jshint browser: true */
/*jshint esversion: 6 */
/*jshint sub:true*/
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

const cart = [];

let customerInfo =
    '{\n' +
    '  "phone": "02135689202",\n' +
    '  "customer": {\n' +
    '    "name": "Heo Mi Nhon",\n' +
    '    "dateOfBirth": "1997-02-27",\n' +
    '    "phone": "02135689202",\n' +
    '    "email": "heominhon@gmail.com",\n' +
    '    "deliveryAddress": "24 Eastcoast Road, Auckland",\n' +
    '    "point": 0\n' +
    '  },';


const billInfo = {orderNumber: "HELTHA1038", totalBill: 0};

function getBill() {
    return '"order": { "orderNumber":' + '"' + billInfo.orderNumber + '", "totalBill":' + billInfo.totalBill + '},';
}

function ready() {
    const removeItemsFromCart = document.getElementsByClassName('button-danger');
    for (let i = 0; i < removeItemsFromCart.length; i++) {
        let button = removeItemsFromCart[i];
        button.addEventListener('click', removeCartItemEvent);
    }
    const quantityInput = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }

    const addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('cart-purchase-btn')[0].addEventListener('click', purchaseClicked);


}

function removeCartItemEvent(title) {
    const cartItemName = document.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText === title) {
            cartItemName[i].parentElement.parentElement.remove();
        }
    }
    updateCartTotal();
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        if (item.title == title) {
            cart.splice(i, 1);
        }
    }
}

function quantityChanged(title) {
    const cartItemName = document.getElementsByClassName('cart-item-title');
    let quantity = 0;
    for (let i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText === title) {
            cartItemName[i].getElementsByClassName('cart-quantity-input').value = 1;
            let item = cartItemName[i].parentElement.parentElement.getElementsByClassName('cart-quantity-input')[0].value;
            window.alert(item);
            quantity = item;
        }
    }

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        if (item.title == title) {
            item.quantity = quantity;
        }
    }
    updateCartTotal();
}

function purchaseClicked() {
    let checkCart = document.getElementsByClassName('cart-total')[0];
    let totalElement = checkCart.getElementsByClassName('cart-total-price')[0];
    let total = parseFloat(totalElement.innerText.replace('$', ''));
    if (total === 0) {
        window.alert("Your Cart is empty");
    }
    if (total > 0) {
        window.alert("Thank you for shopping with us");
        window.alert(billInfo.totalBill);;
    }

    let cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();

}

function addToCartClicked(title, itemCode, price) {
    let imageSrc = 'https://data.thefeedfeed.com/static/2019/06/05/15597629795cf81823d037c.jpg';
    let quantity = 1;
    addItemToCart(title, itemCode, price, imageSrc, quantity);
    updateCartTotal();

}

function addItemToCart(title, itemCode, price, imageSrc, quantity) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    const cartItemName = document.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText === title) {
            window.alert('This item is already added to the cart');
            return;
        }
    }
    cartRow.innerHTML = `
<div class="cart-item cart-column ">
    <span class="cart-item-title">${title}</span>
    <span class="cart-item-code">${itemCode}</span>
    
     <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
</div>
  <span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">

    <input id="quantity" class="cart-quantity-input " type="number" value=${quantity} onchange="quantityChanged('${title}')">
    <button class="button button-danger" type="button" onclick="removeCartItemEvent('${title}')">REMOVE</button>
</div>`;

    cartItems.append(cartRow);
    updateCartTotal();
    cart.push({title: title, itemCode: itemCode, quantity: quantity, price: price});
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    billInfo.totalBill = total;
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
    countItems();

}

function openCart() {
    document.getElementById("my-cart").style.display = "block";
}

function closeCart() {
    document.getElementById("my-cart").style.display = "none";
}

function countItems() {
    let cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemsContainer.getElementsByClassName('cart-row');
    let count = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let quantity = parseInt(quantityElement.value);
        count = count + quantity;
    }
    document.getElementById("count").innerText = count;
}


function searchingBeverage(itemName) {
    const xHttp = new XMLHttpRequest();
    xHttp.onload = function () {
        const beverage = JSON.parse(this.responseText);
        let text = "";
        for (const x in beverage) {
            text += beverage[x] + ",";
        }

        const textString = text.split(",");
        let searchingResult = document.getElementsByClassName("result")[0];

        let itemCode = textString[0];
        let name = textString[1];
        let price = textString[2];
        searchingResult.getElementsByClassName("item-name")[0].innerHTML = name;
        searchingResult.getElementsByClassName("item-code")[0].innerHTML = itemCode;
        searchingResult.getElementsByClassName("item-price")[0].innerHTML = price;

    };
    document.getElementById('searching-popup').style.display = "block";
    xHttp.open("GET", "http://localhost:8080/vitamin-bar/" + itemName, true);
    xHttp.send();
}

function closeSearching() {
    document.getElementById('searching-popup').style.display = "none";
}

function getMenu() {
    const xHttp = new XMLHttpRequest();
    xHttp.onload = function () {
        const menus = JSON.parse(this.responseText);
        let bigBig = document.getElementsByClassName('content-session')[0];
        let bigClass = document.getElementsByClassName('big-class')[0];
        for (let i = 0; i < menus.length; i++) {
            let menu = menus[i];

            let mainItemName = document.createElement('h3');
            mainItemName.classList.add('session-header');
            let bigName = menu["typeName"];
            const textNode = document.createTextNode(bigName);
            mainItemName.appendChild(textNode);
            bigClass.appendChild(mainItemName);


            let shopItems = document.createElement('div');
            shopItems.classList.add('shop-items');
            const details = menu.details;
            for (let j = 0; j < details.length; j++) {
                const detail = details[j];
                let text = "";
                for (const x in detail) {
                    text += detail[x] + ",";
                }
                const items = text.split(",");
                let item = document.createElement('div');
                item.classList.add('shop-item');
                let itemCode = items[0];
                let title = items[1];
                let price = items[2];
                item.innerHTML = `
                            <span class="shop-item-title">${title}</span>
                            <span class="shop-item-code">${itemCode}</span>

                            <img class="shop-item-image"
                                src="https://www.dominosugar.com/emshare/views/modules/asset/downloads/originals/2021/07/79150/Brown_Sugar_Hojicha_Boba_Milk_Tea_600x400.jpg/Brown_Sugar_Hojicha_Boba_Milk_Tea_600x400.jpg"
                                    width="300" height="250">

                            <div class="shop-item-detail">
                                <span class="shop-item-price">${price}</span>
                                <button class="button button-primary shop-item-button" type="button" onclick="addToCartClicked('${title}','${itemCode}','${price}')">Add To Cart</button>

                            </div>`;
                shopItems.append(item);
            }
            bigClass.appendChild(shopItems);
        }
        bigBig.appendChild(bigClass);
    };
    xHttp.open("GET", "http://localhost:8080/vitamin-bar");
    xHttp.send();
}

function receiveOrderFromCustomer() {
    const xHttp = new XMLHttpRequest();
    xHttp.open("POST", "http://localhost:8080/store-order/add", true);
    xHttp.setRequestHeader("Accept", "application/json");
    xHttp.setRequestHeader("Content-type", "application/json");
    xHttp.onreadystatechange = function () {
        if (xHttp.readyState === 4) {
            window.alert("Thank you for shopping with us");
            window.alert(xHttp.responseText);
        }
    };
    const payLoad = createPayloadForCustomerOrder();
    xHttp.send(payLoad);
    let cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    for (let i = 0; i < cart.length; i++) {
        cart.pop();
    }
    billInfo.totalBill = 0;
    updateCartTotal();
}

function createItemsForCustomerOrder() {
    let itemText = '"items":[';
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];

        itemText += '{"itemCode": "' + item.itemCode + '","itemName": "' + item.title + '", ' + '"quantity":' + item.quantity + ',"price":' + item.price + '}';
        if (i < cart.length - 1) {
            itemText += ',';
        }
    }
    return itemText + "]}";
}

function createPayloadForCustomerOrder() {
    return customerInfo + getBill() + createItemsForCustomerOrder();
}
