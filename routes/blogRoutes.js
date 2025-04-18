const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

// get all blogs
router.get('/', blogController.blog_index);

// POST
router.post('/', blogController.blog_create_post);

// Create a new blog
router.get('/create', blogController.blog_create_get);

// get by ID -- find a single one and render
router.get('/:id', blogController.blog_details);

// Delete request 
router.delete('/:id', blogController.blog_delete)

//update request
router.get('/:id/edit', blogController.blog_update)

// update Post
router.put('/:id', blogController.blog_update_post)

module.exports = router;