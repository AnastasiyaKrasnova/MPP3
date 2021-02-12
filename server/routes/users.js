const router=require('express').Router();
const jwt=require('jsonwebtoken');
const Task=require('../controllers/tasks');


router.post('/register', async (req,res)=>{
     const saved=await User.register(req.body);
     if (saved)
          res.status(200).send({id:saved.id});
     else
          res.status(400).send('user data is incorrect');
});


router.post('/login', async (req,res)=>{
     const valid=await User.login(req.body);
     if (valid){
          const token=jwt.sign({_id: valid.id},process.env.TOKEN_SECRET)
          res.header('auth-token',token).send(token);
     }   
     else
          res.status(400).send('Email or password is incorrect');
});




module.exports=router;