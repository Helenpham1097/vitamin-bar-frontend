"use strict";
/* jshint browser: true */
/*jshint esversion: 6 */
/*jshint sub:true*/
/*globals $:false */

// const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
// const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
// const header = document.querySelector('.header .container');
// const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');

// hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('active');
//     mobile_menu.classList.toggle('active');
// });
//
// document.addEventListener('scroll', () => {
//     let scroll_position = window.scrollY;
//     if (scroll_position > 250) {
//         header.style.backgroundColor = '#29323c';
//     } else {
//         header.style.backgroundColor = 'transparent';
//     }
// });

// document.addEventListener('click',()=>{
//     mobile_menu.animate()
// })

// menu_item.forEach((item) => {
//     item.addEventListener('click', () => {
//         hamburger.classList.toggle('active');
//         mobile_menu.classList.toggle('active');
//     });
// });

// $(document).ready(function () {
//     $('a').on('click', function (event) {
//         if (this.hash !== "") {
//             event.preventDefault();
//             let hash = this.hash;
//             $('html, body').animate({
//                 scrollTop: $(hash).offset().top
//             }, 300, function () {
//                 window.location.hash = hash;
//             });
//         }
//     });
// });


function countItemsInCart() {
    let itemsInCart = $('.cart-items').find('.cart-row');
    let count = 0;
    for (let i = 0; i < itemsInCart.length; i++) {
        let item = itemsInCart[i];
        let quantity = parseInt($(item).find('.cart-quantity-input').val());
        count += quantity;
    }
    if (count !== 0) {
        $('.badge').show();
        $('.badge').text(count);

    } else {
        $('.badge').hide();
    }

}

function openCart() {
    $("#my-cart").show();
}

function closeCart() {
    $("#my-cart").hide();
}

function addToCartCLick(itemTitle, itemCode, itemPrice) {
    let quantity = 1;
    addItemToCart(itemTitle, itemCode, itemPrice, quantity);
    updateCartTotal();
}

function addItemToCart(title, itemCode, price, quantity) {
    let cartItems = $('.cart-items');
    const cartItemName = $('.cart-item-title');
    for (let i = 0; i < cartItemName.length; i++) {
        if ($(cartItemName[i]).text() === title) {
            window.alert('This item is already added to the cart');
            return;
        }
    }
    cartItems.append(`<div class="cart-row">
                            <div class="cart-item cart-column ">
                                <span class="cart-item-title">${title}</span>
                                <span class="cart-item-code">${itemCode}</span>
                            </div>
                            <span class="cart-price cart-column">${price}</span>
                            <div class="cart-quantity cart-column">
                                <input id="quantity" class="cart-quantity-input " type="number" value=${quantity} onchange="quantityChanged('${title}')">
                                <button class="button button-danger" type="button" onclick="removeCartItemEvent('${title}')">REMOVE</button>
                            </div>
                        </div>`);
    updateCartTotal();
}

function quantityChanged(title) {
    const cartItemName = $('.cart-item-title');
    let quantity = 0;
    for (let i = 0; i < $('.cart-item-title').length; i++) {
        if ($(cartItemName[i]).text() === title) {
            let item = $(cartItemName[i]).parent().parent().find('.cart-quantity-input').val();
            // window.alert($(cartItemName[i]).parent().parent().find('.cart-quantity-input'));
            // window.alert(item);
            quantity = item;
        }
    }

    // for (let i = 0; i < cart.length; i++) {
    //     const item = cart[i];
    //     if (item.title == title) {
    //         item.quantity = quantity;
    //     }
    // }
    updateCartTotal();
}

function removeCartItemEvent(title) {
    for (let i = 0; i < $('.cart-item-title').length; i++) {
        if ($($('.cart-item-title')[i]).text() === title) {
            $($('.cart-item-title')[i]).parent().parent().remove();
        }
    }
    updateCartTotal();
    // for (let i = 0; i < cart.length; i++) {
    //     const item = cart[i];
    //     if (item.title == title) {
    //         cart.splice(i, 1);
    //     }
    // }
}

function updateCartTotal() {
    let cartRows = $('.cart-items').find('.cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let price = parseFloat($(cartRow).find('.cart-price').text());
        let quantity = $(cartRow).find('.cart-quantity-input').val();
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    $('.cart-total-price').text('$' + total);
    countItemsInCart();
}

$(document).ready(function () {


    $.get("http://localhost:8080/vitamin-bar/allMainBeverageName", function (data) {
        let firstType = data[0];
        for (let i = 0; i < data.length; i++) {
            let beverageName = data[i];
            $(".menu-btns").append('<button class="menu-btn" >' + beverageName + '</button>');
        }
        $.get('http://localhost:8080/vitamin-bar/get-details/' + firstType, function (data) {
            let allItems = '';
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let itemCode = item["itemCode"];
                let itemTitle = item["name"];
                let itemPrice = item["price"];
                allItems +=
                    `<div class="shop-item">
                            <span class="shop-item-title">${itemTitle}</span>
                            <span class="shop-item-code">${itemCode}</span>

                            <img class="shop-item-image"
                                src="https://media.istockphoto.com/photos/fruit-juice-picture-id155376375?k=20&m=155376375&s=612x612&w=0&h=xvxdLKu8FQHp0zxAyxD26Nq8MLLsWee7oN7cqJy9KT0="
                                    width="300" height="250">

                            <div class="shop-item-detail">
                                <span class="shop-item-price">${itemPrice}</span>
                                <button class="button button-primary shop-item-button" type="button" onclick="addToCartCLick('${itemTitle}','${itemCode}','${itemPrice}')">Add To Cart</button>

                            </div>
                    </div>`;
            }
            $('.menu-bottom').append(allItems);
        });
    });

    // $(".shop-item-detail").on('click', '.shop-item-button', function () {
    //     window.alert($(this).value);
    // });


    $(".menu-btns").on('click', '.menu-btn', function () {
        let type = $(this).text();
        $('.menu-bottom').children('.shop-item').remove();
        $.get("http://localhost:8080/vitamin-bar/get-details/" + type, function (data) {
            let allItems = '';
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let itemCode = item["itemCode"];
                let itemTitle = item["name"];
                let itemPrice = item["price"];
                allItems +=
                    `<div class="shop-item">
                            <span class="shop-item-title">${itemTitle}</span>
                            <span class="shop-item-code">${itemCode}</span>

                            <img class="shop-item-image"
                                src="https://media.istockphoto.com/photos/fruit-juice-picture-id155376375?k=20&m=155376375&s=612x612&w=0&h=xvxdLKu8FQHp0zxAyxD26Nq8MLLsWee7oN7cqJy9KT0="
                                    width="300" height="250">

                            <div class="shop-item-detail">
                                <span class="shop-item-price">${itemPrice}</span>
                                <button class="button button-primary shop-item-button" type="button" onclick="addToCartCLick('${itemTitle}','${itemCode}','${itemPrice}')">Add To Cart</button>

                            </div>
                    </div>`;
            }
            $('.menu-bottom').append(allItems);
        });
    });
});
