export default defineNuxtRouteMiddleware((to, from) => {
  const auth = to.meta.auth as { unauthenticatedOnly: boolean; navigateAuthenticatedTo: string }
  if (!auth?.unauthenticatedOnly) {
    const token = useCookie("token")
    if (!token.value) {
      return navigateTo("/login")
    }
  }
})
