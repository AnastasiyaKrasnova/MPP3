const express=require('express');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');
const {serverPort} =require('../api_config.json');

global.appRoot = path.resolve(__dirname);

const tasks=require('./routes/tasks');
const users=require('./routes/users');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    ()=>{
        console.log('connected to db');
        mongoose.set('useFindAndModify', false);
    }
);

app.use(cors())
app.use(express.json());
app.use(fileUpload());

app.use("/static", express.static("public/build"));
app.get('/',(req, res) => {
    res.sendFile("index.html", {root: path.join(global.appRoot, "../public/build")});
});

app.use('/api',tasks);
app.use('/api',users);



app.listen(serverPort, ()=>console.log('Server is running'));

