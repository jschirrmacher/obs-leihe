<script setup lang="ts">
import type { OBSDevice } from "~/types"

const props = defineProps<{ device: OBSDevice }>()

const devices = useState<OBSDevice[]>("devices")

const color = computed(() =>
  props.device.faulty
    ? "red"
    : props.device.currentUserId
      ? "amber"
      : "emerald",
)

const editMode = ref<boolean>(false)
const editData = ref({
  comments: "",
})

function startEditing() {
  editData.value.comments = props.device.comments
  editMode.value = true
}

function endEditing() {
  editMode.value = false
}

async function saveAndEndEditing() {
  const result = await $fetch<OBSDevice>("/api/devices/" + props.device.id, {
    method: "PATCH",
    body: JSON.stringify(editData.value),
  })
  devices.value = devices.value.map((d) => (d.id === result.id ? result : d))
  endEditing()
}
</script>

<template>
  <div @click="startEditing">
    <UBadge :color="color">{{ device.id }}</UBadge>
    <div class="right">
      {{ device.deviceId }}<br />
      <div class="small">Firmware: {{ device.firmware || "?" }}</div>
      <div class="small">Flash: {{ device.flash || "?" }}</div>
      <div class="small">Code: {{ device.security || "?" }}</div>
    </div>

    <div>{{ device.currentUserId }}</div>

    <UTextarea v-if="editMode" v-model="editData.comments"></UTextarea>
    <div v-else class="small comment">{{ device.comments }}</div>

    <div class="button-group" v-if="editMode">
      <UButton @click.stop="endEditing">Abbrechen</UButton>
      <UButton @click.stop="saveAndEndEditing">Speichern</UButton>
    </div>
  </div>
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
textarea {
  width: 100%;
  height: 5rem;
  padding: 3px;
}
.button-group {
  display: flex;
  gap: 5px;
  padding-top: 2rem;
}
</style>
