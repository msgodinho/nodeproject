import fastify from 'fastify'
import { setupKnex } from './database.js'
import { env } from '../env/index.js'
import { transactionsRoutes } from "../routes/'transactions.js"

const app = fastify()

app.register(transactionsRoutes)

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log(`HTTP Server Running on port ${env.PORT}`)
	})
