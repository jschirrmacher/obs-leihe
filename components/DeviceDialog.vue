<script setup lang="ts">
import { useDeviceStore } from "~/composables/DevicesStore"
import type { OBSDevice } from "~/types"

const props = defineProps<{ device?: OBSDevice }>()
const emit = defineEmits(["close"])

type State = ReturnType<typeof getInitialValues>

const { createDevice, createNewRental, endRental, removeDevice, updateDevice } = useDeviceStore()
const state = ref<State>(getInitialValues())
const open = ref(true)
const messages = useMessages()

function getInitialValues() {
  return {
    id: props.device?.id || "",
    deviceId: props.device?.deviceId || "",
    security: props.device?.security || "",
    firmware: props.device?.firmware || "",
    flash: props.device?.flash || "",
    comments: props.device?.comments || "",
    ready: props.device?.ready === true,
    newRentalUserId: "",
    newRentalFrom: new Date(),
    returnDate: undefined as Date | undefined,
  }
}

function reset() {
  state.value = getInitialValues()
}

onMounted(reset)
watch(() => props.device, reset)

function endEditing() {
  reset()
  emit("close")
}

async function save() {
  try {
    if (props.device === undefined) {
      await createDevice(state.value)
    } else {
      if (state.value.newRentalUserId && state.value.newRentalFrom) {
        await createNewRental(state.value.id, state.value.newRentalUserId, state.value.newRentalFrom)
        state.value.newRentalUserId = ""
        state.value.newRentalFrom = new Date()
      } else if (state.value.returnDate) {
        await endRental(state.value.id, state.value.returnDate)
        state.value.returnDate = undefined
      }
      await updateDevice(state.value)
    }

    messages.info("Daten wurden gespeichert")
    endEditing()
  } catch (error) {
    messages.error(error)
  }
}

async function remove() {
  await removeDevice(state.value.id)
  endEditing()
}
</script>

<template>
  <UModal v-model="open" prevent-close class="custom-modal" :ui="{ width: 'w-full md:max-w-fit' }">
    <UForm :state="state" class="device-tile" @submit="save">
      <div class="left">
        <IdBadge v-if="device" :device="device" class="device" />
        <UInput v-else v-model="state.id" placeholder="Eigene Kennung" />
        <UInput v-model="state.security" placeholder="Code" />
        <UInput v-model="state.deviceId" placeholder="Geräte-ID" />
      </div>

      <div class="right">
        <UCheckbox v-model="state.ready" label="Einsatzbereit" />
        <UInput v-model="state.firmware" placeholder="Firmware version" />
        <UInput v-model="state.flash" placeholder="Flash version" />
      </div>

      <UTextarea v-model="state.comments" placeholder="Zusätzliche Informationen" class="comment" />

      <div class="history">
        <DeviceRentals
          v-if="device"
          v-model:return-date="state.returnDate"
          v-model:new-rental-user-id="state.newRentalUserId"
          v-model:new-rental-from="state.newRentalFrom"
          :device="device"
        />
      </div>

      <div class="buttons">
        <UButton v-if="device" variant="solid" color="red" class="remove" @click.stop="remove">Löschen</UButton>
        <UButton variant="outline" @click.stop="endEditing">Abbrechen</UButton>
        <UButton type="submit">Speichern</UButton>
      </div>
    </UForm>
  </UModal>
</template>

<style scoped>
.device-tile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "left right" "comment comment" "history history" "buttons buttons";
  align-items: start;
  margin: 1rem;
  gap: 10px;
}

@media screen and (min-width: 768px) {
  .device-tile {
    grid-template-columns: auto auto 1fr;
    grid-template-areas: "left right history" "comment comment comment" "buttons buttons buttons";
  }
}
.left {
  grid-area: left;
}
.right {
  grid-area: right;
}
.history {
  grid-area: history;
}
.left,
.right,
.history {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
}
.comment {
  grid-area: comment;
}
textarea {
  width: 100%;
  height: 5rem;
  padding: 3px;
}
.buttons {
  grid-area: buttons;
}
.remove {
  margin-right: auto;
}
</style>
