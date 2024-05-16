import { createError, eventHandler, getRequestHeader, H3Event } from "h3"
import { verify } from "jsonwebtoken"
import { getJwtSecret } from "~/server/lib/Configuration"

const TOKEN_TYPE = "Bearer"

export default eventHandler(async (event) => {
  const authHeaderValue = getRequestHeader(event, "authorization")
  if (typeof authHeaderValue === "undefined") {
    throw createError({
      statusCode: 401,
      statusMessage: "Need to pass valid Bearer-authorization header to access this endpoint",
    })
  }

  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
  try {
    return verify(token, getJwtSecret())
  } catch (error) {
    console.error("Login failed. Here's the raw error:", error)
    throw createError({ statusCode: 403, statusMessage: "You must be logged in to use this endpoint" })
  }
})
