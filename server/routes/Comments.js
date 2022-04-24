const express = require('express');
const router = express.Router();
const {Comments} = require("../models");
const {validateToken} = require('../middlewares/AuthMiddlewares');


router.get('/:uploadId', async(req,res)=>{
    const uploadId = req.params.uploadId;
    const comments = await Comments.findAll({where: {UploadId:uploadId}});
    res.json(comments);
})

router.post('/',validateToken,async(req,res)=>{
    const comment = req.body;
    const username = req.user.username;
    comment.username=username;
    await Comments.create(comment);
    res.json(comment);
})

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;
  
    await Comments.destroy({
      where: {
        id: commentId,
      },
    });
  
    res.json("A törlés sikeresen megtörtént!!");
  });
  

module.exports = router;