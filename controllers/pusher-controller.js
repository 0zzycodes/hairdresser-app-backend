const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '941202',
  key: 'bfa794d9a749bee1f67d',
  secret: '8dc1ec5dcbac311e88c3',
  cluster: 'eu'
});
exports.getPush = function(req, res, next) {
  const query = req.query;
  const socketId = query.socket_id;
  const channel = query.channel_name;
  const callback = query.callback;

  const auth = JSON.stringify(pusher.authenticate(socketId, channel));
  const cb = callback.replace(/\"/g, '') + '(' + auth + ');';

  res.set({
    'Content-Type': 'application/javascript'
  });

  res.send(cb);
};

exports.postPush = function(req, res, next) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
};
