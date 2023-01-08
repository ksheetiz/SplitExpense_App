const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = '$&THISISASECRET&$';

router.post("/create_user",async(req, res)=>{
    try{
        const {name,email,password} = req.body;

        const checkUser = await User.findOne({email});

        if(checkUser){
            return res.status(400).json({success : false, error : "Person with this Credential exist"});
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            name : name,
            email : email,
            password : secPass
        });

        const data = {
            user : {
                id : user.id,
            }
        }
        const token = jwt.sign(data,JWT_SECRET);
        res.send({success : true,token});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success : false, error : "Please try to login with Correct Credentials !"});
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({success : false, error : "Please try to login with Correct Credentials !"});
        }

        const data = {
            user : {
                id : user.id,
            }
        }
        const token = jwt.sign(data, JWT_SECRET);

        res.send({success : true,token});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error !");
    }
});

router.get("/getuser", fetchuser, async (req, res) => {
    try {
      var userId = req.user.id;
      const user = await User.findById(userId);
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error !");
    }
  });

module.exports = router;