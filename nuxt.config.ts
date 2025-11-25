// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-25',
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
    prerender: {
      routes: ['/'],
      crawlLinks: false,
    },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker", "@nuxt/test-utils/module"],
  },
})
