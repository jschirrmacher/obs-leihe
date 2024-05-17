<script setup lang="ts">
import { useCookie, useFetch, useState } from "nuxt/app"
import type { OBSDevice } from "../types"
import { ref } from "vue"

const devices = useState<OBSDevice[]>("devices")
const selectedDeviceId = ref<string>()

const token = useCookie("token")
if (token.value) {
  const devices = useState<OBSDevice[]>("devices")
  try {
    const Authorization = `Bearer ${token.value}`
    const { data: loadedDevices } = await useFetch<OBSDevice[]>("/api/devices", { headers: { Authorization } })
    devices.value = loadedDevices.value || []
  } catch (error) {
    console.error(error)
    throw new Error("Lesen der gespeicherten Daten fehlgeschlagen")
  }
}
</script>

<template>
  <div v-if="token" class="device-list">
    <UCard v-for="device in devices" :key="device.id" @click="selectedDeviceId = device.id">
      <DeviceDialog
        v-if="device.id === selectedDeviceId"
        :device="device"
        @close="selectedDeviceId = undefined"
      />
      <DeviceTile :device="device" />
    </UCard>
  </div>
</template>

<style>
.device-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.device-list > div {
  width: calc(100% / 3 - 12px);
  cursor: pointer;
}

@media screen and (max-width: 1000px) {
  .device-list > div {
    width: calc(100% / 2 - 8px);
  }
}

@media screen and (max-width: 500px) {
  .device-list > div {
    width: 100%;
  }
}
</style>
