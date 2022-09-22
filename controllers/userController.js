const express = require('express')
const User = require('./../model/usermodel')
const jwt = require('jsonwebtoken')
const Product = require('../model/adminmodels/product')

const process = require('process')
const { fail } = require('assert')
const { syncBuiltinESMExports } = require('module')
// const signIntoken = id => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
// }

exports.indexRouter = async function (req, res, next) {
  const product = await Product.find().lean()
  // console.log(product)
  userLoggedIn = req.session.loggedIn
  res.render('index1', { userLoggedIn, product })
}

exports.toLogin = function (req, res, next) {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('login', { noHeaders: true })
  }
}
exports.toregister = function (req, res, next) {
  res.render('signup', { noHeaders: true })
}
exports.toLogout = function (req, res, next) {
  req.session.loggedIn = false;
  res.redirect('/')
}


//...........................................................................................//
//user signup

exports.createUser = async (req, res) => {
  try {

    // Get user input
    const { name, email, password, repeatpassword } = req.body;

    // Validate user input
    if (!(name && email && password && repeatpassword)) {
      res.status(400).send("All input is required");
    }

    if ((req.body.password != req.body.repeatpassword)) {
      res.status(400).send("Please Enter Correct Password")
    }



    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //console.log(token)
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      repeatpassword: req.body.repeatpassword

    })
    newUser.save()
    // console.log(newUser)
    req.session.id = newUser._id
    req.session.loggedIn = true;
    res.redirect("/")
  }

  catch (err) {
    //res.status(404).json({ status: 'fail', message: 'Somethin wrong' });
    res.redirect('/')
  }

}



//.....................................................................................//
//signin a user

exports.signin = async (req, res) => {
  try {
    // Get user input

    const { email, password } = req.body
    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email })
    //console.log(user)


    if (!user || !(await user.correctPassword(password, user.password))) {

      return res.status(401).json({
        status: 'fail',
        message: err
      })

    }
    if (user.status == true) {
      req.session.id = user._id
      req.session.loggedIn = true;
      return res.redirect('/')
    } res.send('You Are Blocked')

  }
  catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: err,
    })

  }

}
//.....................................................................................................//
//get product details
exports.getProductDetail = async function (req, res, next) {



  id = req.params.id

  const productdetail =
    await Product.findOne({ _id: id }).lean()

  console.log("prod detail", productdetail)


  res.render('product-detail', { productdetail })
}