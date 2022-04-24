const express = require('express');
const router = express.Router();
const {Uploads,Likes,Dislikes} = require("../models");
const {validateToken} = require('../middlewares/AuthMiddlewares');


router.get("/",async(req,res) =>{
    const listOfUploads = await Uploads.findAll({include: [Likes,Dislikes]});
    res.json(listOfUploads);
});

router.get('/byId/:id', async(req,res)=>{
    const id = req.params.id;
    const uploads = await Uploads.findByPk(id);
    res.json(uploads);
});


router.get('/byUserId/:id', async(req,res)=>{
  const id = req.params.id;
  const listOfUploads = await Uploads.findAll({where: {UserId:id},include:[Likes,Dislikes]});
  res.json(listOfUploads);
});


router.post("/",validateToken,async(req, res)=>{
    const uploads = req.body;
    uploads.username=req.user.username;
    uploads.UserId = req.user.id;
    await Uploads.create(uploads);
    res.json(uploads);
});

router.put("/",validateToken,async(req, res)=>{
  const {newDescription,id} = req.body;
  await Uploads.update({description:newDescription}, {where:{id:id}});
  res.json(newDescription);
});

router.delete("/:uploadId", validateToken ,async(req,res)=>{
    const uploadId = req.params.uploadId;
  await Uploads.destroy({
    where: {
      id: uploadId,
    },
  });

  res.json("A törlés sikeresen megtörtént!!");

});

module.exports = router;