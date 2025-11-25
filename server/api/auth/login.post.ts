import { createError, eventHandler, readBody } from "h3"
import { comparePassword, signJWT } from "../../lib/Authentication"
import type { User } from "~/types"

const storage = useStorage("data")

export default eventHandler(async (event) => {
  const data = (await readBody(event)) as Pick<User, "username" | "password">
  if (!data || !data.username || !data.password) {
    throw createError({ statusCode: 401, statusText: "Missing credentials" })
  }
  const users = ((await storage.getItem("users")) || []) as User[]
  const candidate = users.find((user) => user.username === data.username)
  if (!candidate || !candidate.password || !(await comparePassword(candidate.password, data.password))) {
    throw createError({ statusCode: 403, statusText: "Unauthorized" })
  }

  const user = { ...candidate }
  delete user.password

  const token = await signJWT(user)

  return { token }
})
