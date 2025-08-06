import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { Linter } from 'eslint'

/** @type {Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		rules: {
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: '*', next: 'const' },
				{ blankLine: 'always', prev: 'const', next: 'return' },
			],
		},
	},
	prettier,
]
