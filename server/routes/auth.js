const express=require('express');
const session = require('express-session');
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")
const bcrypt=require('bcryptjs');
const { valid } = require('semver');


router.get('/register',(req,res)=>{
    console.log(req.session);
    res.send(req.session.user);
});

router.post('/login',(req,res)=>{
    var {username,password}=req.body
    if(!username || !password )
    {
        return res.status(422).json({error:"Please add all fields"})
    }
    User.findOne({username:username})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Username or password"})
       }
        bcrypt.compare(password,savedUser.password)
        .then(match=>{
            if(match)
            {
                req.session.user = username;
                
                res.redirect('/dashboard');
                // res.json({message:"Login Successfull"})
            }
            else{
                return res.status(422).json({error:"Invalid Username or password"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
})


router.post('/register',(req,res)=>{

    var {username,password}=req.body
    console.log(req.body)
    if(!password || !username)
    {
        return res.status(200).json({error:"Add all data"})
    }
    bcrypt.hash(password,12)
    .then((hashedpw)=>{
        User.findOne({username:username})
        .then((savedUser)=>{
            if(savedUser){
                 return res.status(400).json({error:"User already exists with that username"})
            }
            const user=new User({
                password:hashedpw,
                username,
            })
            user.save()
            .then((user)=>{
                return res.status(200).json({message:"Register Successfully"})

            })
            .catch((err)=>{
                console.log(err)
            })
        })
    .catch((err)=>{
        console.log(err)
    })   

})
.catch((err)=>{
    console.log(err)
})
})


module.exports=router
