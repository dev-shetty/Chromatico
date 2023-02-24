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
