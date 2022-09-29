const express = require('express')
const mongoose = require('mongoose');
const catg = require('./../model/adminmodels/add_category');
const User = require('../model/usermodel');
const product = require('../model/adminmodels/product');
const Cart = require('../model/cartModel');
const { response } = require('express');
const total = require('../controllers/cartFunctions/subTotal');
const { request } = require('http');

exports.viewCart = async function (req, res, next) {
    let user_Id = req.session.userId;
    const cart = await Cart.findOne({ userId: user_Id }).populate('products.productId').lean()

    res.render('cart', { cart })
}




//........................................................................................................//

exports.viewShop = async function (req, res, next) {
    res.render('product')
}

//.........................................................................................................//

exports.addTocart = async function (req, res) {
    try {



        let user_Id = req.session.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity
        const data = await product.findById(req.body.productId).lean()
        const total = (data.price * 1) * req.body.quantity
        const oldCart = await Cart.findOne({ userId: user_Id }).populate('products.productId').lean()
        if (oldCart) {
            const oldProduct = oldCart.products.find(e => e.productId._id == req.body.productId)
            if (oldProduct) {
                if (oldProduct.quantity == 1 && req.body.quantity == -1) {
                    await Cart.updateOne({ 'product.productId': req.body.productId }, { "$pull": { 'products.productId': { '_id': oldProduct._id } } })
                    await Cart.findByIdAndUpdate(oldCart._id, { $inc: { finalTotal: total } })

                }
                else {


                    await Cart.updateOne({ userId: req.session.userId, "products.productId": req.body.productId }, { '$inc': { "products.$.quantity": quantity, "products.$.total": total } })
                    await Cart.findByIdAndUpdate(oldCart._id, { $inc: { finalTotal: total } })

                }


            } else {
                const products = {
                    productId: req.body.productId,
                    quantity: req.body.quantity,
                    total: total,
                }

                await Cart.findOneAndUpdate({ userId: user_Id }, { $push: { products }, $inc: { finalTotal: total } })
            }



        } else {

            const products = {
                productId: req.body.productId,
                quantity: req.body.quantity,
                total: total,
            }
            const cart = new Cart({ userId: req.session.userId, products, total: total, finalTotal: total })
            cart.save()

        }
        const newCart = await Cart.findOne({ userId: user_Id }).populate('products.productId').lean()
        return res.status(200).json({ message: "Hurray! Product Added", newCart })

    } catch (error) {

        res.status(401).json({ message: "Oops! Process failed", error: `error is : ${error}` })

    }
}

//.................................................................................................................//
exports.removeProduct = async function (req, res) {
    try {




        const userId = req.session.userId

        const productId = req.body.product

        console.log(productId, "productID");


        await Cart.updateOne({
            userId: userId
        }, {
            $pull: {
                products: {
                    productId: productId
                }
            }
        })



        return res.status(200).json({ message: 'server success' })

    } catch (error) {

        return res.status(401).json({ message: 'server failure' })


    }




}
//...........................................................................................................//
exports.updateQty = async function (req, res, next) {


    const productId = req.body.productId
    console.log(productId)
    let user_Id = req.session.userId;
    console.log(req.session.userId)
    console.log(user_Id)



    const quantity = req.body.quantity

    console.log(quantity, "quantity")



    // console.log(updateqty, "asdfghjgfdsdfghjkhgfdsdfgh")
    await Cart.updateOne({ userId: user_Id, 'products.productId': productId }, { '$inc': { 'products.$.quantity': quantity } })


    const cart = await Cart.findOne({ userId: user_Id, 'products.productId': productId }).populate('products.productId').lean()
    const data = 1;

    // cart.count = cart.products.length

    console.log(cart.count, "cart.count")

    cart.products.forEach(function (element) {
        console.log(element)

        if (element.productId._id == productId) {

            productTotal = element.productId.price * element.quantity;
        }

    })

    console.log(productTotal)
    res.json({ message: 'success', totals: cart, productTotal })


}

//................................................................................................................................//





