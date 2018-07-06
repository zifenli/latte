const redis  = require('redis');

const sub = redis.createClient();
const pub = redis.createClient();

sub.on('subscribe', (channel, count) => {
  console.log(channel + ' subscribe in');
})

module.exports = {
  sub,
  pub
};