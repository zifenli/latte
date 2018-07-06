const path = require('path');
let router = require('express').Router();
const pub = require('../server/redis').pub;

router.get('', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static/index.html'));
})

router.post('/api/data/proxy/', (req, res) => {
  const channel = req.body.channel;

  pub.publish(channel, JSON.stringify(req.body));

  res.json({
    status: 200,
    channel: channel,
    data: JSON.stringify(req.body)
  });
})

module.exports = router;