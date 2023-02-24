import { useContext, useEffect, useRef, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import ColorPalette from "../components/Palette/ColorPalette"
import PrimaryBtn from "../components/UIComponents/Buttons/PrimaryBtn"
import Notification from "../components/UIComponents/Modals/Notification"
import { clipboardContext } from "../context/ClipboardProvider"
import { colorsContext } from "../context/ColorsProvider"
import { randomNumber, convertToHex } from "../lib/math"
import { KeyboardEvent } from "../lib/types"

function HomePage() {
  const { colors, setColors } = useContext(colorsContext)
  const { palette } = useContext(clipboardContext)

  const [notification, setNotification] = useState(false)
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

    if (randomColor) setColors?.(randomColor)
  }

  function onKeyPress(event: KeyboardEvent) {
    if (event.key === " " && !modal) {
      generateRandomColors()
    }
    if (event.key === "Escape") {
      setModal(false)
    }
  }

  function copyPallete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = paletteNameRef.current?.value
    const NOTIFICATION_TIMER = 3000
    if (palette![0].name === "") palette?.pop()
    palette?.push({
      colors: colors!,
      name: name!,
    })
    setNotification(true)
    setModal(false)

    setTimeout(() => {
      setNotification(false)
    }, NOTIFICATION_TIMER)
  }

  useEffect(() => {
    generateRandomColors()
  }, [])

  useEffect(() => {
    document.addEventListener("keyup", onKeyPress)
    return () => {
      document.removeEventListener("keyup", onKeyPress)
    }
  }, [modal])

  return (
    <div className="w-full pt-16">
      <main className="flex flex-col">
        <ColorPalette />
        <div className="my-8 flex flex-col items-center gap-4 justify-center self-center w-full">
          <PrimaryBtn
            text="Generate Palette &nbsp; [Spacebar]"
            onClick={generateRandomColors}
          />
          <PrimaryBtn text="Copy Pallete" onClick={() => setModal(true)} />
        </div>
      </main>
      {notification && (
        <Notification
          text={`${paletteNameRef.current?.value} has been copied to clipboard`}
          setNotification={setNotification}
        />
      )}
      {modal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-gray-400">
          <div className="relative py-12 px-16 bg-primary-100 rounded-lg">
            <form onSubmit={copyPallete}>
              <div className="flex flex-col items-center gap-8">
                <div className="flex gap-4 items-center">
                  <label htmlFor="paletteName">Palette Name</label>
                  <input
                    type="text"
                    name="paletteName"
                    id="paletteName"
                    className="py-1 px-2"
                    ref={paletteNameRef}
                  />
                </div>
                <button
                  type="submit"
                  className="border-2 px-4 py-2 bg-primary-600 hover:bg-primary-400 rounded-lg"
                >
                  Copy Palette
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-4 text-red-600"
              onClick={() => setModal(false)}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
