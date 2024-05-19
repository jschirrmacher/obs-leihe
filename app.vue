<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <MainHeader />
      </template>

      <NuxtPage />
    </UCard>
  </UContainer>

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
