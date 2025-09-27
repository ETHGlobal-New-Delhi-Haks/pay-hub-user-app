export function shortText(text: string, length = 40): string {
  if (!text) {
    return ''
  }

  const dividedSymbolsOnSides = (length - 2) / 2
  const symbolsOnSides = dividedSymbolsOnSides > 6 ? 6 : dividedSymbolsOnSides

  if (text.length > length) {
    const leftPart = text.slice(0, symbolsOnSides)
    const rightPart = text.slice(-symbolsOnSides)

    return leftPart + '...' + rightPart
  }

  return text
}