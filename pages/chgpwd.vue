<script setup lang="ts">
import { object, string, ref } from "yup"

const toast = useToast()
const router = useRouter()

const schema = object({
  password: string().min(8, "Das Passwort muss mindestens 8 Zeichen enthalten"),
  repeat: string().oneOf([ref("password")], "Die beide Passwort-Angaben sind nicht gleich"),
})

const state = reactive({
  password: "",
  repeat: "",
})

const method = "put"
const headers = { "Content-Type": "application/json" }

async function updateData() {
  try {
    const data = await $fetch("/api/auth/password", { method, headers, body: JSON.stringify(state) })
    if (data === "ok") {
      router.push("/")
    } else {
      console.error(data)
      throw new Error("Die Passwort-Ändern-Funktion hat ein unerwartetes Ergebnis geliefert")
    }
  } catch (error) {
    console.error(error)
    toast.add({
      title: "Das Passwort konnte nicht geändert werden",
      description: (error as Error).message,
      color: "red",
    })
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="updateData">
    <UCard>
      <template #header> Hier kannst du dein Passwort ändern</template>

      <UFormGroup label="Neues Passwort" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UFormGroup label="Passwort wiederholen" name="repeat">
        <UInput v-model="state.repeat" type="password" />
      </UFormGroup>

      <template #footer>
        <div class="buttons">
          <UButton variant="outline" @click="router.push('/')"> Abbrechen </UButton>
          <UButton type="submit"> Speichern </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>
