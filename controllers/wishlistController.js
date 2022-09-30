const express = require('express')
const mongoose = require('mongoose');
const catg = require('./../model/adminmodels/add_category');
const User = require('../model/usermodel');
const product = require('../model/adminmodels/product');
const Cart = require('../model/cartModel');
const Wishlist = require('../model/wishlistModel')





module.exports = {
    getwishlist: async (req, res) => {
        const userId = req.session.userId
        wishlistDatas = await Wishlist.findOne(
            { userId: userId }
        ).populate("products.productId").lean()
        console.log(wishlistDatas)

        res.render('wishlist', { wishlistDatas })

    },
    addWishlist: async (req, res) => {
        if (!req.session.loggedIn) {
            return res.json({ logged: false })
        }
        const productId = req.body.productId
        let userId = req.session.userId


        const wishlistItem = await Wishlist.findOne({ userId: req.session.userId }).lean()
        if (wishlistItem) {

            productExist = await Wishlist.findOne({ userId: userId, "products.productId": productId })
            if (productExist)

                return res.json({ message: "product already added to wishlist" })

            console.log("ethiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
            await Wishlist.findOneAndUpdate({ userId: userId }, { $push: { products: { productId: productId } } });
        }

        else {
            await Wishlist.create({ userId: userId, products: { productId: productId } })
        }

        const wishlistData = await Wishlist.findOne({ userId: req.session.userId }).populate("products.productId").lean()

        console.log(wishlistData, "data")

        const price = (wishlistData.products[0].productId.price - wishlistData.products[0].productId.discount)
        console.log(price)

        await Wishlist.updateOne({ userId: userId, "products.productId": productId }, { "products.$.price": price })


        res.json({ message: 'success', wishlist: wishlistData })
        // delete: async (req, res) => {
        //     productId = req.body.product
        //     userId = req.session.userId
        //     console.log("hi from delete", req.session)
        //     deletes = await wishlist.updateOne({ userId: userId }, { $pull: { products: { productId: req.body.product } } })
        //    res.json({})
        // }
    }
}