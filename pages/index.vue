<script setup lang="ts">
type Item = { id: string; label: string; content: string }

const items: Item[] = [
  { id: "devices", label: "Geräte", content: "Geräte" },
  { id: "users", label: "Nutzer", content: "Noch nicht implementiert" },
]

const route = useRoute()
const router = useRouter()

const predicate = (item: Item) => item.id === route.query.tab
const hash = "#prevent-scroll"

const selected = computed({
  get: () => Math.max(0, items.findIndex(predicate)),
  set: (value) => router.replace({ query: { tab: items[value].id }, hash }),
})
</script>

<template>
  <UTabs v-model="selected" :items="items">
    <template #item="{ index }">
      <DeviceList v-if="index === 0" />
    </template>
  </UTabs>
</template>
