const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

//Importar routes

const themoviedbRoutes = require('./routes/themoviesdb');
const authRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

// Use de las Routes

app.use('/api/themoviesdb', themoviedbRoutes);
app.use('/api/users', authRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Servidor corriendo en puerto ${PORT}`));