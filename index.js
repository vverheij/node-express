const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');

const Joi = require('joi');
const logger = require('./logger');
const authenticator = require('./authenticator');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`env: ${app.get('env')}`);

app.use(express.json());
app.use(logger);

app.use(authenticator);
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

if (app.get('env') == 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled');    
}

const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
    {
        id: 4,
        name: 'course4'
    }
];

app.get('/', (req, res) => {
    res.send('hello world');
});

// read
app.get('/api/courses', (req, res) => {
    //console.log(req.params);  
    res.send(courses);
});

// read
app.get('/api/courses/:id', (req, res) => {
    //console.log(req.params);  
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${parseInt(req.params.id)} not found`);

    res.send(course);
});

// create
app.post('/api/courses/', (req, res) => {
    const{error} =  validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

// update
app.put('/api/courses/:id',(req, res) => {
    //console.log(req.params);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} not found`);

    const {error} =  validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

});

// delete
app.delete('/api/courses/:id',(req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} not found`);

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(course, schema);
    return result;
}

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Started listening to port ${port}`)});