const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    roots: ['<rootDir>/__tests__', '<rootDir>/src'],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json',
            diagnostics: false,
        },
    },
    testRegex: '(/__tests__/*.test|spec)\\.tsx?$',
    testEnvironment: 'jsdom',
    collectCoverage: true,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
        '\\.css$': '<rootDir>/__mocks__/styleMocks.js',
        '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    },
    snapshotSerializers: ['jest-emotion'],
    setupFiles: ['jest-canvas-mock'],
};
