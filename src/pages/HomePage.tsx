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
  copyPalette: boolean
  setCopyPalette: React.Dispatch<React.SetStateAction<boolean>>
}

function HomePage({ copyPalette, setCopyPalette }: Props) {
  const { colors, setColors } = useContext(colorsContext)
  const { palette } = useContext(clipboardContext)
  const { history } = useContext(historyContext)

  const [notification, setNotification] = useState(false)
  const [modal, setModal] = useState(false)

  const offset = useRef({ value: 0 })
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
  }

  function toggleLeft() {
    const historyLength: number = history?.length!
    if (offset.current.value < historyLength - 2) {
      // -2 because there are already 3 elements in skeletal history
      offset.current.value += 1
      setColors?.(history![historyLength - offset.current.value - 1])
    }
  }

  function toggleRight() {
    const historyLength: number = history?.length!
    if (offset.current.value > 0) {
      offset.current.value -= 1
      setColors?.(history![historyLength - offset.current.value - 1])
    }
  }

  function toggleHistory(event: KeyboardEvent) {
    if (modal) return
    if (event.key === "ArrowLeft") {
      toggleLeft()
    }
    if (event.key === "ArrowRight") {
      toggleRight()
    }
  }

  function onCopyPallete(e: React.FormEvent<HTMLFormElement>) {
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
    setCopyPalette(false)

    setTimeout(() => {
      setNotification(false)
    }, NOTIFICATION_TIMER)
  }

  useEffect(() => {
    generateRandomColors()
  }, [])

  useEffect(() => {
    if (copyPalette) {
      setModal(true)
    }
    const storagePrefix = "chromatico"
    localStorage.setItem(storagePrefix + "-palette", JSON.stringify(palette))
  }, [copyPalette])

  useEffect(() => {
    document.addEventListener("keyup", onKeyPress)
    return () => {
      document.removeEventListener("keyup", onKeyPress)
    }
  }, [modal])

  useEffect(() => {
    document.addEventListener("keyup", toggleHistory)
    return () => {
      document.removeEventListener("keyup", toggleHistory)
    }
  }, [offset, modal])

  return (
    <div className="home-page h-[90%] w-full">
      <main className="palette h-full flex flex-col">
        <ColorPalette />
        <Footer
          onGenerate={generateRandomColors}
          onLike={() => setModal(true)}
          onLeftToggle={toggleLeft}
          onRightToggle={toggleRight}
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
          <form onSubmit={onCopyPallete}>
            <div className="flex flex-col items-center gap-8">
              <h2 className="text-3xl font-chromatico">Save Palette</h2>
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
              setCopyPalette(false)
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
