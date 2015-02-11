var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhonebookSchema   = new Schema({
    firstname: String,
    lastname: String,
    phonenumber: Number
});

module.exports = mongoose.model('Phonebook', PhonebookSchema);