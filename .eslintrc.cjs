module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "react", "react-hooks", "@typescript-eslint"],
  rules: {
    camelcase: "off",
    "react/react-in-jsx-scope": "off",
    "spaced-comment": ["error", "always", { markers: ["/"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
