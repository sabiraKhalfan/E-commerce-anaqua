const express = require('express')
const mongoose = require('mongoose');
const catg = require('./../model/adminmodels/add_category');
const User = require('../model/usermodel');
const product = require('../model/adminmodels/product');
const Cart = require('../model/cartModel');
const wishlist = require('../model/wishlistModel')





module.exports = {
    getwishlist: async (req, res) => {
        userId = req.session.userId
        wishlistDatas = await wishlist.findOne(
            { userId: userId }
        ).populate("products.productId").lean()
        console.log(wishlistDatas)

        res.render('wishlist')

    },
    addWishlist: async (req, res) => {
        if (!req.session.loggedIn) {
            return res.json({ logged: false })
        }
        productId = req.body.productId
        let userId = req.session.userId

        console.log(userId, "userIdiddddddddddddddddddddddddddddddddddddddddddddddddd")
        console.log(productId, "productId")
        const wishlistData = await wishlist.findOne({ userId: userId }).lean()
        if (wishlistData) {


            productExist = await wishlist.findOne({ userId: userId, "products.productId": productId })
            if (productExist)
                console.log("ethiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
            return res.json({ message: "product already added to wishlist" })
            await wishlist.findOneAndUpdate({ userId: userId }, { $push: { products: { productId: productId } } });
        }

        else {
            await wishlist.create({ userId: userId, products: { productId: productId } })
        }


        wishlistData = await wishlist.findOne({ userId: userId }).populate("products.productId").lean()
        console.log(wishlistdata, "data")
        price = (wishlistData.products[0].productId.amount - wishlistData.products[0].productId.discount)
        // console.log(price)

        // await wishlist.updateOne({ userId: userId, "products.productId": productId }, { "products.$.price": price })


        // res.json({ message: 'success', wishlist: wishlistData })
        // delete: async (req, res) => {
        //     productId = req.body.product
        //     userId = req.session.userId
        //     console.log("hi from delete", req.session)
        //     deletes = await wishlist.updateOne({ userId: userId }, { $pull: { products: { productId: req.body.product } } })
        //    res.json({})
        // }
    }
}