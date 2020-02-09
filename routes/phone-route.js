const express = require('express');
const {
  getPhoneVerificationCodes,
  addPhoneVerificationCode
} = require('../controllers/phone-controller');
const router = express.Router();

router
  .route('/')
  .post(getPhoneVerificationCodes)
  .post(addPhoneVerificationCode);

module.exports = router;
