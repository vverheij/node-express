const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

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

app.get('/api/courses', (req, res) => {
    //console.log(req.params);  
    res.send(courses);
})

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
//     //res.send(req.query);
// })

app.get('/api/courses/:id', (req, res) => {
    //console.log(req.params);  
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`Course with id ${parseInt(req.params.id)} not found`);

    res.send(course);
});

app.post('/api/courses/', (req, res) => {
    const{error} =  validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0]);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req, res) => {
    //console.log(req.params);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send(`Course with id ${req.params.id} not found`);
        return;
    }

    const {error} =  validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0]);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(course, schema);
    return result;
}

const port = process.env.PORT || 3000;
//const port = 3000;

app.listen(port, () => {console.log(`Started listening to port ${port}`)});