import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const validateRegistrationInput = [
	// Validate email
	body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),

	// Validate password
	body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),

	// Validate name
	body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name should be at least 2 characters long'),

	// Handle validation errors
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		next()
	},
]
