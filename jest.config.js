module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  collectCoverageFrom: [
    'src/**/*.{ts,ts}',
    '!src/prisma/**',
    '!src/schema/**/index.ts',
    '!src/schema/**/types.ts',
    '!src/schema/generated/**',
    '!src/utils/logger.ts',
    // TODO: collect coverage from here and test db when
    // requirements have been refined
    '!src/db/**',
  ],
  // https://jestjs.io/docs/en/configuration#coveragethreshold-object
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  // https://jestjs.io/docs/en/configuration#displayname-string-object
  displayName: 'SERVER',
}
