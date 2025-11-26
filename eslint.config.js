// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
  {
    ignores: [
      "node_modules/**",
      ".nuxt/**",
      ".output/**",
      "dist/**",
      ".data/**",
      "coverage/**"
    ]
  },
  {
    rules: {
      "import/no-duplicates": "off",
      "import/no-self-import": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
)
