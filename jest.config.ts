/* eslint-disable import/no-anonymous-default-export */
import type { Config } from "@jest/types";
export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
     displayName: {
     name: "ownpath",
     color: "greenBright",
   },
   verbose: true,
   setupFiles: ["dotenv/config"],
   testMatch: ["**/**/*.test.tsx"],
   testEnvironment: "node",
   detectOpenHandles: true,
   collectCoverage: true,
   transform: { "^.+\\.tsx?$": "ts-jest" },
   globalTeardown: "<rootDir>/src/__tests__/jest-globals-teardown.ts",
   forceExit: true,
 };
};