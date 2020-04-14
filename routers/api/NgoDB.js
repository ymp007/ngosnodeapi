const express = require('express');
let Ngo = require('../../models/Ngo');
let User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//get all Ngo list
router.get('/', async (req,res) => {
    try{
        const Ngolist = await Ngo.find();  
        res.send(Ngolist);
    }catch(err){
        res.status(500).send('server error');
    }
});
router.get('/:id', async (req,res) => {
    const Ngo = await Ngo.findById(req.params.id);
    if(!Ngo){
       return res.status(404).send('not found');
    }else{
        res.json(Ngo);
    }
});

router.delete('/:id', async(req,res) => {
    try {
        await Ngo.findByIdAndDelete({_id: req.params.id},async (err,data)=>{
           if(!err){
               const Ngolist = await Ngo.find();
           res.send(Ngolist);
           }
        });
   
       } catch (error) {
           res.status(404).send('not found');
       }
});


router.post('/',[
    check('email','Please enter valid email').isEmail(),
    check('name','enter valid name').not().isEmpty(),
    check('detail','enter valid detail').not().isEmpty(),
    check('link','enter valid link').not().isEmpty(),
    check('password','enter valid password').isLength({min:6})
],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newNgo = new Ngo({
        email : req.body.email,
        name : req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        detail:req.body.detail,
        link:req.body.link,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5))
    });
    let Ngo1 = await Ngo.findOne({email: req.body.email});
    if(Ngo1){
        return res.status(400).json({error : [{msg:'Ngo already exist'}]});
    }

    await newNgo.save();
    req.send(newNgo);
});

router.put('/:id',[
    check('email','Please enter valid email').isEmail(),
    check('name','enter valid name').not().isEmpty(),
    check('detail','enter valid detail').not().isEmpty(),
    check('link','enter valid link').not().isEmpty(),
    check('password','enter valid password').isLength({min:6})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const NgoU = await Ngo.findById(req.params.id);

    NgoU.email = req.body.email,
    NgoU.name = req.body.name,
    NgoU.address=req.body.address,
    NgoU.phone=req.body.phone,
    NgoU.detail=req.body.detail,
    NgoU.link=req.body.link
        await NgoU.save();
        const Ngolist = await Ngo.find();
           res.send(Ngolist);
});

router.get('/:id/getProducts', async (req,res) => {


    const ProductList = await User.find({'donatedProducts.NgoId':req.params.id});
    // ,donated:false
    if(!ProductList){
       return res.status(404).send('not found');
    }else{
        res.json(ProductList);
    }
});


module.exports = router;
