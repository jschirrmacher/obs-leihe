// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/test-utils/module"],
  typescript: {
    typeCheck: true,
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
    storage: {
      data: { driver: "fs", base: "/app/.data/kv" },
    },
    devStorage: {
      data: { driver: "fs", base: "./.data/kv" },
    },
  },
  build: {
    transpile: ["jsonwebtoken", "@vuepic/vue-datepicker", "@nuxt/test-utils/module"],
  },
})
