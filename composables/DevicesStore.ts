import type { OBSDevice } from "~/types"
import { getISODateString } from "~/lib/DateUtils"

export const useDeviceStore = () => {
  const devices = useState<OBSDevice[]>("devices")

  type EditableDeviceData = Pick<
    OBSDevice,
    "id" | "deviceId" | "ready" | "firmware" | "flash" | "security" | "comments"
  >

  function updateDeviceInStore(device: OBSDevice) {
    devices.value = devices.value.map((d) => (d.id === device.id ? device : d))
  }

  return {
    async createDevice(device: EditableDeviceData) {
      const result: OBSDevice = await $fetch("/api/devices", { method: "POST", body: device })
      devices.value = [...devices.value, result]
    },

    async updateDevice(device: EditableDeviceData) {
      const result: OBSDevice = await $fetch(`/api/devices/${device.id}`, { method: "PATCH", body: device })
      updateDeviceInStore(result)
    },

    async removeDevice(deviceId: string) {
      const result: { id: string } = await $fetch("/api/devices/" + deviceId, { method: "DELETE" })
      devices.value = devices.value.filter((d) => d.id !== result.id)
    },

    async createNewRental(deviceId: string, userId: string, rentDate: Date) {
      const result: OBSDevice = await $fetch(`/api/devices/${deviceId}/rentals`, {
        method: "POST",
        body: { userId, from: getISODateString(rentDate) },
      })
      updateDeviceInStore(result)
    },

    async endRental(deviceId: string, returnDate: Date) {
      const device = devices.value.find((device) => device.id === deviceId)
      const from = getISODateString(device!.rentals.at(-1)?.from)
      await $fetch(`/api/devices/${deviceId}/rentals/${from}`, {
        method: "PATCH",
        body: { to: getISODateString(returnDate) },
      })
    },
  }
}
