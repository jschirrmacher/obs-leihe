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
</template>
