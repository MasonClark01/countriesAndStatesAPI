import express from 'express'
import { getAllStates, newState, getState } from '../controllers/stateController'
const router = express.Router()

router.route('/').get(getAllStates).post(newState)
router.get('/:id', getState)

module.exports = router;
export {}