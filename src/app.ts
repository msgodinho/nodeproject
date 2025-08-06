import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from '../routes/transactions.js'
import { getMethodAndUrl } from './middlewares/log.js'

export const app = fastify()

app.register(cookie)

app.addHook('preHandler', getMethodAndUrl)
app.register(transactionsRoutes, {
	prefix: '/transactions',
})
