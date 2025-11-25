import { scryptSync, randomBytes, timingSafeEqual } from "crypto"
import type { H3Event } from "h3"
import { SignJWT, jwtVerify } from "jose"
import { getJwtSecret } from "./Configuration"

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const buf = scryptSync(password, salt, 64) as Buffer
  return `${buf.toString("hex")}.${salt}`
}

export async function comparePassword(storedPassword: string, suppliedPassword: string) {
  const [hashedPassword, salt] = storedPassword.split(".")
  if (!hashedPassword || !salt) {
    throw new Error("Invalid stored password format")
  }
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex")
  const suppliedPasswordBuf = scryptSync(suppliedPassword, salt, 64) as Buffer
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf)
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
  if (!event.context.auth?.roles?.includes(role)) {
    throw createError({
      statusCode: 403,
      statusMessage: `You don't have permission to access this API`,
    })
  }
}

export async function signJWT(payload: Record<string, unknown>) {
  const secret = new TextEncoder().encode(getJwtSecret())
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('25h')
    .sign(secret)
}

export async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(getJwtSecret())
  const { payload } = await jwtVerify(token, secret)
  return payload
}
