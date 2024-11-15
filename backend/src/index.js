require('dotenv').config();
const connectDB = require('./config/database');
const app = require('./app');

const port = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});