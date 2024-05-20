<template>
  <UContainer class="mt-4">
    <MainHeader />
  </UContainer>
  <UContainer class="mt-4">
    <NuxtPage />
  </UContainer>
  <UContainer class="mt-4 pb-4 align-middle flex justify-end">
    <UButton to="https://github.com/jschirrmacher/obs-leihe" target="_blank" variant="link">
      <UAvatar src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" />
      Repository
    </UButton>
    <UButton to="https://github.com/jschirrmacher/obs-leihe/issues/new" target="_blank" variant="link">
      Fehler melden
    </UButton>
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
