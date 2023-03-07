export const storagePrefix: string = "chromatico-"

export type KeyboardEvent = {
  key: string
}

export type ChildrenProp = {
  children: JSX.Element
}

enum Navigation {
  Palettes = 1,
  Clipboard = 2,
}

export type NavigationOption = Navigation

export type Hex = string

type red = number
type green = number
type blue = number
export type RGB = [red, blue, green]

type hue = number
type saturation = number
type luminosity = number
export type HSL = [hue, saturation, luminosity]

export type TutorialStatus = "completed" | "pending"

export type Data = {
  action: string
  status: string
}
