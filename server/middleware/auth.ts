import type { H3Event } from "h3"
import { verifyJWT } from "../lib/Authentication"

type GetTokenFn = (event: H3Event) => string | undefined

export default defineEventHandler(async (event) => {
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

  event.context.auth = undefined
  if (token) {
    try {
      event.context.auth = await verifyJWT(token)
    } catch {
      // ignore errors while decoding, just keeping the auth context undefined
    }
  }
})
