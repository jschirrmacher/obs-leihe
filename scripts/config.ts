import { mkdirSync, existsSync, writeFileSync } from "node:fs"
import { createInterface, moveCursor, clearLine } from "node:readline"
import { scryptSync, randomBytes } from "crypto"

function keypressHandler(c: string) {
  if (c.charCodeAt(0) === 127) {
    const len = rl.line.length
    moveCursor(process.stdout, -len, 0)
    clearLine(process.stdout, 1)
    process.stdout.write("*".repeat(len))
    return
  } else if (["\n", "\r"].includes(c)) {
    process.stdin.removeListener("data", keypressHandler)
  } else {
    moveCursor(process.stdout, -1, 0)
    clearLine(process.stdout, 1)
  }
}
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})
process.stdin.on("keypress", keypressHandler)

mkdirSync(".data/kv", { recursive: true })

if (!existsSync(".data/kv/users")) {
  rl.question(`Set a JWT secret: `, (jwtSecret) => {
    writeFileSync("config.yaml", `secrets:\n  jwtSecret: ${jwtSecret}`)
    rl.question(`Set an initial password for user 'admin': `, (password) => {
      const salt = randomBytes(16).toString("hex")
      const buf = scryptSync(password, salt, 64) as Buffer
      const adminUser = { username: "admin", password: `${buf.toString("hex")}.${salt}` }
      writeFileSync(".data/kv/users", JSON.stringify([adminUser]))
      rl.close()
    })
  })
}
