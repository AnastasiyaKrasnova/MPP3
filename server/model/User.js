const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        max: 25
    },
    last_name:{
        type: String,
        required: true,
        max: 25
    },
    email:{
        type: String,
        required: true,
        min: 5,
        max: 25
    },
    password:{
        type: String,
        required: true,
        min: 5,
        max: 100
    }

});

module.exports=mongoose.model('User',userSchema);