
const authRouter = require('express').Router()
const bcryptjs = require('bcryptjs')
const User = require('../models/user');


authRouter.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
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




module.exports = authRouter
