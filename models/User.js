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
    },
    donatedProducts:[{
    name:String,
    details:String,
    category:{
            type: Schema.Types.ObjectId,
            ref: 'category'
     },
      NgoId:{
        type: Schema.Types.ObjectId,
        ref: 'ngo'
      },
      dateofDonation:Date,
      qunatity: Number,
      donated:Boolean
    }]
});

const User = mongoose.model('user',UserSchema);

module.exports = User;