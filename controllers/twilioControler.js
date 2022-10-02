const client = require('twilio')('ACbefe1fe42dce3706628df964194f69f3', '1e6c79d7f5820207a328ae1d1210dd94');
const serviceSid = 'VAa8d31da5b37c3584d11ae556be79e78d'


module.exports = {

    viewpage: function (req, res, next) {
        const data = req.session.body
        res.render('otp', { data })
    },


    doSms: (userData) => {
        console.log(userData);
        console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        return new Promise(async (resolve, reject) => {
            let res = {}

            console.log('eeeeeeeeeeeeeeee');
            await client.verify.services(serviceSid).verifications.create({

                to: `+91${userData.phone}`,
                channel: "sms"
            }).then((reeee) => {
                res.valid = true;
                resolve(res)
                console.log(reeee);
            }).catch((err) => {

                console.log(err);

            })
        })
    },

    otpVerify: (otpData, userData) => {
        console.log(otpData);
        console.log(userData);


        return new Promise(async (resolve, reject) => {
            await client.verify.services(serviceSid).verificationChecks.create({
                to: `+91${userData.phone}`,
                code: otpData.otp
            }).then((verifications) => {
                console.log(verifications);
                resolve(verifications.valid)
            })
        })
    }



}