const mongoose = require('mongoose');

const NgoSchema = new mongoose.Schema({
    email : String,
        name : String,
        address:String,
        phone:Number,
        detail:String,
        link:String,
        password: String
});

const Ngo = mongoose.model('ngos',NgoSchema);

module.exports = Ngo;