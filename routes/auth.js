const authRouter = require('express').Router()


authRouter.post('/api/signup' , (req , res)=>{
 console.log(req.body);
   res.send('hello from simple server :)')
 
}) 




module.exports  = authRouter
