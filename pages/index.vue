<script setup lang="ts">
const items = [
  { label: "Geräte", content: "Geräte" },
  { label: "Nutzer", content: "Noch nicht implementiert" },
]
</script>

<template>
  <UTabs :items="items">
    <template #item="{ index }">
      <DeviceList v-if="index === 0" />
    </template>
  </UTabs>
</template>
