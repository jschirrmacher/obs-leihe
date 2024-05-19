import { createError, eventHandler, readBody } from "h3"
import { sign } from "jsonwebtoken"
import { comparePassword } from "../../lib/Authentication"
import { getJwtSecret } from "~/server/lib/Configuration"
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

  const expiresIn = 90_000
  const user = { ...candidate }
  delete user.password

  const token = sign(user, getJwtSecret(), { expiresIn })

  return { token }
})
