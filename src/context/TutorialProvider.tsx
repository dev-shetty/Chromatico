import { createContext, Dispatch, SetStateAction, useState } from "react"
import { ChildrenProp, storagePrefix, TutorialStatus } from "../lib/types"

interface TutorialProps {
  tutorialStatus: TutorialStatus
  setTutorialStatus: Dispatch<SetStateAction<TutorialStatus>>
}

export const tutorialContext = createContext<Partial<TutorialProps>>({})

function TutorialProvider({ children }: ChildrenProp) {
  const [tutorialStatus, setTutorialStatus] =
    useState<TutorialStatus>("pending")
  return (
    <tutorialContext.Provider value={{ tutorialStatus, setTutorialStatus }}>
      {children}
    </tutorialContext.Provider>
  )
}

export default TutorialProvider
