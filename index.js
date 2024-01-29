const express = require('express')
const authRouter = require('./routes/auth')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
mongoose.connect(process.env.URI)
    .then((res) => console.log('> Mongodb Connected Connected...'))
    .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red))
app.use(express.json())
app.use(authRouter);





app.listen(port, "0.0.0.0", () => console.log('> Server is up and running on port : ' + port))