const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateShortUrl(req,res){
    if(!req.body.url) return res.status(400).json({message : "url is required!"});
    const shorturl = shortid();
    await URL.create({
        shortId : shorturl,
        redirectURL : req.body.url,
        visitHistory : []
    });
    res.json({id : shorturl});
}

async function handleGetRedirectUrl(req,res){
    const shortId = req.params.shortid;
    if(!shortid) return res.status(400).json({message : "short url is incorrect"});
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:[{
            timestamp : Date.now(),
            ip : req.ip
        }]
    }});
    res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortid;
    if(!shortId) return res.status(400).json({message:"shortid is required!"});
    const result = await URL.findOne({shortId});
    console.log(result);
    return res.json({totalClicks : result.visitHistory.length,visitHistory:result.visitHistory});
}

module.exports = {
    handleGenerateShortUrl,
    handleGetRedirectUrl,
    handleGetAnalytics,
}