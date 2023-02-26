import { createContext, useState } from "react"
import { ChildrenProp } from "../lib/types"

type HistoryProps = {
  history: [string[]]
  setHistory: (history: [string[]]) => void
}

export const historyContext = createContext<Partial<HistoryProps>>({})

function HistoryProvider({ children }: ChildrenProp) {
  const [history, setHistory] = useState<[string[]]>([[]])

  return (
    <historyContext.Provider value={{ history, setHistory }}>
      {children}
    </historyContext.Provider>
  )
}

export default HistoryProvider
