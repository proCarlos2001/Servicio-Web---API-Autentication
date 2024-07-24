const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const path = require('path');
require('dotenv').config();

// Crear la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

// Conectar a la base de datos Mongo 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Conectado'))
    .catch(err => console.error(err));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Prueba 1, respuesta del servidor');
});

// Iniciar el servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servicio iniciado en el puerto ${PORT}`));