import express from 'express'
import { getAllStates, newState, getState } from '../controllers/stateController'
const router = express.Router()

router.route('/').get(getAllStates).post(newState)
router.get('/:code', getState)

module.exports = router;
export {}