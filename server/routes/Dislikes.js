const express = require("express");
const router = express.Router();
const {Dislikes} = require("../models");
const {validateToken} = require('../middlewares/AuthMiddlewares');

router.post("/",validateToken, async (req,res) => {
    const {UploadId} = req.body;
    const UserId = req.user.id;

    const found = await Dislikes.findOne({
        where: { UploadId: UploadId, UserId: UserId },
      });
      if (!found) {
        await Dislikes.create({ UploadId: UploadId, UserId: UserId });
        res.json({ disliked: true });
      } else {
        await Dislikes.destroy({
          where: { UploadId: UploadId, UserId: UserId },
        });
        res.json({ disliked: false });
      }
    });
    

module.exports = router;