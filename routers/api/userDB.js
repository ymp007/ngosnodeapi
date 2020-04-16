const express = require('express');
let User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//get all users list
router.get('/', async (req,res) => {
    try{
        const userlist = await User.find();  
        res.send(userlist);
    }catch(err){
        res.status(500).send('server error');
    }
});
router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id);
    if(!user){
       return res.status(404).send('not found');
    }else{
        res.json(user);
    }
});

router.delete('/:id', async(req,res) => {
    try {
        await User.findByIdAndDelete({_id: req.params.id},async (err,data)=>{
           if(!err){
               const userlist = await User.find();
           res.send(userlist);
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
    check('email','Please enter valid email').isEmail(),
    check('name').not().isEmpty(),
    check('address').not().isEmpty(),
    check('phone').not().isEmpty(),
    check('password','please enter password').isLength({min:6})
],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newUser = new User({
        email : req.body.email,
        name : req.body.name,
        address: req.body.address,
        phone:req.body.phone,
        pickUpInformation:req.body.pickUpInformation,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5))
    });
    let user1 = await User.findOne({email: req.body.email});
    if(user1){
        return res.status(400).json({error : [{msg:'user already exist'}]});
    }

    await newUser.save();
    const payload = {
        user : {
            id : newUser._id,
            name: newUser.name
        }
    };
    jwt.sign(payload, config.get('jwtsecret'),{expiresIn:360000},(err,token)=>{
        if(err) throw err
        res.json({token});
    });
});

router.put('/donate/:id',[
    check('user_id').not().isEmpty(),
    check('productname').not().isEmpty(),
    check('details').not().isEmpty(),
    check('NgoId').not().isEmpty(),
	check('category').not().isEmpty(),
	check('dateofDonation').not().isEmpty(),
	check('quantity').not().isEmpty()
],async (req,res)=>{

    //const errors = validationResult(req);
   // if (!errors.isEmpty()) {
    //  return res.status(422).json({ errors: errors.array() });
    //}
	 const UserU = await User.findById(req.params.id);
    UserU.donatedProducts.push(req.body);
	await UserU.save();
	res.send("Product Added to your List");
});

router.put('/:id',[
    check('email','Please enter valid email').isEmail(),
    check('name').not().isEmpty(),
    check('address').not().isEmpty(),
    check('phone').not().isEmpty(),
    check('password','please enter password').isLength({min:6})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const UserU = await User.findById(req.params.id);

        UserU.email = req.body.email;
        UserU.name = req.body.name;
        UserU.address = req.body.address;
        UserU.pickUpInformation= req.body.pickUpInformation;
        UserU.phone = req.body.phone;
        UserU.password= bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5));
        
        await UserU.save();
        const userlist = await User.find();
           res.send(userlist);
});

router.put('/addProduct/:id',async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const UserU = await User.findById(req.params.id);
        UserU.donatedProducts.push(req.body.donatedProduct);
        
        await UserU.save();
        const userlist = await User.find();
           res.send(userlist);
});

module.exports = router;
