import { getDateFromString } from "~/lib/DateUtils"
import type { OBSDevice } from "~/types"

const storage = useStorage("data")

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const body = (await readBody(event)) as { from: string; userId: string }
  const devices = (await storage.getItem("devices")) as OBSDevice[]
  const device = devices.find((device) => device.id === id)
  if (!device) {
    throw createError({ statusCode: 404, statusMessage: "Device not found" })
  }

  if (!body.userId || body.userId.match(/\W/)) {
    throw createError({
      statusCode: 400,
      statusMessage: "'userId' attribute in body is missing or contains invalid characters",
    })
  }

  const from = getDateFromString("'from' attribute in request body", body.from)
  if (device.rentals.some((rental) => rental.to && new Date(rental.to).getTime() > from.getTime())) {
    throw createError({ statusCode: 400, statusMessage: "Start date is before last return date" })
  }

  device.rentals.push({ userId: body.userId, from })
  await storage.setItem("devices", devices)

  return { ...device, currentUserId: body.userId }
})
