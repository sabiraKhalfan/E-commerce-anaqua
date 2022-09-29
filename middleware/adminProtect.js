

module.exports = {
    authAdmin: (req, res, next) => {
        if (req.session.admin) {
            next()
        }
        else
            res.redirect('/admin/login')
    },
    authAdminLogin: (req, res, next) => {
        if (req.session.admin) {
            res.redirect('/admin/dashboard')
        }
        else {
            next()
        }
    }
}
// exports.authAdmin = function (req, res, next) {

//     if (req.session.admin) {
//         next()
//     }
//     else
//         res.redirect('/admin/login')
// }


