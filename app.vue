<script setup lang="ts">
import type { OBSDevice } from "./types"

const devices = useState<OBSDevice[]>("devices")
await callOnce(
  async () => (devices.value = await $fetch<OBSDevice[]>("/api/devices")),
)
</script>

<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>OBS Leihe</h1>
          <ColorScheme
            ><USelect
              v-model="$colorMode.preference"
              :options="['system', 'light', 'dark']"
          /></ColorScheme>
        </div>
      </template>

      <NuxtPage />
    </UCard>
  </UContainer>
</template>

<style scoped>
h1 {
  font-size: 24px;
}
</style>