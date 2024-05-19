import { hashPassword } from "~/server/lib/Authentication"
import type { User } from "~/types"

export default eventHandler(async (event) => {
  const username = (event.context.auth as User).username
  const { password } = await readBody(event)
  const storage = useStorage("data")
  const users = (((await storage.getItem("users")) || []) as User[]).map((user) => {
    if (user.username === username) {
      return { ...user, password: hashPassword(password) }
    } else {
      return user
    }
  })
  await storage.setItem("users", users)
  return "ok"
})
