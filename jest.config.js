// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest/utils');

// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
const { compilerOptions } = require('./tsconfig');


module.exports = {
    //moduleNameMapper:{ '^@/(.*)$': '<rootDir>/src/$1', },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  "testRegex": "(/__tests__1/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
};
