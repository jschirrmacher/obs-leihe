<script setup lang="ts">
import type { OBSDevice } from "~/types"
import { getISODateString } from "~/lib/DateUtils";

const props = defineProps<{ device: OBSDevice }>()
const returnDate = defineModel<Date>("returnDate")
const newRentalUserId = defineModel<string>("newRentalUserId", { default: "" })
const newRentalFrom = defineModel<Date>("newRentalFrom", { default: new Date() })

const columns = [
  { key: "userId", label: "Fahrer:in" },
  { key: "from", label: "Von" },
  { key: "to", label: "Bis" },
]

const rentals = computed(() => {
  const rentals = props.device.rentals.map((rental) => ({
    from: getISODateString(rental.from),
    to: getISODateString(rental.to!),
    userId: rental.userId,
    isNew: false,
  }))
  if (!props.device.rentals.some((rental) => rental.to === undefined)) {
    rentals.push({
      userId: newRentalUserId.value,
      from: getISODateString(newRentalFrom.value!),
      to: "",
      isNew: true,
    })
  }
  return rentals
})

function returnDevice() {
  returnDate.value = new Date()
}
</script>

<template>
  <UTable :rows="rentals" :columns="columns" :ui="{ td: { padding: 'px-2 py-2' }, th: { padding: 'px-2 py-2' } }">
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <span class="italic text-sm">Noch nicht verliehen</span>
      </div>
    </template>

    <template #userId-data="{ row }">
      <UInput v-if="row.isNew" v-model="newRentalUserId" class="user-id" />
      <span v-else>{{ row.userId }}</span>
    </template>

    <template #from-data="{ row }">
      <DatePicker v-if="row.isNew" v-model="newRentalFrom" />
      <span v-else>{{ row.from }}</span>
    </template>

    <template #to-data="{ row }">
      <span v-if="row.to === '' && !row.isNew">{{ row.to }}</span>

      <UButton v-if="!returnDate && row.to === '' && !row.isNew" size="xs" @click="returnDevice">Rückgabe</UButton>
      <DatePicker v-if="returnDate && row.to === '' && !row.isNew" v-model="returnDate" />
    </template>
  </UTable>
</template>

<style scoped>
.user-id {
  width: 100px;
}
</style>
