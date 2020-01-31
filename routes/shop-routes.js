const express = require('express');
const {
  getShops,
  addShop
} = require('../controllers/shop-controller')
const router = express.Router()

router.route('/').get(getShops).post(addShop)

module.exports = router