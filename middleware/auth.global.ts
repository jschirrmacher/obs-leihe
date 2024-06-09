import type { User } from "~/types"

export default defineNuxtRouteMiddleware((to) => {
  async function loadUser(token: string) {
    try {
      const Authorization = `Bearer ${token}`
      const { data } = await useFetch<User>("/api/auth/user", { headers: { Authorization } })
      if (data.value) {
        user.value = data.value
      }
    } catch (error) {
      console.error(error)
      throw new Error("Lesen der gespeicherten Daten fehlgeschlagen")
    }
  }

  const user = useState("user") as Ref<User>
  const token = useCookie("token")
  const auth = to.meta.auth as { unauthenticatedOnly: boolean; navigateAuthenticatedTo: string }
  if (!user.value && token.value) {
    loadUser(token.value)
  }
  if (!auth?.unauthenticatedOnly && !user.value) {
    return navigateTo("/login")
  }
})
