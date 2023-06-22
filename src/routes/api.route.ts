import express from 'express'
import { login, register } from '../controllers/auth.contoller'
import { body } from 'express-validator'
import { validateRegistrationInput } from '../middlewares/register.middleware.validator'
import { validateLogin } from '../middlewares/login.middleware'
import { clockBreakIn, clockBreakOut, clockIn, clockOut, getClockData } from '../controllers/clock.controller'
const router = express.Router()

router.route('/login').post(validateLogin, login)
router.route('/logout').post(login)
router.route('/clockin').post(clockIn)
router.route('/clockout').post(clockOut)
router.route('/clockbreakin').post(clockBreakIn)
router.route('/clockbreakout').post(clockBreakOut)
router.route('/register').post(validateRegistrationInput, register)
router.route('/user').get(getClockData)

export default router
