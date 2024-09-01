import type { JestConfigWithTsJest } from "ts-jest"

const config: JestConfigWithTsJest = {
  setupFiles: ["./__mocks__/chrome.ts"],
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/__mocks__/"],
  transform: {
    "^.+.ts$": ["ts-jest", {}],
  },
}
export default config
