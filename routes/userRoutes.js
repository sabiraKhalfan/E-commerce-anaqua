var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController')
const auth = require('./../middleware/auth')
const protect = require('../middleware/protect')
const cartController = require('./../controllers/cartController');
const { route } = require('.');
const wishlistController = require('./../controllers/wishlistController');


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
    .get(protect, cartController.viewCart)


router.route('/shop')
    .get(cartController.viewShop)

router.get('/product_detail/:id', protect, userController.getProductDetail)
// router.get('/add-to-cart/:id', cartController.getCartPage)
router.post('/add-To-Cart', protect, cartController.addTocart)
router.post('/remove-product', protect, cartController.removeProduct)

router.post('/add-To-Cart', cartController.updateQty)


router.get('/wishlist', protect, wishlistController.getwishlist)
router.post('/addWishlist', protect, wishlistController.addWishlist)



module.exports = router;