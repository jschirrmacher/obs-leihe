// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui"],
  typescript: {
    typeCheck: true,
  },
  nitro: {
    storage: {
      data: { driver: "fs", base: "/app/.data/kv" },
    },
    devStorage: {
      data: { driver: "fs", base: "./.data/kv" },
    },
  },
})
