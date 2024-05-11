<script setup lang="ts">
import type { OBSDevice } from "~/types"

const devices = useState<OBSDevice[]>("devices")
const selectedDeviceId = ref<string>()
</script>

<template>
  <div class="device-list">
    <UCard
      v-for="device in devices"
      :key="device.id"
      @click="selectedDeviceId = device.id"
    >
      <EditableDeviceTile
        v-if="device.id === selectedDeviceId"
        :device="device"
        @unselect="selectedDeviceId = undefined"
      />
      <DeviceTile v-else :device="device" />
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
