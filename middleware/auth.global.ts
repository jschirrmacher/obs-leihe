export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token")
  const auth = to.meta.auth as { unauthenticatedOnly: boolean; navigateAuthenticatedTo: string }
  if (!auth?.unauthenticatedOnly && !token.value) {
    return navigateTo("/login")
  }
})
