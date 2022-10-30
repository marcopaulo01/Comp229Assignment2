let mongoose = require('mongoose');

//create model class
let contactModel = mongoose.Schema({
    name: String,
    number: String,
    email: String,
},
{
    collection: "contacts"
})

module.exports = mongoose.model('Contact',contactModel);