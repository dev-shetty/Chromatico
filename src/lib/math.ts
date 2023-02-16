export function randomNumber(range: number): number {
  return Math.floor(Math.random() * range)
}

export function convertToHex(value: number): string {
  let hexCode = value.toString(16).toUpperCase()
  if (hexCode.length === 1) hexCode = `0${hexCode}`
  return hexCode
}
