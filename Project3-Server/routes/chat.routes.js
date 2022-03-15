const express = require("express");
const User = require("../models/User.model");
const Message = require("../models/Message.model");
const Chat = require("../models/Chat.model")

const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();


router.get("/:userId/:otherUserId", (req,res,next)=>{
    Chat.find({$or:[
        {$and:[
            {user1:{$eq:req.params.userId}},
            {user2:{$eq:req.params.otherUserId}},
        ]},
        {$and:[
            {user1:{$eq:req.params.otherUserId}},
            {user2:{$eq:req.params.userId}},
        ]}
    ]})
    .populate({path: "messagess", model: Message})
    .populate({path:"user1", model: User})
    .populate({path:"user2", model: User})
    .then(chats=>{
        res.status(200).json({messages: chats[0].messagess, users:[chats[0].user1, chats[0].user2]})
    })
})


router.get("/:userId", (req,res,next)=>{
    Chat.find({$or:[{user1:{$eq:req.params.userId}},{user2:{$eq:req.params.userId}}]})
    .populate({path:"user1",model:User})
    .populate({path:"user2",model:User})
    .then(chats=>{
        res.status(200).json(chats)
    })
})

router.post("/create",(req,res,next)=>{
    const {user1, user2} = req.body;

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