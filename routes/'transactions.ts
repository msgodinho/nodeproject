import type { FastifyInstance } from 'fastify'
import { setupKnex } from '../src/database.js'

export async function transactionsRoutes(app: FastifyInstance) {
	app.get('/', async (req, res) => {
		const transactions = await setupKnex('transactions').select('*')

		return transactions
	})
}
