const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const app = express();
const tasksRoutes = require('./routes/tasks')
app.use(bodyParser.json());
app.use(morgan('combined'));



app.use('/tasks', tasksRoutes);
app.use((err, req, res, next) => {
    const { message } = err;
    res.json({ status: 'ERROR', message });
});

app.get('/', (req, res) => {
    res.send('helloo js');
});

app.listen(8080, () => console.log('listening port 8080'));
