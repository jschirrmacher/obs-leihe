<script setup lang="ts">
import type { User } from "~/types"

const router = useRouter()
const token = useCookie("token")
const user = useState("user") as Ref<User>
const colorMode = useColorMode()

function themeSetter(label: string, theme: string, icon: string) {
  return {
    label,
    icon: "i-heroicons-" + icon,
    click: () => (colorMode.preference = theme),
    labelClass: "theme-" + theme,
  }
}

const username = computed(() => {
  return user.value?.username
})

const selected = computed(() => (item: { labelClass: string }) => {
  const match = item.labelClass?.match(/\btheme-(system|dark|light)/)
  return match?.at(1) === colorMode.preference
})

function logout() {
  token.value = undefined
  router.push("/login")
}

const items = [
  [
    { label: "", slot: "account", disabled: true },
    { label: "Passwort ändern", icon: "i-heroicons-user", to: "/chgpwd" },
  ],
  [
    themeSetter("System", "system", "arrow-path-rounded-square"),
    themeSetter("Dark", "dark", "moon"),
    themeSetter("Light", "light", "sun"),
  ],
  [{ label: "Logout", icon: "i-heroicons-arrow-right-start-on-rectangle", click: logout }],
]
</script>

<template>
  <div class="flex justify-between">
    <h1>OBS Leihe</h1>
    <UDropdown :items="items" :popper="{ arrow: true }">
      <UButton color="white" trailing-icon="i-heroicons-bars-4" />

      <template #account>
        <p>Angemeldet als</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ username }}
        </p>
      </template>

      <template #item="{ item }">
        <div class="dropdown-item">
          <UIcon :name="item.icon" />
          &nbsp;
          <span class="item-text">{{ item.label }}</span>
          <UIcon name="i-heroicons-check" v-if="selected(item)"></UIcon>
        </div>
      </template>
    </UDropdown>
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
}
.dropdown-item {
  display: flex;
  width: 100%;
}
.dropdown-item .item-text {
  flex-grow: 1;
  text-align: left;
}
</style>
