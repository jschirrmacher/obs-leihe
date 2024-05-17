<script setup lang="ts">
import type { OBSDevice } from "~/types"

const props = defineProps<{ device: OBSDevice }>()
const emit = defineEmits(["unselect"])

const devices = useState<OBSDevice[]>("devices")

type State = {
  firmware: string
  flash: string
  comments: string
  ready: boolean
  returnDate: string
}
const state = ref<State>(getInitialValues())
const returnDate = ref<Date>()

function getInitialValues() {
  return {
    firmware: props.device.firmware,
    flash: props.device.flash,
    comments: props.device.comments,
    ready: props.device.ready,
    returnDate: "",
  }
}

onMounted(() => (state.value = getInitialValues()))
watch(
  () => props.device,
  () => (state.value = getInitialValues()),
)

function endEditing() {
  state.value = getInitialValues()
  emit("unselect")
}

async function saveAndEndEditing() {
  state.value.returnDate = returnDate.value?.toISOString().split("T").at(0) || ""
  const body = JSON.stringify(state.value)
  const result = await $fetch<OBSDevice>("/api/devices/" + props.device.id, { method: "PATCH", body })
  devices.value = devices.value.map((d) => (d.id === result.id ? result : d))
  endEditing()
}

const open = ref(true)

const validate = () => {
  const errors = []
  if (returnDate.value && Number.isNaN(returnDate.value.getTime())) {
    errors.push({ path: "returnDate", message: "Falsche Datumsangabe" })
  }
  return errors
}

const isValid = computed(() => validate().length === 0)
</script>

<template>
  <UModal v-model="open" prevent-close class="custom-modal" :ui="{ width: 'w-full md:max-w-fit' }">
    <UForm :validate="validate" :state="state" class="device-tile" @submit="saveAndEndEditing">
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
      <DeviceRentals v-model:returnDate="returnDate" :rentals="device.rentals" class="history" />

      <div class="buttons">
        <UButton v-if="!device.currentUserId && device.ready" variant="outline">Verleihen</UButton>

        <UButton variant="outline" @click.stop="endEditing">Abbrechen</UButton>
        <UButton type="submit" :disabled="!isValid">Speichern</UButton>
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
  margin-top: 1rem;
}
textarea {
  width: 100%;
  height: 5rem;
  padding: 3px;
}
.input {
  margin-bottom: 3px;
}
</style>
