const Reg = require('../models/reg');
const bcrypt = require('bcrypt');



exports.register = async (req, res) => {
    try {
        const { username, password } = req.body
        const cpass = await bcrypt.hash(password, 10)
        const userCheck = await Reg.findOne({ username: username })
        if (userCheck == null) {
            const record = new Reg({
                username: username,
                password: cpass
            })
            record.save()
            res.status(201).json({
                status: 201,
                message: `User Name ${username} is Successfully Added`
            })
        } else {
            res.status(400).json({
                message: `User Name ${username} is Already Registered`
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

exports.loginCheck = async (req, res) => {
    try {
        const { username, password } = req.body
        const record = await Reg.findOne({ username: username })
        if (record !== null) {
            const cpass = await bcrypt.compare(password, record.password)
            if (cpass) {
                res.status(200).json({
                    status: 200,
                    apiData: record.username
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Wrong Credntails"
                })
            }
        } else {
            res.status(400).json({
                status: 400,
                message: "Wrong Credntails"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }

}