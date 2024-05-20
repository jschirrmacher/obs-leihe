<script setup lang="ts">
import type { Rental } from "~/types"

const props = defineProps<{ rentals: Rental[] }>()

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
</script>

<template>
  <UTable :rows="rentals" :columns="columns" :ui="{ td: { padding: 'px-2 py-2' }, th: { padding: 'px-2 py-2' } }">
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <span class="italic text-sm">Noch nicht verliehen</span>
      </div>
    </template>
  </UTable>
</template>
