import type { OBSDevice } from "~/types"

export default defineEventHandler(async () => {
  const storage = useStorage("data")
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  return devices.map((device) => {
    return {
      ...device,
      currentUserId:
        device.rentals.find((rental) => rental.to === undefined)?.userId || "",
    }
  })
})
