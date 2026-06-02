const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connexion MongoDB
mongoose.connect('mongodb://localhost:27017/authDB')
  .then(() => console.log(' MongoDB connecté'))
  .catch(err => console.error(' Erreur MongoDB :', err));

// Routes
app.use('/auth', require('./routers/auth'));
app.use('/books', require('./routers/books'));

app.listen(3000, () => console.log(' Serveur sur http://localhost:3000'));