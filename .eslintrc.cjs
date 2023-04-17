module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    project: "./tsconfig.eslint.json",
    sourceType: "module",
  },
  plugins: ["prettier", "react", "react-hooks", "@typescript-eslint"],
  rules: {
    camelcase: "off",
    "react/react-in-jsx-scope": "off",
    "spaced-comment": [
      "error",
      "always",
      {
        markers: ["/"],
      },
    ],
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-invalid-void-type": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/restrict-plus-operands": [
      "error",
      {
        allowAny: true,
      },
    ],
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow",
      },
    ],
    "@typescript-eslint/triple-slash-reference": [
      "error",
      {
        types: "always",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
