const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Tecnología', 'Viajes', 'Comida', 'Estilo de vida', 'Otros'],
        default: 'Otros'
    },
    tags: [{
        type: String,
        trim: true
    }],
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Índices para búsqueda
postSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Post', postSchema);