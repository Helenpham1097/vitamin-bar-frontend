"use strict";
/* jshint browser: true */
/*jshint esversion: 6 */
/*jshint sub:true*/
/*globals $:false */
$(document).ready(function () {


    $.get("http://localhost:8080/vitamin-bar/allMainBeverageName", function (data) {
        let firstType=data[0];
        for (let i = 0; i < data.length; i++) {
            let beverageName = data[i];
            $(".menu-btns").append('<button class="menu-btn" >' + beverageName + '</button>');
        }
        $.get('http://localhost:8080/vitamin-bar/get-details/'+firstType, function (data) {
            let allItems = '';
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let itemCode = item["itemCode"];
                let itemTitle = item["name"];
                let itemPrice = item["price"];
                allItems +=
                    ' <div class="shop-item">\n' +
                    '                <span class="shop-item-title">' + itemTitle + '</span>\n' +
                    '                <span class="shop-item-code">' + itemCode + '</span>\n' +
                    '                <img class="shop-item-image"\n' +
                    '                     src="https://media.istockphoto.com/photos/fruit-juice-picture-id155376375?k=20&m=155376375&s=612x612&w=0&h=xvxdLKu8FQHp0zxAyxD26Nq8MLLsWee7oN7cqJy9KT0="\n' +
                    '                     width="400" height="250">\n' +
                    '                <div class="shop-item-detail">\n' +
                    '                    <span class="shop-item-price">' + itemPrice + '</span>\n' +
                    '                    <button class="button button-primary shop-item-button"\n' +
                    '                            onclick="addToCartClicked('+itemTitle+','+itemCode+','+itemPrice+')">Add To Cart\n' +
                    '                    </button>\n' +
                    '                </div>\n' +
                    '            </div>';
            }
            $('.menu-bottom').append(allItems);
        });
    });




    $(".menu-btns").on('click', '.menu-btn', function () {
        let type = $(this).text();
        $('.menu-bottom').children('.shop-item').remove();
        $.get("http://localhost:8080/vitamin-bar/get-details/"+type, function (data) {
            let allItems = '';
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let itemCode = item["itemCode"];
                let itemTitle = item["name"];
                let itemPrice = item["price"];
                allItems +=
                    ' <div class="shop-item">\n' +
                    '                <span class="shop-item-title">' + itemTitle + '</span>\n' +
                    '                <span class="shop-item-code">' + itemCode + '</span>\n' +
                    '                <img class="shop-item-image"\n' +
                    '                     src="https://media.istockphoto.com/photos/fruit-juice-picture-id155376375?k=20&m=155376375&s=612x612&w=0&h=xvxdLKu8FQHp0zxAyxD26Nq8MLLsWee7oN7cqJy9KT0="\n' +
                    '                     width="400" height="250">\n' +
                    '                <div class="shop-item-detail">\n' +
                    '                    <span class="shop-item-price">' + itemPrice + '</span>\n' +
                    '                    <button class="button button-primary shop-item-button"\n' +
                    '                            onclick="addToCartClicked(' + itemTitle + ',' + itemCode + ',' + itemPrice + ')">Add To Cart\n' +
                    '                    </button>\n' +
                    '                </div>\n' +
                    '            </div>';
            }
            $('.menu-bottom').append(allItems);
        });
    });
});
;