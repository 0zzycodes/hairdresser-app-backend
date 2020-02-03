const express = require('express');
const { getPush, postPush } = require('../controllers/pusher-controller');
const router = express.Router();

router
  .route('/auth')
  .get(getPush)
  .post(postPush);

module.exports = router;
