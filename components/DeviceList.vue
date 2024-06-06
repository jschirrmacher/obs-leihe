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

const deviceDialogOpen = ref(false)

function newDevice() {
  deviceDialogOpen.value = true
}

const ui = { body: { padding: "px-2 py-2 sm:p-3" } }
</script>

<template>
  <div v-if="token" class="device-list">
    <UCard v-for="device in devices" :key="device.id" class="shadow-lg" :ui="ui" @click="selectedDeviceId = device.id">
      <DeviceDialog v-if="device.id === selectedDeviceId" :device="device" @close="selectedDeviceId = undefined" />
      <DeviceTile :device="device" />
    </UCard>
  </div>

  <div class="buttons">
    <UButton @click="newDevice">Neuen OBS anlegen</UButton>
  </div>

  <NewDeviceDialog v-if="deviceDialogOpen" @close="deviceDialogOpen = false" />
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

@media screen and (max-width: 1024px) {
  .device-list > div {
    width: calc(100% / 2 - 8px);
  }
}

@media screen and (max-width: 512px) {
  .device-list > div {
    width: 100%;
  }
}
</style>
