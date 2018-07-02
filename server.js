const express = require('express');
const PORT = process.env.PORT || 8000;

const server = express();

server.get('/', (req, res) => {
    res.send('hello');
});

server.use((req, res) => {
    res.status(404).send('Not Found');
});

server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

module.exports = server;
