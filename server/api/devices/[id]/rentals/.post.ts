import type { OBSDevice, Rental } from "~/types"

const storage = useStorage("data")

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const newRental = await readBody(event) as Rental
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  const device = devices.find((device) => device.id === id)
  if (!device) {
    throw new Error("Device not found")
  }

  newRental.from = new Date(newRental.from)

  device.rentals.push(newRental)
  await storage.setItem("devices", devices)

  return { ...device, currentUserId: newRental.userId }
})
