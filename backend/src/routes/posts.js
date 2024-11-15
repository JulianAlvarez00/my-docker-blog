const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get todos los posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener un post específico
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un post
router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        
        if (req.body.title) post.title = req.body.title;
        if (req.body.content) post.content = req.body.content;
        if (req.body.author) post.author = req.body.author;
        
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        await post.deleteOne();
        res.json({ message: 'Post eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;