const express = require('express')
const User = require('../model/usermodel');


exports.getuserProfile = async function (req, res, next) {

    const userId = req.session.userId

    const user = await User.findOne({ _id: req.session.userId }).lean()

    res.render("userProfile", { user })
}
///.....................................................................................................//

exports.updateProfile = async function (req, res, next) {
    try {
        const userId = req.session.userId

        console.log(req.body.name)

        const ishak = await User.findOneAndUpdate({ _id: req.session.userId }, { $set: { name: req.body.name } })



        const newData = await User.findOne({ _id: req.session.userId })

        res.status(200).json({ message: "success", data: newData })

    }
    catch (error) {

        res.status(401).json({ message: "Oops! Process failed", error: `error is : ${error}` })


    }

}
//............................................................................................................//
