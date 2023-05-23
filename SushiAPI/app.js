// Définition des variables générales à l'application
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('127.0.0.1:27017/sushishop');
var cors = require('cors');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à MongoDB !")
});

// Définition des variables indiquant les routes utilisées
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/boxes');

// Variable du "moteur" du module Express
var app = express();

// Intégration des chemins et modules à utiliser dans l'application
app.use(logger('dev'));
app.use(cors()); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    req.db = db;
    next();
});

// Association entre l'URL demandée et la route à suivre via le contrôleur
app.use('/', indexRouter);
app.use('/boxes', usersRouter);

// Exportation des modules et lancement de l'application
module.exports = app;
