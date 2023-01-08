const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Request = require("../models/Requests");
const fetchuser = require("../middleware/fetchUser");


router.get("/fetchallrequests",fetchuser,async(req,res)=>{
    try {
        const reqests = await Request.find({user : req.user.id});
        res.json(reqests);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});

router.get("/fetch_all_lends",fetchuser,async(req,res)=>{
    try {
        const reqests = await Request.find({requester : req.user.id});
        res.json(reqests);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});



// ?Login Required

router.post("/create_request",fetchuser,async(req,res)=>{
    try{
        const {id, name, amount} = req.body;

        // let request = await Request.create({
        //     user : id,
        //     requester : req.user.id,
        //     name : name,
        //     amount : amount
        // });

        let pay = await User.updateOne({_id : req.user.id, "friends.id" : id},{$inc: {"friends.$.amount": amount}});

        res.json({success : true, pay});
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});

router.delete("/fulfill_request",fetchuser, async(req,res) =>{
    try{
        let requests = await Request.findById(req.body.id);

        let user = await User.findOne({user:req.user.id});
        
        const {name, amount} = requests;

        console.log(name);

        user.payment.push({name : name, amount : amount});

        user.spend += amount;

        await user.save();

        requests = await Request.findByIdAndDelete(req.body.id);

        res.json({success :true, request: requests});

    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});

router.delete("/delete_request",fetchuser, async(req,res) =>{
    try{
        const requests = await Request.findByIdAndDelete(req.body.id);

        res.json({success :true, request: requests});

    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});



module.exports = router;