const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    password:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    pickUPInformation:{
        type:String
    }
});

const User = mongoose.model('user',UserSchema);

module.exports = User;