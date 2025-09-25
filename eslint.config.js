import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  ...compat.config({
    extends: ['eslint:recommended', 'next', 'next/core-web-vitals', 'next/typescript', 'prettier'],
    ignorePatterns: [
      'node_modules/',
      '.next/',
      'dist/',
      'build/',
      'coverage/',
      '.swc/',
      'pnpm-lock.yaml',
      'storybook-static/',
      'next-env.d.ts',
      '.storybook',
    ],
  }),
]

export default eslintConfig
