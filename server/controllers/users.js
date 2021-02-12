const Joi=require('@hapi/joi');
const User=require('../model/User');
const bcrypt=require('bcryptjs')

const schema=Joi.object({
    first_name: Joi.string().max(25).required(),
    last_name: Joi.string().max(25).required(),
    email: Joi.email().max(25).min(5).required(),
    password: Joi.string().max(100).min(5).required(),
});

exports.register=async (data)=>{

    const hashedPassword=await hashPassword(data.password);
    const user=new User({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashedPassword,
    });

    try{
        const isExists=await isUserExists(data.email);
        if (isExists)
            return null;
        const savedUser=await user.save();
        return savedUser;

    }catch(err){
        return null;
    }
}

exports.login=async (data)=>{
    try{
        const emailUser=await isUserExists(data.email);
        if (!emailUser)
            return null
        const validPass=await bcrypt.compare(data.password, emailUser.password)
        if (!validPass)
            return null
        return emailUser

    }catch(err){
        return null;
    }
}

async function isUserExists(email){
    const user=User.findOne({email:email});
    return user;
}

async function hashPassword(pass){
    const salt=await bcrypt.genSalt(10);
    const hashedPass=await bcrypt.hash(pass,salt);
    return hashedPass;
}