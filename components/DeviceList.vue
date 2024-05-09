<script setup lang="ts">
import type { OBSDevice } from "~/types"

const { data: devices, pending, error } = await useAsyncData("devices", () =>
  $fetch<OBSDevice[]>("/api/devices"),
)

const columns = [
  { key: "id", label: "Kennung", sortable: true },
  { key: "deviceId", label: "DeviceId" },
  { key: "firmware", label: "Firmware", sortable: true },
  { key: "flash", label: "Flash", sortable: true },
  { key: "security", label: "Security" },
  { key: "comments", label: "Kommentare" },
  { key: "currentUserId", label: "Aktueller Nutzer" },
]
</script>

<template>
  <div v-if="pending">...</div>
  <div v-if="error">{{ error }}</div>
  <UTable :rows="devices || []" :columns="columns" />
</template>

<style></style>
