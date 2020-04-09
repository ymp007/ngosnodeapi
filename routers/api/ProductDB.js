const express = require('express');
let Product = require('../../models/Product');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//get all users list
router.get('/', async (req,res) => {
    try{
        const productlist = await Product.find();  
        res.send(productlist);
    }catch(err){
        res.status(500).send('server error');
    }
});
router.get('/:id', async (req,res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
       return res.status(404).send('not found');
    }else{
        res.json(product);
    }
});

router.delete('/:id', async(req,res) => {
    try {
        await Product.findByIdAndDelete({_id: req.params.id},async (err,data)=>{
           if(!err){
               const productlist = await Product.find();
           res.send(productlist);
           }
        });
   
       } catch (error) {
           res.status(404).send('not found');
       }
});

//route post api/users
//desc insert task
//access public

router.post('/',[
    check('name').isEmail(),
    check('category').not().isEmpty(),
    check('').isLength({min:6})
],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newProduct = new Product({
        email : req.body.email,
        name : req.body.name,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5))
    });
    let product1 = await Product.findOne({email: req.body.email});
    if(product1){
        return res.status(400).json({error : [{msg:'product already exist'}]});
    }

    await newProduct.save();
});

router.put('/:id',[
    check('email','Please enter valid email').isEmail(),
    check('name').not().isEmpty(),
    check('password','please enter password').isLength({min:6})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const ProductU = await Product.findById(req.params.id);

        ProductU.email = req.body.email,
        ProductU.name = req.body.name,
        ProductU.password= bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5))
        await ProductU.save();
        const productlist = await Product.find();
           res.send(productlist);
});

module.exports = router;
