const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true,
        max: 255
    },
    text:{
        type: String,
        required: true,
        max: 255
    },
    start_date:{
        type: Date,
        default: Date.now,
    },
    stop_date:{
        type: Date,
    },
    status:{
        type: Number,
        default:0,
        min: 0,
        max: 3
    },
    files_list:{
        type: [String],
        required: false
    }

});

module.exports=mongoose.model('Task',taskSchema);