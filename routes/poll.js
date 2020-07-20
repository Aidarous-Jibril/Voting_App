const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const Vote = require('../model/Vote');
const Pusher = require('pusher');

const keys = require('../config/keys');

var pusher = new Pusher({
  appId: keys.pusherAppId,
  key: keys.pusherKey,
  secret: keys.pusherSecret,
  cluster: keys.pusherCluster,
  encrypted: keys.pusherEncrypted
});
//Pusher config
// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   useTLS: process.env.PUSHER_ENCRYPTED,
// });


router.get('/', (req, res) => {
  Vote.find().then(votes => {
    return res.json({ success: true, votes: votes });
  })
});

router.post('/', (req, res) => {
  const newVote = {
    bp: req.body.bp,
    points: 1
  };
  //console.log(newVote)

  new Vote(newVote).save().then(vote => {
    console.log(vote)
    pusher.trigger('bp-poll', 'bp-vote', {
      points: 1,
      bp: vote.bp
    });
    
    return res.json({ success: true, message: 'Thank you for voting' });
  })
  
});

module.exports = router;
