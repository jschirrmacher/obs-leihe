import { verifyToken } from "../lib/Authentication"
import type { H3Event } from "h3"

export default defineEventHandler((event) => {
  if (!event.path.match(/^\/api/)) {
    return
  }

  const strategies: ((event: H3Event) => string | undefined)[] = [
    () => getHeader(event, "Authorization")?.match(/^Bearer (.*)$/)?.at(1),
    () => parseCookies(event)["token"]
  ]

  event.context.auth = strategies.find(strategy => {
    const token = strategy(event)
    return token && verifyToken(token)
  })
})
