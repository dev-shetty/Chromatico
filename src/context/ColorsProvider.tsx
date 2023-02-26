import { createContext, useState } from "react"
import { ChildrenProp } from "../lib/types"

type colorsProps = {
  colors: string[]
  setColors: (colors: string[]) => void
}

export const colorsContext = createContext<Partial<colorsProps>>({})

function ColorsProvider({ children }: ChildrenProp) {
  const [colors, setColors] = useState<string[]>([])

  return (
    <colorsContext.Provider value={{ colors, setColors }}>
      {children}
    </colorsContext.Provider>
  )
}

export default ColorsProvider
