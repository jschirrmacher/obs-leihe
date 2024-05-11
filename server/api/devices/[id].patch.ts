import type { OBSDevice } from "~/types"
import { getMutation } from "useful-typescript-functions"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const storage = useStorage("data")
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  const device = devices.find((device) => device.id === id)
  if (!device) {
    throw new Error("Device not found")
  }

  Object.assign(device, getMutation(device, ["comments", "firmware", "flash", "faulty"], await readBody(event)))
  await storage.setItem("devices", devices)
  
  return {
    ...device,
    currentUserId:
      device.rentals.find((rental) => rental.to === undefined)?.userId || "",
  }
})
