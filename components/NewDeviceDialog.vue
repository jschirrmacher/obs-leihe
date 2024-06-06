<script setup lang="ts">
import type { OBSDevice } from "~/types"

const emit = defineEmits(["close"])

type State = ReturnType<typeof getInitialValues>

const devices = useState<OBSDevice[]>("devices")
const state = ref<State>(getInitialValues())
const open = ref(true)

function getInitialValues(): Omit<OBSDevice, "rentals" | "currentUserId"> {
  return {
    id: "",
    deviceId: "",
    security: "",
    firmware: "",
    flash: "",
    comments: "",
    ready: false,
  }
}

function reset() {
  state.value = getInitialValues()
}

onMounted(reset)

function endEditing() {
  reset()
  emit("close")
}

async function save() {
  const result = await $fetch<OBSDevice>("/api/devices", { method: "POST", body: JSON.stringify(state.value) })
  devices.value = [...devices.value, result]
  endEditing()
}
</script>

<template>
  <UModal v-model="open" prevent-close class="custom-modal" :ui="{ width: 'w-full md:max-w-fit' }">
    <UForm :state="state" class="device-tile" @submit="save">
      <div class="left">
        <UInput v-model="state.id" placeholder="Eigene Kennung" />
        <UInput v-model="state.security" placeholder="Code" />
        <UInput v-model="state.deviceId" placeholder="Geräte-ID" />
      </div>
      <div class="right">
        <div class="checkbox">
          <UCheckbox v-model="state.ready" label="Einsatzbereit" />
        </div>
        <UInput v-model="state.firmware" placeholder="Firmware version" />
        <UInput v-model="state.flash" placeholder="Flash version" />
      </div>

      <UTextarea v-model="state.comments" placeholder="Zusätzliche Informationen" class="comment" />

      <div class="buttons">
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
  grid-template-areas: "left right" "comment comment" "buttons buttons";
  margin: 1rem;
  gap: 10px;
}
.left {
  grid-area: left;
}
.right {
  grid-area: right;
}
.left,
.right {
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
.input {
  margin-bottom: 3px;
}
.checkbox {
  margin: auto 0;
}
.buttons {
  grid-area: buttons;
}
</style>
