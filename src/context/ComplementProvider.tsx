import { createContext, useState } from "react"
import { ChildrenProp } from "../lib/types"

type ComplementProps = {
  isComplementColor: boolean
  setIsComplementColor: (isComplementColor: boolean) => void
}

export const complementContext = createContext<Partial<ComplementProps>>({})

function ComplementProvider({ children }: ChildrenProp) {
  const [isComplementColor, setIsComplementColor] = useState(false)

  return (
    <complementContext.Provider
      value={{ isComplementColor, setIsComplementColor }}
    >
      {children}
    </complementContext.Provider>
  )
}

export default ComplementProvider
