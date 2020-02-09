const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, 'Please add a verification code'],
    unique: true,
    trim: true
  },
  otp: {
    type: String,
    required: [true, 'Please add a otp code'],
    unique: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Phone', PhoneSchema);
