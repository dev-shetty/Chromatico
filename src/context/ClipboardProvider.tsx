import { createContext, Dispatch, SetStateAction, useState } from "react"
import { ChildrenProp, storagePrefix } from "../lib/types"

type ClipboardProps = {
  clipboard: string[]
  setClipboard: Dispatch<SetStateAction<string[]>>
  palette: Palette
  setPalette: Dispatch<React.SetStateAction<Palette>>
}

type Palette = [
  {
    uuid: string
    colors: string[]
    name: string
  }
]

const savedColors = localStorage.getItem(storagePrefix + "clipboard")
const savedPalettes = localStorage.getItem(storagePrefix + "palette")

export const clipboardContext = createContext<Partial<ClipboardProps>>({})

function ClipboardProvider({ children }: ChildrenProp) {
  const [clipboard, setClipboard] = useState<string[]>(
    JSON.parse(savedColors!) || []
  )
  const [palette, setPalette] = useState<Palette>(
    JSON.parse(savedPalettes!) || []
  )
  return (
    <clipboardContext.Provider
      value={{ clipboard, setClipboard, palette, setPalette }}
    >
      {children}
    </clipboardContext.Provider>
  )
}

export default ClipboardProvider
