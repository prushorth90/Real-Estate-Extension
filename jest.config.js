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
