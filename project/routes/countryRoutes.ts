import express from 'express'
import { getAllCountries, newCountry, getCountry, getStatesByCountry } from '../controllers/countryController'
const router = express.Router()

router.route('/').get(getAllCountries).post(newCountry)
router.get('/:code', getCountry)
router.get('/:code/states', getStatesByCountry)

module.exports = router;
export {}