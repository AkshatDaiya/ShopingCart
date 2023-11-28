const router = require('express').Router()
const regc = require('../controllers/regcontroller');
const productc = require('../controllers/productcontroller');
const upload = require('../helper/multer');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    
    if(jwt.verify(token, process.env.JWT_KEY)){
        next()
    }
};

router.post('/reg', verifyToken, regc.register)
router.post('/login', regc.loginCheck)

router.post('/addData', upload.single('image'), productc.addFormData)
router.get('/allData', productc.allData)
router.get('/singleData/:id', productc.updateSingleData)
router.put('/updateProducts/:id', upload.single('img'), productc.updateProducts)

router.get('/produstInStock', productc.produstInStock)

router.post('/cart', productc.cart)

router.post('/cartData/:userName', productc.cartData)

router.get('/myorders/:userName', productc.myOrders)

module.exports = router