<script setup lang="ts">
import type { OBSDevice } from "~/types"

const props = defineProps<{ device: OBSDevice }>()
const emit = defineEmits(["unselect"])

const devices = useState<OBSDevice[]>("devices")

const editData = ref(props.device)

function setToInitialValues() {
  editData.value = JSON.parse(JSON.stringify(props.device))
}

onMounted(setToInitialValues)
watch(() => props.device, setToInitialValues)

function endEditing() {
  setToInitialValues()
  emit("unselect")
}

async function saveAndEndEditing() {
  const result = await $fetch<OBSDevice>("/api/devices/" + props.device.id, {
    method: "PATCH",
    body: JSON.stringify(editData.value),
  })
  devices.value = devices.value.map((d) => (d.id === result.id ? result : d))
  endEditing()
}

const open = ref(true)
</script>

<template>
  <UModal v-model="open" prevent-close class="custom-modal" :ui="{ width: 'w-full md:max-w-fit' }">
    <div class="device-tile">
      <div class="info">
        <div class="device">
          <IdBadge :device="device" />
          <UCheckbox v-model="editData.faulty" label="Defekt" />
        </div>

        {{ device.deviceId }}<br />
        <div class="small">Code: {{ device.security || "?" }}</div>
        <UInput v-model="editData.firmware" placeholder="Firmware version" class="input" />
        <UInput v-model="editData.flash" placeholder="Flash version" class="input" />
      </div>
      <UTextarea v-model="editData.comments" placeholder="Zusätzliche Informationen" class="comment"> </UTextarea>
      <DeviceRentals :rentals="device.rentals" class="history" />

      <div class="buttons">
        <UButton @click.stop="endEditing">Abbrechen</UButton>
        <UButton @click.stop="saveAndEndEditing">Speichern</UButton>
      </div>
    </div>
  </UModal>
</template>

<style scoped>
.device-tile {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas: "info history" "comment comment" "buttons buttons";
  margin: 1rem;
  gap: 10px;
}
.device {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.info {
  grid-area: info;
}
.small {
  font-size: 80%;
}
.comment {
  grid-area: comment;
  margin-top: 1rem;
}
textarea {
  width: 100%;
  height: 5rem;
  padding: 3px;
}
.buttons {
  display: flex;
  flex-direction: col;
  gap: 5px;
  padding-top: 2rem;
  justify-self: right;
  grid-area: buttons;
}
.input {
  margin-bottom: 3px;
}
</style>
