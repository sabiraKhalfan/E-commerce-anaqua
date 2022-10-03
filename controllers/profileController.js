const express = require('express');
const { BulkCountryUpdatePage } = require('twilio/lib/rest/voice/v1/dialingPermissions/bulkCountryUpdate');
const User = require('../model/usermodel');
const router = require('../routes');
const bcrypt = require('bcrypt')


exports.getuserProfile = async function (req, res, next) {

    const userId = req.session.userId

    const user = await User.findOne({ _id: req.session.userId }).lean()

    res.render("userProfile", { userLoggedIn, user })
}
///.....................................................................................................//

exports.updateProfile = async function (req, res, next) {
    try {
        const userId = req.session.userId

        console.log(req.body.name)

        const data = await User.findOneAndUpdate({ _id: req.session.userId }, { $set: { name: req.body.name } })



        const newData = await User.findOne({ _id: req.session.userId })

        res.status(200).json({ message: "success", data: newData })

    }
    catch (error) {

        res.status(401).json({ message: "Oops! Process failed", error: `error is : ${error}` })


    }

}
//............................................................................................................//
exports.getmanageaddress = function (req, res, next) {
    res.render('manageaddress', { userLoggedIn })
}
//.............................................................................................................
exports.updatepwd = async function (req, res, next) {
    let userId = req.session.userId
    oldpwd = req.body.password
    console.log(userId, "session")
    console.log(oldpwd, "oldpwd")
    let userData = await User.findOne({ _id: req.session.userId })
    console.log(userData, "user")
    let correct = await bcrypt.compare(req.body.password, userData.password)
    console.log(correct, "comparepassword")
    if (correct == true) {
        let newpassword = await bcrypt.hash(req.body.password, 10)
        console.log(newpassword, "newpwd")
        await User.updateOne({ _id: userId }, { $set: { 'password': newpassword } })
    } else {
        console.log("incorrect ")
    }
    res.json({})


}

