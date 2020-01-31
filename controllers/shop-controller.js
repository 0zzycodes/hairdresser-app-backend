const Shop = require('../models/Shop-model')
// @desc Get all Shops
// @route Get /api/v1/shops
exports.getShops = async (req, res, next) => {
  try {
    const shops = await Shop.find()
    return res.status(200).json({
      status: 'Success',
      result: shops.length,
      data: {
        shops
      }
    })
  } catch (error) {
    res.status(500).json({
      error: 'Server Error'
    })
  }
}
// @desc Add shop
// @route Post /api/v1/shops
exports.addShop = async function (req, res, next) {
  try {
    const shop = await Shop.create(req.body)
    return res.status(200).json({
      status: 'Success',
      data: shop
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'This shop already exists'
      });
    }
    console.log(error);

    res.status(500).json({
      error: 'Server Error'
    })
  }
}