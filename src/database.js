const mongoose = require('mongoose');
const URI = "mongodb://127.0.0.1:27017/GPS";

mongoose.connect(URI)
    .then(db => console.log("BD Conectada"))
    .catch(err => console.error(err));

module.exports = mongoose;