import { scryptSync, randomBytes, timingSafeEqual } from "crypto"

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
