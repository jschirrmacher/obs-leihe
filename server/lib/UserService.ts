import type { User } from "~/types"

const storage = useStorage("data")

export async function getAllUsers() {
  return ((await storage.getItem("users")) || []) as User[]
}

export async function getUserByUsername(username: string) {
  const users = await getAllUsers()
  return users.find((user) => user.username === username)
}

export async function updateUser(updatedUser: User) {
  const users = await getAllUsers()
  const userIndex = users.findIndex((u) => u.username === updatedUser.username)
  if (userIndex !== -1) {
    users[userIndex] = updatedUser
    await storage.setItem("users", users)
  }
}
