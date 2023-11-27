const Product = require('../models/product');
const CartM = require('../models/cart');

exports.addFormData = (req, res) => {
    try {
        const { productName, description, moreDetails, price, quantity } = req.body
        const filename = req.file.filename
        const record = new Product({
            name: productName, desc: description, mdesc: moreDetails, price: price, img: filename, qty: quantity
        })
        record.save()
        res.status(201).json({
            status: 201,
            message: 'Details Added Successfully'
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

exports.allData = async (req, res) => {
    try {
        const record = await Product.find()
        res.status(200).json({
            status: 200,
            apidata: record
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }

}

exports.updateSingleData = async (req, res) => {
    try {
        const id = req.params.id
        const record = await Product.findById(id)
        res.status(200).json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

exports.updateProducts = async (req, res) => {
    try {
        const id = req.params.id
        const { name, desc, mdesc, price, qty, status } = req.body
        if (req.file) {
            const filename = req.file.filename
            await Product.findByIdAndUpdate(id, {
                name: name, desc: desc, mdesc: mdesc, price: price, img: filename, status: status, qty: qty
            })
        } else {
            await Product.findByIdAndUpdate(id, {
                name: name, desc: desc, mdesc: mdesc, price: price, status: status, qty: qty
            })
        }
        res.status(200).json({
            status: 200,
            message: "Details Updated Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

exports.produstInStock = async (req, res) => {
    try {
        const record = await Product.find({ status: 'IN-STOCK' })
        res.status(200).json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

exports.cart = async (req, res) => {
    try {
        const { ids } = req.body
        const record = await Product.find({ _id: { $in: ids } })
        res.status(200).json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

exports.cartData = async (req, res) => {
    try {
        const { items } = req.body
        const userName = req.params.userName
        for (let propt in items) {
            const record = await Product.findById(propt)
            const cartRecord = new CartM({
                name: record.name,
                img: record.img,
                qty: items[propt],
                username: userName
            })
            cartRecord.save()
        }
        res.status(201).json({
            status: 201,
            message: 'Data Inserted Successfully'
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }

}

exports.myOrders = async (req, res) => {
    try {
        const userName = req.params.userName
        const record = await CartM.find({ username: { $in: [userName] } }).sort({ pDate: -1 })
        res.status(200).json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            apiData: error.message
        })
    }

}

