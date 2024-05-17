import { describe, expect, it } from "vitest"
import { mountSuspended } from "@nuxt/test-utils/runtime"
import DatePicker from "./DatePicker.vue"

describe("DatePicker Component", () => {
  it("should render as expected", async () => {
    const component = await mountSuspended(DatePicker, {})
    expect(component.html()).toMatchSnapshot()
  })
})
