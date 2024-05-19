
export type OBSDevice = {
  id: string
  deviceId: string
  firmware: string
  flash: string
  security: string
  comments: string
  rentals: Rental[]
  currentUserId: string
  faulty: boolean
}

export type Rental = {
  userId: string
  from: Date
  to?: Date
}

export type Role = "user" | "admin"

export type User = {
  username: string
  name: string
  roles: Role[]
  password?: string
}
