var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController')
const auth = require ('./../middleware/auth')


/* GET users listing. */

router.get('/',userController.indexRouter);


router.route('/login')
.get(userController.toLogin)
.post(userController.signin)

router.route('/signup')
.get(userController.toregister)
.post(userController.createUser);



// .router
// // //.get(userController.getAllUsers)
// .post(userController.createUser)


// create a signup page, transfer the data to the user database. Then create login page and take the data base as the primary.
 module.exports = router;