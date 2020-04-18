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
    check('userid').isEmail(),
    check('productname').not().isEmpty(),
    check('details').isLength({min:6}),
	check('category').not().isEmpty(),
	check('NgoId').not().isEmpty(),
	check('dateofDonation').not().isEmpty(),
	check('quantity').not().isEmpty(),
],async (req,res)=>{

    const errors = validationResult(req);
    //if (!errors.isEmpty()) {
      //return res.status(422).json({ errors: errors.array() });
    //}
    const newProduct = new Product({
		userid:req.body.userid,
		productName:req.body.productname,
		details:req.body.details,
		category:req.body.category,
		NgoId:req.body.NgoId,
		dateofDonation:req.body.dateofDonation,
		quantity:req.body.quantity,
		donated:req.body.donated
    });

    await newProduct.save();
	res.send(newProduct);
});

router.put('/',[
    check('productname').not().isEmpty(),
    check('details').isLength({min:6}),
	check('category').not().isEmpty(),
	check('dateofDonation').not().isEmpty(),
	check('quantity').not().isEmpty(),
],async (req,res)=>{

    const errors = validationResult(req);
    //if (!errors.isEmpty()) {
      //return res.status(422).json({ errors: errors.array() });
    //}
    const nProduct = Product.findById(req.params.id);
		nProduct.productName=req.body.productname,
		nProduct.details=req.body.details,
		nProduct.category=req.body.category,
		nProduct.dateofDonation=req.body.dateofDonation,
		nProduct.quantity=req.body.quantity,
    await nProduct.save();
	res.send(nProduct);
});

module.exports = router;
