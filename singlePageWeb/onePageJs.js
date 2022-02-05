"use strict";
/* jshint browser: true */
/*jshint esversion: 6 */
/*jshint sub:true*/
/*globals $:false */

const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const header = document.querySelector('.header .container');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');

hamburger.addEventListener('click',()=> {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', ()=>{
    let scroll_position = window.scrollY;
    if(scroll_position>250){
        header.style.backgroundColor ='#29323c';
    }
    else {
        header.style.backgroundColor ='transparent';
    }
});

// document.addEventListener('click',()=>{
//     mobile_menu.animate()
// })

menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
});

$(document).ready(function () {
    $("a").on('click', function (event) {
        if(this.hash !==""){
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().left
            }, 300, function () {
                window.location.hash=hash;
            });
        }
    });
});



