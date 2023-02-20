import React, { useState } from "react"
import { ChildrenProp } from "../lib/types"

type colorsProps = {
  colors: string[]
  setColors: (colors: string[]) => void
  copiedColor: string
  setCopiedColor: (color: string) => void
}

export const colorsContext = React.createContext<Partial<colorsProps>>({})

function colorsProvider({ children }: ChildrenProp) {
  const [colors, setColors] = useState<string[]>([])

  return (
    <colorsContext.Provider value={{ colors, setColors }}>
      {children}
    </colorsContext.Provider>
  )
}

export default colorsProvider
