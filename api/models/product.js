const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:String,
    desc:String,
    mdesc:String,
    price:Number,
    img:String,
    status:{type:String,default:'IN-STOCK'},
    qty:Number,
    postedDate:{type:Date,default:new Date()}
})

module.exports = mongoose.model('product', productSchema)