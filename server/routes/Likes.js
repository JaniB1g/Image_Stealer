const express = require("express");
const router = express.Router();
const {Likes} = require("../models");
const {validateToken} = require('../middlewares/AuthMiddlewares');

router.post("/",validateToken, async (req,res) => {
    const {UploadId} = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({
        where: { UploadId: UploadId, UserId: UserId },
      });
      if (!found) {
        await Likes.create({ UploadId: UploadId, UserId: UserId });
        res.json({ liked: true });
      } else {
        await Likes.destroy({
          where: { UploadId: UploadId, UserId: UserId },
        });
        res.json({ liked: false });
      }
    });
    

module.exports = router;