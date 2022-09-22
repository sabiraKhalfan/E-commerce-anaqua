var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController')
const auth = require('./../middleware/auth')
const protect = require('../middleware/protect')
const cartController = require('./../controllers/cartController')


/* GET users listing. */

router.get('/', userController.indexRouter);


router.route('/login')
    .get(userController.toLogin)
    .post(userController.signin)

router.route('/signup')
    .get(userController.toregister)
    .post(userController.createUser);

router.route('/logout')
    .get(userController.toLogout)

router.route('/cart')
    .get(cartController.viewCart)

router.route('/shop')
    .get(cartController.viewShop)

router.get('/product_detail/:id', userController.getProductDetail)
//router.get('/add-to-cart/:id', cartController.getCartPage)
//router.post('/add-to-cart/:id', protect, cartController.addtoCart)





module.exports = router;