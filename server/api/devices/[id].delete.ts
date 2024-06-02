import type { OBSDevice } from "~/types"

const storage = useStorage("data")

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  const index = devices.findIndex((device) => device.id === id)
  if (index === -1) {
    throw new Error("Device not found")
  }
  delete devices[index]

  await storage.setItem("devices", Object.values(devices))

  return { removed: true }
})
