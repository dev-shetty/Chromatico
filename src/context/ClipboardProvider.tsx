import React, { Dispatch, SetStateAction, useState } from "react"
import { ChildrenProp } from "../lib/types"

type clipboardProps = {
  clipboard: string[]
  setClipboard: Dispatch<SetStateAction<string[]>>
  palette: Palette
  setPalette: React.Dispatch<React.SetStateAction<Palette>>
}

type Palette = [
  {
    uuid: string
    colors: string[]
    name: string
  }
]

const savedColors = localStorage.getItem("chromatico-clipboard")
const savedPalettes = localStorage.getItem("chromatico-palette")

export const clipboardContext = React.createContext<Partial<clipboardProps>>({})

function ClipboardProvider({ children }: ChildrenProp) {
  const [clipboard, setClipboard] = useState<string[]>(JSON.parse(savedColors!))
  const [palette, setPalette] = useState<Palette>(JSON.parse(savedPalettes!))
  return (
    <clipboardContext.Provider
      value={{ clipboard, setClipboard, palette, setPalette }}
    >
      {children}
    </clipboardContext.Provider>
  )
}

export default ClipboardProvider
