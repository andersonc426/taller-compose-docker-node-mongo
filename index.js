const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Cliente = require('./models/cliente');

app.get('/', (req, res) => {
  Cliente.find()
    .then(clientes => res.render('index', { clientes }))
    .catch(err => res.status(404).json({ msg: 'No se encontraron clientes' }));
});

app.post('/cliente/agregar', (req, res) => {
  const newCliente = new Cliente({
    cedula: req.body.cedula,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
  });

  newCliente.save().then(cliente => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
