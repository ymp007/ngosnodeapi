const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:String,
    details:String
});

const Category = mongoose.model('catogories',CategorySchema);

module.exports = Category;