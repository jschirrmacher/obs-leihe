export function parseLocaleDateString(dateString: string, locale: string): string {
  const pattern = locale === "hu-HU" ? /(\d{4})\.(\d{1,2})\.(\d{1,2})/ : /(\d{1,2})[\.\/-](\d{1,2})[\.\/-](\d{4})/
  const match = dateString.match(pattern)
  if (!match) {
    throw new Error(`Invalid date format for locale ${locale}`)
  }

  const [, part1, part2, part3] = match
    .map((part) => parseInt(part, 10))
    .map(String)
    .map((part) => part.padStart(2, "0"))

  switch (locale) {
    case "hu-HU":
      return [part1, part2, part3].join("-")
    case "en-US":
      return [part3, part1, part2].join("-")
    default:
      return [part3, part2, part1].join("-")
  }
}
