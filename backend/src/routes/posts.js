const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get posts con filtros
router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            search, 
            tag,
            sortBy = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 10
        } = req.query;

        const query = {};
        
        // Filtro por categoría
        if (category) {
            query.category = category;
        }

        // Filtro por tag
        if (tag) {
            query.tags = tag;
        }

        // Búsqueda en título y contenido
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        
        const posts = await Post.find(query)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        const total = await Post.countDocuments(query);

        res.json({
            posts,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
        tags: req.body.tags
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Agregar comentario
router.post('/:id/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        post.comments.push({
            content: req.body.content,
            author: req.body.author
        });

        const updatedPost = await post.save();
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Resto de rutas existentes...
// GET /:id
// PATCH /:id
// DELETE /:id

// Obtener categorías disponibles
router.get('/categories', async (req, res) => {
    try {
        const categories = await Post.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener tags populares
router.get('/tags', async (req, res) => {
    try {
        const tags = await Post.aggregate([
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;