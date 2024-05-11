<script setup lang="ts">
import type { OBSDevice } from "~/types"

const props = defineProps<{ device: OBSDevice }>()

const color = computed(() => {
  if (props.device.faulty) {
    return "red"
  } else if (props.device.currentUserId !== "") {
    return "amber"
  } else {
    return "emerald"
  }
})
</script>

<template>
  <UBadge :color="color">{{ device.id }}</UBadge>
</template>
