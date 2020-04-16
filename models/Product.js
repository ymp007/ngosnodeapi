
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
	userid:{
		type: Schema.Types.ObjectId,
            ref: 'user'
	},
    productName:String,
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
});

const Product = mongoose.model('product',ProductSchema);

module.exports = Product;