import React, { Dispatch, SetStateAction, useState } from "react"
import { ChildrenProp } from "../lib/types"

type clipboardProps = {
  clipboard: string[]
  setClipboard: Dispatch<SetStateAction<string[]>>
}

export const clipboardContext = React.createContext<Partial<clipboardProps>>({})

function ClipboardProvider({ children }: ChildrenProp) {
  const [clipboard, setClipboard] = useState<string[]>([])
  return (
    <clipboardContext.Provider value={{ clipboard, setClipboard }}>
      {children}
    </clipboardContext.Provider>
  )
}

export default ClipboardProvider
