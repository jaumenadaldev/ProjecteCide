const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const userRoutes = require('./routes/users');
const comandesRouter = require('./routes/comandas');

// Middleware per parsear JSON y habilitar CORS
app.use(bodyParser.json());
app.use(cors());
  
// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/comandas', comandesRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));