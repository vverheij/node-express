
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'}
];


// read
router.get('/', (req, res) => {
    console.log(req.params);  
    res.send(courses);
});

// read 
router.get('/:id', (req, res) => {
    console.log(req.params);  
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${parseInt(req.params.id)} not found`);

    res.send(course);
});

// create
router.post('/', (req, res) => {
    console.log(req);
    const{error} =  validateCourse(req.body);

    //if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

// update
router.put('/:id',(req, res) => {
    console.log(req.params);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} not found`);

    const {error} =  validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

});

// delete
router.delete('/:id',(req, res) => {
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

module.exports = router;
