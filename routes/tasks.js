const express = require('express');
const { validate } = require('jsonschema');
const router = express.Router();
const  shortid = require('shortid')
const db = require('../db/db');

// const tasks = [
//     { id: 1, title: 'first', completed: true },
//     { id: 2, title: 'second', completed: true }
// ];

router.get('/', (req, res, next) => {
    const tasks = db.get('tasks');
    res.json({ status: 'OK', data: tasks });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    const data = tasks.find((task) => String(task.id) === id);
    res.json({status: 'OK', data})
});

router.post('/', (req, res, next) => {
    const { body } = req;
    const id = shortid.generate()
    const taskSchema = {
        // type: 'object', 
        properties: {
            title: { type: 'string' }
        },
        required: ['title'],
        additionalProperties : false
    };
    const validationResult = validate(body, taskSchema)
    const newTask = { id, title: body.title, completed: false };
    if (!validationResult.valid) {
        return next(new Error('INVALID_JSON_OR_API_FORMAT'));
    } 
    try {
        db.get('tasks')
        .push(newTask)
        .write()
    } catch (error) {
        throw new Error(error)
    }
    // tasks.push(newTask)
    res.json({ status: 'OK', data: newTask });
    
});

module.exports = router;
