import { describe, it, expect } from "vitest"
import { getISODateString, parseLocaleDateString } from "./DateUtils"

describe("DateUtils", () => {
  it("should parse localized date strings to an ISO date", () => {
    expect(parseLocaleDateString("25.05.2024", "de-DE")).toEqual("2024-05-25")
    expect(parseLocaleDateString("25.5.2024", "de-DE")).toEqual("2024-05-25")
    expect(parseLocaleDateString("25. 05. 2024", "de-DE")).toEqual("2024-05-25")
    expect(parseLocaleDateString("5/25/2024", "en-US")).toEqual("2024-05-25")
    expect(parseLocaleDateString("2024.5.25", "hu-HU")).toEqual("2024-05-25")
  })

  it("should return a ISO formatted date", () => {
    expect(getISODateString("2024-05-25")).toEqual("2024-05-25")
    expect(getISODateString(new Date("2024-05-25"))).toEqual("2024-05-25")
    expect(getISODateString(new Date("2024-05-25").getTime())).toEqual("2024-05-25")
  })

  it("should return an empty string if the input for getISODateString is undefined", () => {
    expect(getISODateString(undefined)).toEqual("")
  })
})
