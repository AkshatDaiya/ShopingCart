const express = require('express');
const app = express()
require('dotenv').config()
app.use(express.json())
const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
const apiRouter = require('./routers/api');


app.use(express.static('public'))
app.use('/api',apiRouter)
app.listen(process.env.PORT,()=>{console.log(`Api server is running on port no. ${process.env.PORT}`);})