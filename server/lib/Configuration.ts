import { resolve } from "path"
import { Files } from "useful-typescript-functions"

interface SecretsConfiguration {
  jwtSecret: string
}

interface PublicConfiguration {}

type Configuration = PublicConfiguration & {
  secrets?: SecretsConfiguration
}

const { readYAML } = Files()
const configFile = resolve("config.yaml")
const config = await readYAML<Configuration>(configFile)
export const secretConfig = config.secrets
export const publicConfig = { ...config }
delete publicConfig.secrets

export function getJwtSecret() {
  if (!secretConfig?.jwtSecret) {
    throw createError({ statusCode: 500, statusMessage: "Missing secret.secretConfig entry in config.yaml" })
  }
  return secretConfig.jwtSecret
}
