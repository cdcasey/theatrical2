const express = require('express');
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const server = express();
server.use(morgan('common', {
    skip: function (req, res) { return process.env.NODE_ENV === 'test' }
}));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.disable('x-powered-by');

const users = require('./routes/users');
const plays = require('./routes/plays');
const productions = require('./routes/productions');
const scenes = require('./routes/scenes');
const auth = require('./routes/auth');

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, UserID");
    next();
});

server.use('/users', users);
server.use('/plays', plays);
server.use('/productions', productions);
server.use('/scenes', scenes);
server.use('/auth', auth);

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
