const express = require('express');
let Categoty = require('../../models/Category');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//get all Categotys list
router.get('/', async (req,res) => {
    try{
        const Categotylist = await Categoty.find();  
        res.send(Categotylist);
    }catch(err){
        res.status(500).send('server error');
    }
});
router.get('/:id', async (req,res) => {
    const Categoty = await Categoty.findById(req.params.id);
    if(!Categoty){
       return res.status(404).send('not found');
    }else{
        res.json(Categoty);
    }
});

router.delete('/:id', async(req,res) => {
    try {
        await Categoty.findByIdAndDelete({_id: req.params.id},async (err,data)=>{
           if(!err){
               const Categotylist = await Categoty.find();
           res.send(Categotylist);
           }
        });
   
       } catch (error) {
           res.status(404).send('not found');
       }
});

//route post api/Categotys
//desc insert task
//access public

router.post('/',[
    check('name').not().isEmpty(),
    check('details').not().isEmpty()
],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newCategoty = new Categoty({
        name : req.body.name,
        details: req.body.details
    });
    let Categoty1 = await Categoty.findOne({name: req.body.email});
    if(Categoty1){
        return res.status(400).json({error : [{msg:'Categoty already exist'}]});
    }
    newCategoty.save();
    res.send(newCategoty);
});

router.put('/:id',[
    check('name').not().isEmpty(),
    check('details').not().isEmpty()
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const CategotyU = await Categoty.findById(req.params.id);

        CategotyU.name = req.body.name;
        CategotyU.details = req.body.details;
        await CategotyU.save();
        const Categotylist = await Categoty.find();
           res.send(Categotylist);
});

module.exports = router;
