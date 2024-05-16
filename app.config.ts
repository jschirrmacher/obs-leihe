export default defineAppConfig({
  theme: {
    colorMode: { preference: "dark" },
  },
  ui: {
    primary: "lime",
    gray: "neutral",
    notifications: {
      position: "top-0 bottom-auto",
    },
  },
  nuxtIcon: {}, // fix type-checkin error
})
