module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true,
    jest: true
  },
  plugins: ["@typescript-eslint"],
  extends: "plugin:@typescript-eslint/recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    indent: "off",
    semi: [ "never" ],
    "@typescript-eslint/indent": ["error", 2]
  }
};
