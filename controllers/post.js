const Post = require("../models/post");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");



// Create post

const createStory = async (req, res) => {
    const { userId } = req.user;
    try {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: "storyAsset",
        }
      );
      req.body.image = result.secure_url;
      fs.unlinkSync(req.files.image.tempFilePath);
      req.body.createdBy = userId;
      const post = await Post.create({ ...req.body });
      res.status(201).json({ success: true, post });
    } catch (error) {
      res.json({ error });
    }
  };






  module.exports = {
    createStory
  }