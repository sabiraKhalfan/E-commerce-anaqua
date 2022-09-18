
var express = require('express');
var router = express.Router();
const adminController = require('./../controllers/adminController')
const categoryController = require('./../controllers/categoryController')
const productController = require('./../controllers/productController')
const upload = require('./../middleware/pic')




router.route('/login')
    .get(adminController.getAdmin)
    .post(adminController.adminLogin)




router.route('/addCategory')
    .get(categoryController.getaddCategory)
    .post(categoryController.addCategory)



router.route('/edit-category/:id?')
    .get(categoryController.geteditCategory)
    .post(categoryController.editCategory)



router.get('/viewCategory', categoryController.getAdminCategory)
router.get('/delete-category/:id', categoryController.DeleteCategory)



router.get('/dashboard', adminController.getAdminDashboard)
router.get('/users', adminController.getAdminUsers)
router.get('/viewusers', adminController.getAdminUsers)
router.get('/blockUser/:id', adminController.blockUser)
router.get('/unblockUser/:id', adminController.unblockUser)



router.route('/addProducts')
    .get(productController.getaddProduct)
    .post(upload.array('images', 4), productController.addProduct)
router.get('/viewProducts', productController.geteditProduct)
router.get('/edit_product/:id', productController.editProduct)
router.post('/edit_product/:id', upload.array('images', 4), productController.updateProduct)
router.get('/delete_product/:id', upload.array('images', 4), productController.deleteProduct)

module.exports = router