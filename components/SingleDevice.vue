<script setup lang="ts">
import type { OBSDevice } from "~/types"

const props = defineProps<{ device: OBSDevice }>()

const color = computed(() =>
  props.device.faulty
    ? "red"
    : props.device.currentUserId
      ? "amber"
      : "emerald",
)
</script>

<template>
  <UBadge :color="color">{{ device.id }}</UBadge>
  <div class="right">
    {{ device.deviceId }}<br />
    <div class="small">Firmware: {{ device.firmware || "?" }}</div>
    <div class="small">Flash: {{ device.flash || "?" }}</div>
    <div class="small">Code: {{ device.security || "?" }}</div>
  </div>
  <div>{{ device.currentUserId }}</div>
  <div class="small comment">{{ device.comments }}</div>
</template>

<style scoped>
.right {
  float: right;
  margin: 0 0 0.5rem 0.5rem;
  padding: 0.5rem;
  border: 1px solid lightgray;
}
.small {
  font-size: 80%;
}
.comment {
  margin-top: 1rem;
}
</style>
