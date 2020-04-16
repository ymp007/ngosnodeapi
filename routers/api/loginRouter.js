const express = require('express');
let User = require('../../models/User');
let Ngo = require('../../models/Ngo');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//get all users list
router.post('/user', async (req,res) => {
    try{
        const userData = await User.findOne({email:req.body.email});
        if(!userData){
            res.status(500).send("Sorry username/password is wrong");
        }else{
        //   console.log(userData[0].password); 
         if(bcrypt.compareSync(req.body.password,userData.password)){
             
            const payload = {
                user : {
                    id : userData._id,
                    name: userData.name
                }
            };
            jwt.sign(payload, config.get('jwtsecret'),{expiresIn:360000},(err,token)=>{
                if(err) throw err
                res.json({token});
            });
         }  
        } 
    }catch(err){
        res.send("Sorry username/password is wrong");
    }
});

router.post('/ngo', async (req,res) => {
    try{
        const NgoData = await Ngo.findOne({email:req.body.email});
        if(!NgoData){
            res.status(500).send("can't find");
        }else{
        //   console.log(NgoData[0].password); 
         if(bcrypt.compareSync(req.body.password,NgoData.password)){
             
            const payload = {
                user : {
                    id : NgoData._id,
                    name: NgoData.name
                }
            };
            jwt.sign(payload, config.get('jwtsecret'),{expiresIn:360000},(err,token)=>{
                if(err) throw err
                res.json({token});
            });
         }  
        } 
    }catch(err){
        res.status(500).send("Sorry username/password is wrong");
    }
});

module.exports = router;