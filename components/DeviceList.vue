<script setup lang="ts">
import type { OBSDevice } from "~/types"
import SingleDevice from "./SingleDevice.vue"

const devices = useState<OBSDevice[]>("devices")
</script>

<template>
  <div class="device-list">
    <UCard v-for="device in devices" :key="device.id">
      <SingleDevice :device="device" />
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
