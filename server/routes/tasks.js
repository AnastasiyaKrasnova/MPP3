const router=require('express').Router();
const Task=require('../controllers/tasks');
const fs = require('fs');
const path = require('path');
const auth=require('../middleware/verifyToken')


router.post('/tasks', auth, async (req,res)=>{
    const saved=await Task.add(req.body);
   if (saved)
        res.status(200).send(saved);
   else
        res.status(400).send('json data is incorrect');
});

router.post('/tasks/files', auth, async (req,res)=>{
     console.log(req.files)
     if (!req.files) {
          return res.status(500).send({ msg: "file is not found" })
      }
      const dir=`${global.appRoot}/public/${req.query.id}`
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      const myFile = req.files.file;
      myFile.mv(`${dir}/${myFile.name}`, function (err) {
          if (err) {
              console.log(err)
              return res.status(500).send({ msg: "Error occured" });
          }
          return res.send({name: myFile.name, path: `/${myFile.name}`});
      });
});

router.delete('/tasks/files',auth, async (req,res)=>{
     const dir=`${global.appRoot}/public/${req.query.id}`
     let filePath = path.resolve(`${dir}/${req.query.filename}`);
     fs.unlinkSync(filePath, (err) => {
          if (err){
               console.log(err);
               return res.status(500).send({ msg: "file is not found" })
          }
     });
     res.status(200).send('deleted');
});

router.post('/tasks/download',auth, async(req, res) => {

     const dir=`${global.appRoot}/public/${req.query.id}`
     let filePath = path.resolve(`${dir}/${req.query.filename}`);
     res.download(filePath, (err) => {
          if (err){
               console.log(err);
               return res.status(500).send({ msg: "file is not found" })
          }
     });
});


router.get('/tasks', auth ,async (req,res)=>{

     if (!req.query.status){
          const saved=await Task.listAll();
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of tasks');
     }
     else{
          const saved=await Task.filterByStatus(req.query.status);
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of tasks by tasks');
     }
     
 });

router.put('/tasks', auth, async (req,res)=>{

     console.log(req.body)
     const saved=await Task.update(req.body);
    if (saved){
          res.status(200).send(saved);
    }     
    else
         res.status(400).send('DB error while updating date');
 });

router.delete('/tasks', auth, async (req,res)=>{

     const dir=`${global.appRoot}/public/${req.query.id}`
     fs.rmdir(dir, { recursive: true }, (err) => {
          if (err) console.log(err)})
     const saved=await Task.delete(req.query.id);
     if (saved)
         res.status(200).send(saved);
     else
         res.status(400).send('DB error while deleting task');
 });


module.exports=router;