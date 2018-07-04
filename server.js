const express = require('express');
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');

const server = express();
server.use(morgan('common', {
    skip: function (req, res) { return process.env.NODE_ENV === 'test' }
}));

const users = require('./routes/users');

server.use('/users', users);

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
