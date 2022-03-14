const express = require("express");
const User = require("../models/User.model");
const Message = require("../models/Message.model");
const Chat = require("../models/Chat.model")

const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();

router.get("/:userId", (req,res,next)=>{
    Chat.find({$or:[{user1:{$eq:req.params.userId}},{user2:{$eq:req.params.userId}}]})
    .populate({path:"user1",model:User})
    .populate({path:"user2",model:User})
    .then(chats=>{
        res.status(200).json(chats)
    })
})

router.post("/create/:user1/:user2",(req,res,next)=>{
    const user1 = req.params.user1;
    const user2 = req.params.user2;

    Chat.find({$or:[
        {$and:[
            {user1:{$eq:user1}},
            {user2:{$eq:user2}},
        ]},
        {$and:[
            {user1:{$eq:user2}},
            {user2:{$eq:user1}},
        ]}
    ]})
    .then(chats=>{
        if(chats.length<1){
            Chat.create({user1, user2})
            .then(chat=>{
                res.status(200).json(chat)
            })
        }
        else{
            res.status(200).json(chats[0])
        }
    })


})

module.exports = router;