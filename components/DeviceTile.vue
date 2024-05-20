<script setup lang="ts">
import type { OBSDevice } from "~/types"

defineProps<{ device: OBSDevice }>()
</script>

<template>
  <div class="device-tile">
    <div class="info">
      <IdBadge :device="device" />
      <div>{{ device.currentUserId }}</div>
    </div>

    <div class="tech-info">
      <div>{{ device.deviceId }}</div>
      <div class="small">Code: {{ device.security || "?" }}</div>
      <div class="small">Firmware: {{ device.firmware || "?" }}</div>
      <div class="small">Flash: {{ device.flash || "?" }}</div>
    </div>

    <div class="small comment">{{ device.comments }}</div>
  </div>
</template>

<style scoped>
.device-tile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "info tech-info" "comment comment";
}
.info {
  grid-area: info;
}
.tech-info {
  grid-area: tech-info;
  margin: 0 0 0.5rem 0.5rem;
  padding: 0.5rem;
  border: 1px solid lightgray;
}
.small {
  font-size: 80%;
}
.comment {
  grid-area: comment;
  margin-top: 1rem;
}
</style>
