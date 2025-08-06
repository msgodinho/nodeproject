import type { FastifyRequest } from 'fastify'

export async function getMethodAndUrl(req: FastifyRequest) {
	console.log(`[${req.method}] ${req.url}`)
}
