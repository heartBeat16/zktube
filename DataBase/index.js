const express = require("express");
require('dotenv').config()
const { default: mongoose } = require("mongoose");
const Link = require("./models/Link");
const cors = require('cors');
const Ip = require("./models/Ip_url");
const app = express()
const MONGO_URI =
  process.env.MONGO_URI;

app.use(cors({credentials: true}))
app.use(express.json())

app.post('/', async (req, res) => {
    const {URL} = req.body;
    const videoId = URL.split('v=')[1]
    await Link.create({videoId})
    res.json({message: "Link added successfully"})
})

app.get('/:videoId',async (req, res) => {
  const {videoId} = req.params
  const exists = await Link.findOne({videoId: videoId})
  if(exists) {
    res.json({message: true})
  }
  else {
    res.json({message: false})
  }
})

app.get('/verify/:videoId', async(req, res) => {
  const {videoId} = req.params
  const IP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ip = await Ip.findOne({ IP });
  if (!ip) {
    res.json({message: false})
  }
  else{
    const Links = ip.Links;
    if (Links.includes(videoId)) {
      res.json({message: true})
    }
    else {
      res.json({message: false})
    }
  }
})

app.patch('/addIP', async(req, res) => {
  const {URL} = req.body
  const videoId = URL.split("v=")[1];
  const IP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const ip = await Ip.findOne({IP})
  if (ip) {
    var Links = ip.Links;
    if (!Links.includes(videoId)){
    Links = [...Links, videoId];
    await Ip.findOneAndUpdate({ IP }, { Links: Links }, { new: true });
    res.json({ message: "Successful" , iP: IP});}
    else {
      res.json({message: "Link already exists"})
    }
  }
  else {
    await Ip.create({ IP, Links: [videoId] });
    res.json({ message: "Successful" , iP: IP});
  }
})

app.listen(4000,async () => {
    await mongoose.connect(MONGO_URI)
    // await Link.create({URL: "HI This is testing"})
    console.log('Database Connected')
    console.log('App running successfully')
})

console.log('Hardik')