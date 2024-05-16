<script setup lang="ts">
import { object, string } from "yup"

const toast = useToast()
const router = useRouter()

const schema = object({
  username: string().required("Required"),
  password: string().min(8, "Das Passwort muss mindestens 8 Zeichen enthalten").required("Required"),
})

const state = reactive({
  username: "",
  password: "",
})

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
})

const method = "post"
const headers = { "Content-Type": "application/json" }

async function sendCredentials() {
  try {
    const { data }: any = await useFetch("/api/auth/login", { method, headers, body: { ...state } })
    if (data.value) {
      const token = useCookie("token")
      token.value = data.value?.token
      router.replace("/")
    } else {
      console.error(data.value)
      throw new Error("Die Login-Funktion hat ein unerwartetes Ergebnis geliefert")
    }
  } catch (error) {
    console.error(error)
    toast.add({ title: "Der Login war nicht erfolgreich", description: (error as Error).message, color: "red" })
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="sendCredentials">
    <UCard>
      <template #header> Gib deine Zugangsdaten an, um dich einzuloggen</template>

      <UFormGroup label="Benutzername" name="username">
        <UInput v-model="state.username" />
      </UFormGroup>

      <UFormGroup label="Passwort" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <template #footer>
        <UButton type="submit"> Submit </UButton>
      </template>
    </UCard>
  </UForm>
</template>
