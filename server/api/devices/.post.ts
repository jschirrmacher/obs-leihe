import type { OBSDevice } from "~/types"

const storage = useStorage("data")

export default defineEventHandler(async (event): Promise<OBSDevice> => {
  const id = getRouterParam(event, "id")
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  if (devices.find((device) => device.id === id)) {
    throw new Error("A device with this id already exists")
  }

  const device = (await readBody(event)) as OBSDevice

  await storage.setItem("devices", devices.concat(device))

  return { ...device, currentUserId: "", rentals: [] }
})
