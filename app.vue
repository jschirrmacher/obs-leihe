<template>
  <UContainer class="mt-4">
    <MainHeader />
  </UContainer>
  <UContainer class="mt-4">
    <NuxtPage />
  </UContainer>

  <NuxtPage />

  <UNotifications />
</template>

<style>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 5px;
  padding-top: 2rem;
  justify-self: right;
  grid-area: buttons;
}
</style>
