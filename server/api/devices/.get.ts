import type { OBSDevice } from "~/types"

const storage = useStorage("data")

export default defineEventHandler(async () => {
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  return devices.map((device) => {
    return {
      ...device,
      currentUserId: device.rentals.find((rental) => rental.to === undefined)?.userId || "",
    }
  })
})
