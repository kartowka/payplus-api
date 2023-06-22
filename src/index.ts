import express, { Express } from 'express'
// import connectDB from './utils/db/config'
import { logger } from './utils/logger/config'
import apiRouter from './routes/api.route'
import dotenv from 'dotenv'
import { redirect404, requestResponseLogger, rateLimiter } from './middlewares'
dotenv.config()
const app: Express = express()
const PORT = Number(process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rateLimiter)
app.use(requestResponseLogger)
app.use('/api/v1/', apiRouter)
app.use(redirect404)
app.listen(PORT, async () => {
	logger.info(`server running on http://localhost:${PORT}`)
})
