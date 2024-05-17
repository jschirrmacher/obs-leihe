<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const date = defineModel<Date>()
const locale = navigator.language
</script>

<template>
  <VueDatePicker
    v-model="date"
    :enable-time-picker="false"
    :locale="locale"
    :format="(date: Date) => date.toLocaleDateString()"
    select-text="Ok"
    cancel-text="Abbrechen"
    :teleport="true"
    hide-input-icon
    class="date-selection"
  />
</template>

<style>
.date-selection {
  width: 9em;
}
</style>
