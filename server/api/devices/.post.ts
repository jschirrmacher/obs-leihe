import type { OBSDevice } from "~/types"

const storage = useStorage("data")

export default defineEventHandler(async (event): Promise<OBSDevice> => {
  const id = getRouterParam(event, "id")
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  if (devices.find((device) => device.id === id)) {
    throw createError({ statusCode: 409, statusMessage: "A device with this id already exists"})
  }

  const device = (await readBody(event)) as OBSDevice
  device.rentals = []

  await storage.setItem("devices", devices.concat(device))

  return { ...device, currentUserId: "" }
})
