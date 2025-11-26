#!/usr/bin/env tsx

import { createStorage } from "unstorage"
import fsDriver from "unstorage/drivers/fs"
import { hashPassword } from "../server/lib/Authentication.js"

// Use the same storage as Nitro
const storage = createStorage({
  driver: fsDriver({ base: "./.data/kv" })
})

async function getUserByUsername(username: string) {
  const users = ((await storage.getItem("users")) || []) as Array<{ username: string; password: string; roles?: string[] }>
  return users.find((user) => user.username === username)
}

async function updateUser(updatedUser: { username: string; password: string; roles?: string[] }) {
  const users = ((await storage.getItem("users")) || []) as Array<{ username: string; password: string; roles?: string[] }>
  const userIndex = users.findIndex((u) => u.username === updatedUser.username)
  if (userIndex !== -1) {
    users[userIndex] = updatedUser
    await storage.setItem("users", users)
  }
}

const username = process.argv[2]
const newPassword = process.argv[3]

if (!username || !newPassword) {
  console.error("Usage: tsx scripts/reset-password.ts <username> <password>")
  process.exit(1)
}

if (newPassword.length < 8) {
  console.error("Password must be at least 8 characters long")
  process.exit(1)
}

const user = await getUserByUsername(username)
if (!user) {
  console.error(`User "${username}" not found`)
  process.exit(1)
}

user.password = hashPassword(newPassword)
await updateUser(user)

console.log(`Password for user "${username}" has been reset`)
