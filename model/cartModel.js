

const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        //required: true
    },
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'product'
        },

        quantity: {
            type: Number,
            default: 1
        }
    }],
},

    { timeStamp: true })


const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart