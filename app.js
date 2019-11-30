const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('helloo js');
});

app.listen(8080, () => console.log('listening port 8080'));