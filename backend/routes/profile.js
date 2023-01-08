const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchUser");

router.get("/fetchallpayments",fetchuser,async(req,res)=>{
    try {
        const person = await User.findOne({user : req.user.id});
        res.json(person.payment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});

router.post("/set_payment", fetchuser,async(req , res) =>{
    const {name, amount} = req.body;
    try{
        let user = await User.findOne({user:req.user.id});
        
        user.payment.push({name : name, amount : amount});

        user.spend += amount;

        await user.save();

        res.send(user.payment);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error !");
    }
})

router.delete("/delete_payment",fetchuser, async(req, res) =>{
    const {id} = req.body;
    try{
        let pay = await User.update({_id : req.user.id},{$pull : {payment : {_id : id}}});
        res.json({success :true,pay : pay});
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});

router.put("/update_budget", fetchuser, async (req, res) => {
    try{

        const data = {};
        
        data.budget = req.body.budget;
        
        let user =  await User.findByIdAndUpdate(req.user.id, {$set : data});

        res.json(user);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});

router.put("/update_spend", fetchuser, async (req, res) => {
    try{

        const data = {};
        
        data.spend = req.body.spend;
        
        let user =  await User.findByIdAndUpdate(req.user.id, {$set : data});

        res.json(user);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});

router.get("/fetchallfriends",fetchuser,async(req,res)=>{
    try {
        const person = await User.findOne({user : req.user.id});
        res.json(person.friends);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error !");
    }
});

router.post("/set_friends", fetchuser,async(req , res) =>{
    const {email} = req.body;
    try{
        let user = await User.findOne({user:req.user.id});
        
        let friend = await User.findOne({email});

        if(!friend){
            return res.status(400).json({error : "User Not Found !"});
        }

        friend.friends.push({id : user._id, name : user.name, amount : 0});

        await friend.save();

        user.friends.push({id : friend._id, name : friend.name, amount : 0});

        await user.save();

        res.json({success : "Friend added Successfully !"});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error !");
    }
})

module.exports = router;