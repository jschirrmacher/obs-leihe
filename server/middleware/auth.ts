import { verifyJWT } from "../lib/Authentication"

export default defineEventHandler(async (event) => {
  if (!event.path.match(/^\/api/)) {
    return
  }

  const token = getHeader(event, "Authorization")?.match(/^Bearer (.*)$/)?.[1] || 
                parseCookies(event)["token"]

  event.context.auth = undefined
  if (token) {
    try {
      event.context.auth = await verifyJWT(token)
    } catch {
      // ignore errors while decoding, just keeping the auth context undefined
    }
  }
})
