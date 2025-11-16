/** @type {import("prettier").Config} */
const config = {
  semi: true,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,
  bracketSameLine: true,
  bracketSpacing: true,
  arrowParens: "always",
  plugins: ["prettier-plugin-tailwindcss"], // ← added plugin
};

module.exports = config;
