/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    passWithNoTests: true,
    verbose: true,
    prettierPath: null,
    transformIgnorePatterns: [
  '/node_modules/.pnpm/(?!superjson)',
],
}