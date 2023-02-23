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
    colors: string[]
    name: string
  }
]

const initialClipboard = localStorage.getItem("chromatico-clipboard")

export const clipboardContext = React.createContext<Partial<clipboardProps>>({})

function ClipboardProvider({ children }: ChildrenProp) {
  const [clipboard, setClipboard] = useState<string[]>(
    JSON.parse(initialClipboard!)
  )
  const [palette, setPalette] = useState<Palette>([
    {
      colors: [],
      name: "",
    },
  ])
  return (
    <clipboardContext.Provider
      value={{ clipboard, setClipboard, palette, setPalette }}
    >
      {children}
    </clipboardContext.Provider>
  )
}

export default ClipboardProvider
