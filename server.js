const express = require('express');
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const server = express();
server.use(morgan('common', {
    skip: function (req, res) { return process.env.NODE_ENV === 'test' }
}));
// server.use(morgan('common'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const users = require('./routes/users');
const plays = require('./routes/plays');
const productions = require('./routes/productions');

server.use('/users', users);
server.use('/plays', plays);
server.use('/productions', productions);

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
