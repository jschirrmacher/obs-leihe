const map = {
  "-": ["nl-NL", "da-DK", "nb-NO", "sv-SE", "fi-FI"],
  "/": ["fr-FR", "en-GB", "en-US", "es-ES", "pt-PT", "pt-BR", "el-GR"],
  ".": ["de-DE", "de-AT", "de-CH", "pl-PL", "cs-CZ", "ru-RU", "tr-TR", "hu-HU"],
}

export function parseLocaleDateString(dateString: string, locale: string) {
  function getOrderedDateParts([part1, part2, part3]: string[]) {
    switch (locale) {
      case "hu-HU":
        return [part1, part2, part3]
      case "en-US":
        return [part3, part1, part2]
      default:
        return [part3, part2, part1]
    }
  }

  const matchingDelimiter = ([, list]: [string, string[]]): boolean => list.includes(locale)
  const delimiter = Object.entries(map).find(matchingDelimiter)?.at(0) as string
  if (!delimiter) {
    throw new Error(`Unknown locale ${locale}`)
  }
  return getISODateString(
    Date.parse(
      getOrderedDateParts(
        dateString
          .split(delimiter)
          .map(Number)
          .map(String)
          .map((p) => p.padStart(2, "0")),
      ).join("-"),
    ),
  )
}

export function getISODateString(date: Date | string | number | undefined) {
  return (date && new Date(date).toISOString().split("T").at(0)) || ""
}
