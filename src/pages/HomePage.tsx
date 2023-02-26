import { useContext, useEffect, useRef, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { v4 as uuid } from "uuid"
import ColorPalette from "../components/Palette/ColorPalette"
import PrimaryBtn from "../components/UIComponents/Buttons/PrimaryBtn"
import Footer from "../components/UIComponents/Footer/Footer"
import Notification from "../components/UIComponents/Modals/Notification"
import { clipboardContext } from "../context/ClipboardProvider"
import { colorsContext } from "../context/ColorsProvider"
import { historyContext } from "../context/HistoryProvider"
import { randomNumber, convertToHex } from "../lib/math"
import { KeyboardEvent } from "../lib/types"

type Props = {
  save: boolean
  setSave: React.Dispatch<React.SetStateAction<boolean>>
}

function HomePage({ save, setSave }: Props) {
  const { colors, setColors } = useContext(colorsContext)
  const { palette } = useContext(clipboardContext)
  const { history, setHistory } = useContext(historyContext)

  const [notification, setNotification] = useState(false)
  const [index, setIndex] = useState(1)
  const [modal, setModal] = useState(false)

  const paletteNameRef = useRef<HTMLInputElement>(null)

  function generateRandomColors() {
    let n = 5
    const randomColor: string[] = []
    for (let i = 0; i < n; i++) {
      const color = `#${convertToHex(randomNumber(256))}${convertToHex(
        randomNumber(256)
      )}${convertToHex(randomNumber(256))}`
      randomColor.push(color)
    }
    // * "?." makes sure that the function is not undefined
    // * "Cannot invoke an object which is possibly 'undefined'." <- this bug

    if (randomColor) {
      setColors?.(randomColor)
      history?.push(randomColor)
    }
  }

  function onKeyPress(event: KeyboardEvent) {
    if (event.key === " " && !modal) {
      generateRandomColors()
    }
    if (event.key === "Escape") {
      setModal(false)
    }
    if (event.key === "ArrowLeft") {
      if (index < history?.length! - 2) {
        console.log("History Length: " + (history?.length! - 2))
        setIndex((prev) => prev + 1)
        console.log("Left Index: " + index)
        setColors?.(history![history?.length! - index - 1])
      }
    }
    if (event.key === "ArrowRight") {
      if (index > 0) {
        console.log("History Length: " + history?.length)
        setIndex((prev) => prev - 1)
        console.log("Right Index: " + index)
        setColors?.(history![history?.length! - index - 1])
      }
    }
  }

  function copyPallete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = paletteNameRef.current?.value
    const NOTIFICATION_TIMER = 3000
    // if (palette![0].name === "") palette?.pop()
    palette?.push({
      uuid: uuid(),
      colors: colors!,
      name: name!,
    })
    setNotification(true)
    setModal(false)
    setSave(false)

    setTimeout(() => {
      setNotification(false)
    }, NOTIFICATION_TIMER)
  }

  useEffect(() => {
    generateRandomColors()
  }, [])

  useEffect(() => {
    if (save) {
      setModal(true)
    }
  }, [save])

  useEffect(() => {
    document.addEventListener("keyup", onKeyPress)
    return () => {
      document.removeEventListener("keyup", onKeyPress)
    }
  }, [modal, index])

  return (
    <div className="h-[90%] w-full">
      <main className="h-full flex flex-col">
        <ColorPalette />
        <Footer
          onGenerate={generateRandomColors}
          onLike={() => setModal(true)}
        />
      </main>
      {notification && (
        <Notification
          text={`${paletteNameRef.current?.value} has been copied to clipboard`}
          setNotification={setNotification}
        />
      )}
      {modal && (
        <div className="absolute flex flex-col items-center justify-center bg-primary-100 rounded-lg h-2/5 aspect-[6/5] md:aspect-[4/3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <form onSubmit={copyPallete}>
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="paletteName">Palette Name</label>
                <input
                  type="text"
                  name="paletteName"
                  id="paletteName"
                  className="p-2 border border-gray-500 w-full rounded-lg"
                  autoFocus
                  ref={paletteNameRef}
                />
              </div>
              <PrimaryBtn type="submit" text="Save"></PrimaryBtn>
            </div>
          </form>
          <button
            className="absolute top-4 right-4 text-xl text-red-500 hover:rotate-90 transition-all"
            onClick={() => {
              setModal(false)
              setSave(false)
            }}
          >
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage
