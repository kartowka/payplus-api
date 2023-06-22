import e, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const clockIn = async (req: Request, res: Response) => {
	const { email } = req.body
	const clockIn = await prisma.timeClock.create({
		data: {
			clockIn: new Date(),
			employee: { connect: { email: email } },
		},
	})
	return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: 'clocked in.', data: { clockIn } })
}
export const clockOut = async (req: Request, res: Response) => {
	const { email, clockId } = req.body
	const clockOut = await prisma.timeClock.update({
		where: {
			id: clockId,
		},
		data: {
			clockOut: new Date(),
		},
	})
	return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: 'clocked out.' })
}
export const clockBreakIn = async (req: Request, res: Response) => {
	const { email, clockId } = req.body
	const clockBreak = await prisma.timeClock.update({
		where: { id: clockId },
		data: {
			clockOutForBreakIn: new Date(),
		},
	})
	return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: 'clocked break.' })
}
export const clockBreakOut = async (req: Request, res: Response) => {
	const { email, clockId } = req.body
	const clockBreak = await prisma.timeClock.update({
		where: { id: clockId },
		data: {
			clockOutForBreakOut: new Date(),
		},
	})
	return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: 'clocked break out.' })
}
export const getClockData = async (req: Request, res: Response) => {
	const email: string = req.query.email as string
	if (!email) {
		return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: 'email must presented.' })
	}
	const user = await prisma.employee.findUnique({ where: { email: email } })
	if (!user) {
		return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: 'user not found.' })
	}
	const clocks = await prisma.timeClock.findMany({
		where: {
			employee: { email: email },
		},
	})
	const data: { clockIn: any; clockOut: any; totalHours: any; totalBreak: any; totalHoursWithoutBreak: any }[] = []
	clocks.forEach((clock: any) => {
		data.push({
			clockIn: clock.clockIn,
			clockOut: clock.clockOut,
			totalHours: new Date(clock.clockOut - clock.clockIn),
			totalBreak: new Date(clock.clockOutForBreakOut - clock.clockOutForBreakIn),
			totalHoursWithoutBreak: new Date(clock.clockOut - clock.clockOutForBreakOut + (clock.clockOutForBreakIn - clock.clockIn)),
		})
	})

	return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: 'clocks data.', data: data })
}
