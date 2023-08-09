const express = require('express');
const path = require('path');
const morgan = require('morgan')
const { mongoose } = require('./database');


const app = express();
//configuración
app.set('port', 3000)
//middleware
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/api',require('./routes/routes'));
//static
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//start server
app.listen(app.get('port'), () => {
    console.log('server on port '+app.get('port'));
});