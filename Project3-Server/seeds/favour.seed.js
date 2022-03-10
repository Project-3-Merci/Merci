const mongoose = require('mongoose');

const User = require('../models/User.model');
const Favour = require('../models/Favour.model');

require("dotenv/config")

// ℹ️ Connects to the database
require("../db/index");

// User.collection.drop();

const favours = [{
    description: "Coca Cola Light 5L",
    location: "Pamplona 96",
    locationLat: -97,
    locationLong: 54 ,
    token: 10
},
{
    description: "Porros",
    location: "El Raval",
    locationLat: -97,
    locationLong: 54 ,
    token: 50
},
{
    description: "Carlos' Favour",
    location: "Carlos' House",
    locationLat: -97,
    locationLong: 54 ,
    token: 40
},
{
    description: "Hamburguesa Tex Mex (Con Jalapeños extra)",
    location: "Ironhack",
    locationLat: -97,
    locationLong: 54 ,
    token: 10
},
{
    description: "Traer Mochila",
    location: "Entregar mi mochila",
    locationLat: -97,
    locationLong: 54 ,
    token: 30
}

];

Favour.create(favours)
  .then(favours => {
    console.log(`Created ${favours.length} favours`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating fake users in the DB: ${err}`));
