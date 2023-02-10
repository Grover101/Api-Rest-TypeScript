/** @type {import('ts-jest').JestConfigWithTsJest} */
// const { pathsToModuleNameMapper } = require('ts-jest')
// const { compilerOptions } = require('./tsconfig.json')

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@routes(.*)': '<rootDir>/src/routes/$1',
        '^@controllers(.*)': '<rootDir>/src/controllers/$1',
        '^@models(.*)': '<rootDir>/src/models/$1',
        '^@config(.*)': '<rootDir>/src/config/$1',
        '^@utils(.*)': '<rootDir>/src/utils/$1',
        '^@services(.*)': '<rootDir>/src/services/$1',
        '^@app': '<rootDir>/src/app.ts'
    }
    // moduleNameMapper: pathsToModuleNameMapper(
    //     compilerOptions.paths /*, { prefix: '<rootDir>/' } */
    // )
}
