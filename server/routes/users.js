const router=require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../controllers/users');


router.post('/register', async (req,res)=>{
     const saved=await User.register(req.body);
     if (saved==0)
          res.status(406).send('User data is not full');
     else if (saved==1){
          res.status(406).send('User already exists');
     }
     else
          res.status(200).send({id:saved.id});
});


router.post('/login', async (req,res)=>{
     console.log(req.body);
     const valid=await User.login(req.body);
     if (valid){
          const token=jwt.sign({_id: valid.id},process.env.TOKEN_SECRET)
          res.cookie("auth-token", token,{httpOnly: true, maxAge: 11000}).send(token);
     }   
     else
          res.status(401).send('Email or password is incorrect');
});




module.exports=router;