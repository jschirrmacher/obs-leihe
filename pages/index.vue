<script setup lang="ts">
const items = [
  { label: "Geräte", content: "Geräte" },
  { label: "Nutzer", content: "Noch nicht implementiert" },
]

const route = useRoute()
const router = useRouter()

const selected = computed({
  get () {
    const index = items.findIndex((item) => item.label === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set (value) {
    // Hash is specified here to prevent the page from scrolling to the top
    router.replace({ query: { tab: items[value].label }, hash: '#control-the-selected-index' })
  }
})
</script>

<template>
  <UTabs v-model="selected" :items="items">
    <template #item="{ index }">
      <DeviceList v-if="index === 0" />
    </template>
  </UTabs>
</template>
