export function randomNumber(range: number): number {
  return Math.floor(Math.random() * range)
}

export function convertToHex(value: number): string {
  let hexCode = value.toString(16).toUpperCase()
  if (hexCode.length === 1) hexCode = `0${hexCode}`
  return hexCode
}

export function convertHexToRGB(hexCode: string): number[] {
  // substring(start, end + 1) since, end is not included so + 1
  let red = parseInt(hexCode.substring(1, 3), 16) // first 2 letters excluding '#'
  let green = parseInt(hexCode.substring(3, 5), 16)
  let blue = parseInt(hexCode.substring(5, 7), 16)
  return [red, green, blue]
}

export function convertHexToHSL(hexCode: string): number[] {
  const [red, green, blue] = convertHexToRGB(hexCode)

  const r = red / 255
  const g = green / 255
  const b = blue / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min
  const sum = max + min

  const hue =
    min === max
      ? 0
      : r === max
      ? ((60 * (g - b)) / diff + 360) % 360
      : g === max
      ? (60 * (b - r)) / diff + 120
      : (60 * (r - g)) / diff + 240

  const luminosity = 0.5 * sum

  const saturation =
    luminosity === 0
      ? 0
      : luminosity === 1
      ? 1
      : luminosity <= 0.5
      ? diff / sum
      : diff / (2 - sum)

  return [
    Math.round(hue),
    Math.round(saturation * 100),
    Math.round(luminosity * 100),
  ]
}
