var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController')
const auth = require('./../middleware/auth')
const protect = require('../middleware/protect')
const cartController = require('./../controllers/cartController');
const { route } = require('.');
const wishlistController = require('./../controllers/wishlistController');
const profileController = require('./../controllers/profileController');
const twilioControler = require('./../controllers/twilioControler')
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
router.post('/add-to-cart', protect, cartController.addTocart)

router.post('/increment', protect, cartController.increment)
router.post('/remove-product', protect, cartController.removeProduct)

//router.post('/add-To-Cart', cartController.updateQty)


router.get('/wishlist', protect, wishlistController.getwishlist)
router.post('/addWishlist', protect, wishlistController.addWishlist)
router.post('/delete_wishlist', protect, wishlistController.deleteWishlist)

router.get('/profile', protect, profileController.getuserProfile)
router.post("/updateDetails", protect, profileController.updateProfile)



router.get('/otp', protect, userController.viewpage)
router.post('/otp', protect, userController.postotp)

router.get('/manageaddress', protect, profileController.getmanageaddress)
router.post('/updatepwd', protect, profileController.updatepwd)

module.exports = router;