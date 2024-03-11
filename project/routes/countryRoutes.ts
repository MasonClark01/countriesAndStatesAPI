const express = require('express')
const router = express.Router()
const { getAllCountries, newCountry, getCountry } = require('../controllers/countryController')

router.route('/').get(getAllCountries).post(newCountry)
router.get('/:id', getCountry)

module.exports = router;
export {}