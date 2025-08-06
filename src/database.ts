import type { Knex } from 'knex'
import knex from 'knex'
import { env } from '../env/index.js'

if (!process.env.DATABASE_URL) {
	throw new Error('DOTENV Database URL not found.')
}

export const config: Knex.Config = {
	client: 'sqlite',
	connection: {
		filename: env.DATABASE_URL,
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: './db/migrations',
	},
}

export const setupKnex = knex(config)
