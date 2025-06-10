const mongoose = require("mongoose");

const urlschema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory : [{timestamp : {type:Date},ip : {type:String}}],
}, {timestamps:true});

const URL = mongoose.model("url",urlschema);
module.exports = URL;