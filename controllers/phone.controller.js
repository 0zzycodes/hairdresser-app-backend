const Phone = require('../models/Phone-model');
const accountSid = 'AC75f7f2a222e2cf88b59b80aa44d79d35';
const authToken = 'bbdf3f927fb55418ad6fcb1ff8ee4b65';
const client = require('twilio')(accountSid, authToken);

exports.getPhoneVerificationCodes = async (req, res, next) => {
  try {
    const codes = await Phone.find();
    codes.forEach(code => {
      if (code.otp === req.body.otp) {
        res.status(200).json({
          status: 'Success'
        });
      } else {
        throw 'Code Invalid';
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server Error'
    });
  }
};
// @desc Add shop
// @route Post /api/v1/shops
exports.addPhoneVerificationCode = async function(req, res, next) {
  try {
    const vCode = await Phone.create(req.body);
    client.messages
      .create({
        body: `Your verification code is ${req.body.otp}`,
        from: '+19158008588',
        to: `+234${req.body.phone}`
      })
      .then(message => console.log(message.sid));
    return res.status(200).json({
      status: 'Success',
      data: vCode
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'This code already exists'
      });
    }
    console.log(error);

    res.status(500).json({
      error: 'Server Error'
    });
  }
};
