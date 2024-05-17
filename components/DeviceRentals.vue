<script setup lang="ts">
import type { Rental } from "~/types"
import DatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const props = defineProps<{ rentals: Rental[] }>()
const returnDate = defineModel<Date>("returnDate")

const columns = [
  { key: "from", label: "Von" },
  { key: "to", label: "Bis" },
  { key: "userId", label: "Fahrer" },
]

const rentals = computed(() =>
  props.rentals.map((rental) => ({
    from: new Date(rental.from).toLocaleDateString(),
    to: rental.to ? new Date(rental.to).toLocaleDateString() : "",
    userId: rental.userId,
  })),
)

function returnDevice() {
  returnDate.value = new Date()
}

function formatDate(date: Date) {
  return date.toLocaleDateString()
}

const locale = navigator.language
</script>

<template>
  <UTable :rows="rentals" :columns="columns" :ui="{ td: { padding: 'px-2 py-2' }, th: { padding: 'px-2 py-2' } }">
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <span class="italic text-sm">Noch nicht verliehen</span>
      </div>
    </template>

    <template #to-data="{ row }">
      <span v-if="row.to === ''">{{ row.to }}</span>

      <UButton v-if="!returnDate && row.to === ''" size="xs" @click="returnDevice">Rückgabe</UButton>
      <DatePicker
        v-if="returnDate && row.to === ''"
        v-model="returnDate"
        :enable-time-picker="false"
        :locale="locale"
        :format="formatDate"
        select-text="Ok"
        cancel-text="Abbrechen"
        :teleport="true"
      />
    </template>
  </UTable>
</template>
