export type OBSDevice = {
  id: string
  deviceId: string
  firmware: string
  flash: string
  security: string
  comments: string
  rentals: Rental[]
}

export type Rental = {
  userId: string
  from: Date
  to?: Date
}
