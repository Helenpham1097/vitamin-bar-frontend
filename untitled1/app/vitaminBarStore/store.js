"use strict";
/* jshint browser: true */
/*jshint esversion: 6 */
/*jshint sub:true*/
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// const cart = [];
// const customerInfo = [{"name": "Rose",
//     "dateOfBirth": "1997-02-27",
//     "phone": "0377930451",
//     "email": "roserose@gmail.com",
//     "deliveryAddress": "2 Spencer Road, Auckland",
//     "point": 0}];
// let totalBill =0;
// const billInfo = [{"orderNumber":"THTR10030810", "total": totalBill}];


//$(document).ready(ready());

function ready() {
    // const removeItemsFromCart = document.getElementsByClassName('button-danger');
    // for (let i = 0; i < removeItemsFromCart.length; i++) {
    //     let button = removeItemsFromCart[i];
    //     button.addEventListener('click', removeCartItemEvent);
    // }
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

    const addToCartFromSearching = document.getElementsByClassName('add-btn-from-searching');
    for (let i = 0; i < addToCartFromSearching.length; i++) {
        let button = addToCartFromSearching[i];
        button.addEventListener('click', addToCartClickedFromSearching);
    }

    document.getElementsByClassName('cart-purchase-btn')[0].addEventListener('click', purchaseClicked);


}

// function ready{// $('cart-purchase-btn-id').click(function () {
//     $.post("https://reqres.in/api/users/", {
//         data: createPurchasePostPayload(),
//         function(status) {
//             window.alert(status);
//         }
//     })
// });}


function removeCartItemEvent(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

// function removeCartItemEvent(itemName) {
//     let buttonClicked = event.target;
//     buttonClicked.parentElement.parentElement.remove();
//     updateCartTotal();
// }

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function purchaseClicked() {
    // let checkCart = document.getElementsByClassName('cart-items')[0];
    // let x;
    // if(checkCart.value === x){
    //     window.alert("Empty Cart");
    // }
    // if(checkCart.value!== x){
    //     window.alert("lala");
    // }

    let checkCart = document.getElementsByClassName('cart-total')[0];
    let totalElement = checkCart.getElementsByClassName('cart-total-price')[0];
    let total = parseFloat(totalElement.innerText.replace('$', ''));
    if (total === 0) {
        window.alert("Your Cart is empty");
    }
    if (total > 0) {
        window.alert("Thank you for shopping with us");
    }

    let cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();

}

function addToCartClicked(title, price) {
    // const details = item.split(',');
    // let title = details[0];
    // let price = details[1];
    let imageSrc = 'https://data.thefeedfeed.com/static/2019/06/05/15597629795cf81823d037c.jpg';
    let quantity = 1;
    addItemToCart(title, price, imageSrc, quantity);
    updateCartTotal();
}

// function addToCartClicked(event) {
// let buttonClicked = event.target;
// let shopItem = buttonClicked.parentElement.parentElement;
// let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
// let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
// let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
// let quantity=1;
// addItemToCart(title, price, imageSrc, quantity);
// updateCartTotal();
// }

function addToCartClickedFromSearching(event) {
    let buttonClicked = event.target;
    let itemFound = buttonClicked.parentElement.parentElement;
    let itemName = itemFound.getElementsByClassName('item-name')[0].innerText;
    let price = itemFound.getElementsByClassName('item-price')[0].innerText;
    let quantity = parseInt(itemFound.getElementsByClassName('cart-quantity-input')[0].value);
    let image = itemFound.getElementsByClassName('item-image')[0].src;
    addItemToCart(itemName, price, image, quantity);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc, quantity) {
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
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
  <span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">

    <input class="cart-quantity-input " type="number" value=${quantity}>
    <button class="button button-danger" type="button">REMOVE</button>
</div>`;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("button-danger")[0].addEventListener('click', removeCartItemEvent);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', quantityChanged);
  //  cart.push({title: title, quantity:quantity, price: price});
    // window.alert(cart[1].title);
    // window.alert(totalBill);
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
        // window.alert(quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
    countItems();
    // totalBill = totalBill+total;

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

        let name = textString[1];
        let price = textString[2];
        searchingResult.getElementsByClassName("item-name")[0].innerHTML = name;
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
                let title = items[1];
                let price = items[2];
                item.innerHTML = `
                            <span class="shop-item-title">${title}</span>

                            <img class="shop-item-image"
                                src="https://www.dominosugar.com/emshare/views/modules/asset/downloads/originals/2021/07/79150/Brown_Sugar_Hojicha_Boba_Milk_Tea_600x400.jpg/Brown_Sugar_Hojicha_Boba_Milk_Tea_600x400.jpg"
                                    width="300" height="250">

                            <div class="shop-item-detail">
                                <span class="shop-item-price">${price}</span>
                                <button class="button button-primary shop-item-button" type="button" onclick="addToCartClicked('${title}','${price}')">Add To Cart</button>

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

function receiveOrderFromCustomer(phone, customerInfo) {
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
}

function createPayLoadForCustomerOrder(phone){

}