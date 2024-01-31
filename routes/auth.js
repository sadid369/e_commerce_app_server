const authRouter = require('express').Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { recomposeColor } = require('@mui/material');
const auth = require('../middlewares/auth');


authRouter.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with same email already exists" })
    }
    const hashedPassword = await bcryptjs.hash(password, 8);
    let user = new User({
      name,
      email,
      password: hashedPassword,

    })

    user = await user.save();
    console.log(user);
    res.status(200).json(user);

  } catch (e) {
    res.status(500).json({ error: e.message })
  }

})

authRouter.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: "User does not exists" })
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Password not Match" })
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY1)



    res.json({ token, ...user._doc })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }


})

authRouter.get('/tokenisvalid', async (req, res) => {

  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.KEY1)
    if (!verified) {
      return res.json(false)
    }
    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false)
    }
    res.json(true);
  } catch (e) {

  }

})
authRouter.get('/', auth, async (req, res) => {

  try {
    const user = await User.findById(req.userId);
    res.json({ ...user._doc, token: req.token })

  } catch (e) {

  }

})



module.exports = authRouter
