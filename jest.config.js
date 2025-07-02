/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest", 
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/dist/"], 
  roots: ["<rootDir>/src"], 
};
