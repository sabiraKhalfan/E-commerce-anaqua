const express = require('express')
const User = require('./../model/usermodel')
const jwt = require('jsonwebtoken')
const Product = require('../model/adminmodels/product')

const process = require('process')
const signIntoken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

exports.indexRouter = async function (req, res, next) {
  const product = await Product.find().lean()
  res.render('index1', { userLoggedIn: false, product })
}

exports.toLogin = function (req, res, next) {
  res.render('login')
}
exports.toregister = function (req, res, next) {
  res.render('signup')
}




exports.createUser = async (req, res) => {
  try {

    // Get user input
    const { name, email, password, repeatpassword } = req.body;

    // Validate user input
    if (!(name && email && password && repeatpassword)) {
      res.status(400).send("All input is required");
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
      password: req.body.password,
      repeatpassword: req.body.repeatpassword

    })
    newUser.save()
    console.log(newUser)
    const token = signIntoken(newUser._id);
    User.token = token;
    //console.log(token)
    //console.log('hi');
    res
      .cookie('jwt', token, { expiresIn: process.env.JWT_EXPIRES_IN, httpOnly: true })
      .status(201)
      .json({
        status: 'success',
        token,
        data: {
          user: newUser

        }

      });

    //.render("views/index1")
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }



};




exports.signin = async (req, res) => {
  try {
    // Get user input

    const { email, password } = req.body
    // Validate user input
    //console.log(req.body);
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database

    const user = await User.findOne({ email })
    console.log(user)


    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: err
      })
    }
    //if (user1 && (await bcrypt.compare(password,user1.password))) {
    //console.log(user.password)
    //console.log(user)
    const token = signIntoken(user._id);
    //  console.log(token)
    User.token = token;
    res
      .cookie('jwt', token, { expiresIn: process.env.JWT_EXPIRES_IN, httpOnly: true })
    res.status(200).json({ user });

  }
  catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err
    })

  }

}