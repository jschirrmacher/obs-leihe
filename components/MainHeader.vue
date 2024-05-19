<script setup lang="ts">
const router = useRouter()
const token = useCookie("token")

function setTheme(theme: string) {
  useColorMode().preference = theme
}

function profile() {
  router.push("/chgpwd")
}

function logout() {
  token.value = undefined
  router.push("/login")
}

const items = [
  [
    {
      label: "System",
      icon: "i-heroicons-arrow-path-rounded-square",
      click: () => setTheme("system"),
    },
    {
      label: "Dark",
      icon: "i-heroicons-moon",
      click: () => setTheme("dark"),
    },
    {
      label: "Light",
      icon: "i-heroicons-sun",
      click: () => setTheme("light"),
    },
  ],
  [
    {
      label: "Passwort ändern",
      icon: "i-heroicons-user",
      click: profile,
    },
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      click: logout,
    },
  ],
]
</script>

<template>
  <div class="flex justify-between">
    <h1>OBS Leihe</h1>
    <UDropdown :items="items" :popper="{ arrow: true }">
      <UButton color="white" trailing-icon="i-heroicons-bars-4" />
    </UDropdown>
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
}
</style>
