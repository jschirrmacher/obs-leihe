import { createPage, setup, url } from "@nuxt/test-utils/e2e"
import { describe, it, expect } from "vitest"

describe("E2E: Login", async () => {
  await setup()

  it("should load with playwright", async () => {
    let apiRequestSpy = { username: "", password: "" }

    const page = await createPage()
    await page.route(url("/api/auth/login"), async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ token: "abc-token" }),
      })
    })
    page.on("request", (request) => {
      if (request.url() === url("/api/auth/login") && request.method() === "POST") {
        apiRequestSpy = request.postDataJSON()
      }
    })
    await page.route(url("/api/devices"), async route => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([])
      })
    })

    await page.goto(url("/login"), { waitUntil: "hydration" })
    await page.getByLabel("Benutzername").click()
    await page.getByLabel("Benutzername").fill("joachim")
    await page.getByLabel("Benutzername").press("Tab")
    await page.getByLabel("Passwort").fill("test1234")
    await page.getByLabel("Passwort").press("Tab")
    await page.getByRole("button", { name: "Einloggen" }).click()
    expect(apiRequestSpy).toEqual(
      expect.objectContaining({
        username: "joachim",
        password: "test1234",
      }),
    )
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(page.url()).toEqual(url("/"))
  })
})
