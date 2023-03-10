/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect",'./jest.setup.js'],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/identity-obj-proxy"
  },
  testEnvironment: "jsdom",
  globals: { fetch, Response, Request }
};

//config file provided https://www.npmjs.com/package/ts-jest
//moduleNameMapper - https://www.npmjs.com/package/identity-obj-proxy
//globals - https://stackoverflow.com/questions/71172209/why-do-i-get-reference-error-for-fetch-when-i-do-unit-tests-using-jest