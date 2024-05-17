import { scryptSync, randomBytes, timingSafeEqual } from "crypto"
import { verify } from "jsonwebtoken"
import { getJwtSecret } from "~/server/lib/Configuration"
import type { H3Event } from "h3"

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const buf = scryptSync(password, salt, 64) as Buffer
  return `${buf.toString("hex")}.${salt}`
}

export async function comparePassword(storedPassword: string, suppliedPassword: string) {
  const [hashedPassword, salt] = storedPassword.split(".")
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex")
  const suppliedPasswordBuf = scryptSync(suppliedPassword, salt, 64) as Buffer
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf)
}

export function verifyToken(token: string) {
  try {
    return verify(token, getJwtSecret())
  } catch {
    return undefined
  }
}

export function assertLoggedIn(event: H3Event) {
  if (!event.context.auth) {
    throw createError({
      statusCode: 401,
      statusMessage: "Need to pass valid token to access this endpoint",
    })
  }
}

export function assertRole(event: H3Event, role: string) {
  assertLoggedIn(event)
  if (!event.context.auth.roles.includes(role)) {
    throw createError({
      statusCode: 403,
      statusMessage: `You don't have permission to access this API`,
    })
  }
}
