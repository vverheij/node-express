
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');


//const Joi = require('joi');
const logger = require('./logger');
const home = require('./routes/home');
const courses = require('./routes/courses');

const express = require('express');

const authenticator = require('./authenticator');
const app = express();

app.use(express.json());
app.use(logger);
app.use('/', home);
app.use('/api/courses',courses);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`env: ${app.get('env')}`);

app.use(authenticator);
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());  
  
// configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') == 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled');    
}

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Started listening to port ${port}`)});