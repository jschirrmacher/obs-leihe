import type { OBSDevice, Rental } from "~/types"
import { getMutation } from "useful-typescript-functions"

type OBSDeviceFields = (keyof OBSDevice)[]

const writableFields: OBSDeviceFields = ["comments", "firmware", "flash", "ready"]
const storage = useStorage("data")
const openRental = (rental: Rental) => rental.to === undefined

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  const device = devices.find((device) => device.id === id)
  if (!device) {
    throw new Error("Device not found")
  }

  Object.assign(device, getMutation(device, writableFields, await readBody(event)))
  await storage.setItem("devices", devices)

  return { ...device, currentUserId: device.rentals.find(openRental)?.userId || "" }
})
