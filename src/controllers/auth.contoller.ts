import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const user = await prisma.employee.findUnique({
			where: {
				email: email,
			},
			select: {
				email: true,
				password: true,
			},
		})
		if (!user) {
			return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: 'user not exist.' })
		}
		const isMatch = await comparePassword(password, user.password)
		if (!isMatch) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ status: StatusCodes.UNAUTHORIZED, message: 'password did not match.' })
		}
		return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: 'login success.' })
	} catch (e: any) {
		return res.status(StatusCodes.CONFLICT).json({ status: StatusCodes.CONFLICT, message: e.massage })
	}
}
export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, name } = req.body
		const user = await prisma.employee.findUnique({
			where: {
				email: email,
			},
		})
		if (user) {
			return res.status(StatusCodes.CONFLICT).json({ status: StatusCodes.CONFLICT, message: 'user already exist.' })
		}
		await prisma.employee.create({
			data: {
				email: email,
				password: await encyptPassword(password),
				name: name,
			},
		})
		return res.status(StatusCodes.CREATED).json({ status: StatusCodes.CREATED, message: 'user created successfully.' })
	} catch (e: any) {
		console.log(e)
		return res.status(StatusCodes.CONFLICT).json({ status: StatusCodes.CONFLICT, message: e.massage })
	}
}
const encyptPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}
const comparePassword = async (password: string, comparePassword: string) => {
	const isMatch = await bcrypt.compare(password, comparePassword)
	return isMatch
}
