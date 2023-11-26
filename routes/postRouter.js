const express = require('express');
const { createStory } = require('../controllers/post');
const router = express.Router();


// Create
router.post('/posts',createStory);


module.exports = router
