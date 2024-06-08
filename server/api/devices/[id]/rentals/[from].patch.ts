import { getDateFromString } from "~/lib/DateUtils"
import type { OBSDevice } from "~/types"

const storage = useStorage("data")

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const from = getDateFromString("path", getRouterParam(event, "from")).getTime()
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  const device = devices.find((device) => device.id === id)
  if (!device) {
    throw createError({ statusCode: 404, statusMessage: "Device not found"})
  }

  const rental = device.rentals.find((rental) => new Date(rental.from).getTime() === from)
  if (!rental) {
    throw createError({ statusCode: 404, statusMessage: "There is no such rental for this device"})
  }

  const body = (await readBody(event)) as { to: string }
  rental.to = getDateFromString("'to' attribute in request body", body.to)

  await storage.setItem("devices", devices)

  return device
})
