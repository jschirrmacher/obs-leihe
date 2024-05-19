import { verifyToken } from "../lib/Authentication"
import type { H3Event } from "h3"

type GetTokenFn = (event: H3Event) => string | undefined

export default defineEventHandler((event) => {
  if (!event.path.match(/^\/api/)) {
    return
  }

  const getTokenFromAuthHeader: GetTokenFn = () =>
    getHeader(event, "Authorization")
      ?.match(/^Bearer (.*)$/)
      ?.at(1)

  const getTokenFromCookie: GetTokenFn = () => parseCookies(event)["token"]

  const token = [getTokenFromAuthHeader, getTokenFromCookie]
    .map((strategy) => strategy(event))
    .filter((t) => t)
    .at(0)
  event.context.auth = token && verifyToken(token)
})
