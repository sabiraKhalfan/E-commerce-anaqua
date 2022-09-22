const express = require('express')
const mongoose = require('mongoose');
const catg = require('./../model/adminmodels/add_category');
const User = require('../model/usermodel');
const product = require('../model/adminmodels/product');
const Cart = require('../model/cartModel');

exports.viewCart = async function (req, res, next) {
    res.render('cart')
}

exports.viewShop = async function (req, res, next) {
    res.render('product')
}


// exports.addtoCart = async function (req, res, next) {

//     const cartItem = await Cart.findOne().lean()

//     res.render('/cart')
// }

