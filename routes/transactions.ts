import type { FastifyInstance } from 'fastify'
import { setupKnex } from '../src/database.js'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../src/middlewares/check-session-id-exists.js'

export async function transactionsRoutes(app: FastifyInstance) {
	app.post('/', async (req, res) => {
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		})

		const { title, amount, type } = createTransactionBodySchema.parse(req.body)

		let sessionId = req.cookies.sessionId

		if (!sessionId) {
			sessionId = randomUUID()

			res.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7, // 7 days
			})
		}

		await setupKnex('transactions').insert({
			id: randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
			session_id: sessionId,
		})

		return res.status(201).send()
	})

	app.get('/', { preHandler: [checkSessionIdExists] }, async (req) => {
		const { sessionId } = req.cookies

		const transactions = await setupKnex('transactions')
			.select('*')
			.where('session_id', sessionId)

		return { transactions }
	})

	app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req) => {
		const getTransactionsParamsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = getTransactionsParamsSchema.parse(req.params)

		const { sessionId } = req.cookies

		const transaction = await setupKnex('transactions')
			.where({ id, session_id: sessionId })
			.first()

		return { transaction }
	})

	app.get('/summary', { preHandler: [checkSessionIdExists] }, async (req) => {
		const { sessionId } = req.cookies

		const summary = await setupKnex('transactions')
			.where('session_id', sessionId)
			.sum('amount', { as: 'amount' })
			.first()

		return { summary }
	})
}
