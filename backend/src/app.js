const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/posts', postsRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API del Blog funcionando!' });
});

module.exports = app;