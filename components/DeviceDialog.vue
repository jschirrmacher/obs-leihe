<script setup lang="ts">
import { getISODateString } from "~/lib/DateUtils"
import type { OBSDevice } from "~/types"

const props = defineProps<{ device: OBSDevice }>()
const emit = defineEmits(["close"])

type State = ReturnType<typeof getInitialValues>

const devices = useState<OBSDevice[]>("devices")
const state = ref<State>(getInitialValues())
const returnDate = ref<Date>()
const newRentalUserId = ref<string>()
const newRentalFrom = ref<Date>()
const open = ref(true)

function getInitialValues() {
  return {
    firmware: props.device.firmware,
    flash: props.device.flash,
    comments: props.device.comments,
    ready: props.device.ready,
    returnDate: "",
  }
}

function reset() {
  state.value = getInitialValues()
  newRentalUserId.value = undefined
  newRentalFrom.value = new Date()
}

onMounted(reset)
watch(() => props.device, reset)

function endEditing() {
  reset()
  emit("close")
}

function saveData(): { url: string; method: "POST" | "PATCH"; body: BodyInit } {
  if (newRentalUserId.value && newRentalFrom.value) {
    const body = JSON.stringify({ userId: newRentalUserId.value, from: getISODateString(newRentalFrom.value) })
    return { url: "/rentals", method: "POST", body }
  } else {
    state.value.returnDate = getISODateString(returnDate.value!)
    return { url: "", method: "PATCH", body: JSON.stringify(state.value) }
  }
}

async function saveAndEndEditing() {
  const { url, method, body } = saveData()
  const result = await $fetch<OBSDevice>("/api/devices/" + props.device.id + url, { method, body })
  devices.value = devices.value.map((d) => (d.id === result.id ? result : d))
  endEditing()
}

async function remove() {
  const result = await $fetch<{ removed: boolean }>("/api/devices/" + props.device.id, { method: "DELETE" })
  devices.value = devices.value.filter(d => d.id !== props.device.id)
  endEditing()
}
</script>

<template>
  <UModal v-model="open" prevent-close class="custom-modal" :ui="{ width: 'w-full md:max-w-fit' }">
    <UForm :state="state" class="device-tile" @submit="saveAndEndEditing">
      <div class="info">
        <div class="device">
          <IdBadge :device="device" />
          <UCheckbox v-model="state.ready" label="Einsatzbereit" />
        </div>

        <div>{{ device.deviceId }}</div>
        <div class="small">Code: {{ device.security || "?" }}</div>
        <UInput v-model="state.firmware" placeholder="Firmware version" class="input" />
        <UInput v-model="state.flash" placeholder="Flash version" class="input" />
      </div>

      <UTextarea v-model="state.comments" placeholder="Zusätzliche Informationen" class="comment" />

      <div class="history">
        <DeviceRentals
          v-model:returnDate="returnDate"
          v-model:new-rental-user-id="newRentalUserId"
          v-model:new-rental-from="newRentalFrom"
          :device="device"
        />
      </div>

      <div class="buttons">
        <UButton variant="solid" color="red" class="remove" @click.stop="remove">Löschen</UButton>
        <UButton variant="outline" @click.stop="endEditing">Abbrechen</UButton>
        <UButton type="submit">Speichern</UButton>
      </div>
    </UForm>
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
}
textarea {
  width: 100%;
  height: 5rem;
  padding: 3px;
}
.input {
  margin-bottom: 3px;
}
.history {
  grid-area: history;
  margin-top: -0.5rem;
}
.remove {
  margin-right: auto;
}
</style>
