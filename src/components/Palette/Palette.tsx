import { useContext, useEffect, useState } from "react"
import Notification from "../UIComponents/Modals/Notification"
import { copyToClipboard } from "../../lib/clipboard"
import { clipboardContext } from "../../context/ClipboardProvider"
import { convertHexToRGB, convertHexToHSL } from "../../lib/math"
import { complementContext } from "../../context/ComplementProvider"

interface Props {
  color: string
}

function Palette({ color }: Props) {
  const { clipboard } = useContext(clipboardContext)
  const { isComplementColor } = useContext(complementContext)

  const [notification, setNotification] = useState(false)
  const [colorCode, setColorCode] = useState(color) // this is in hexCode (to toggle color format)
  const [copiedColor, setCopiedColor] = useState("") // To save to localStorage in the homepage itself and to give correct color to notification

  function onClick() {
    const NOTIFICATION_TIMER = 3000
    copyToClipboard(colorCode)
    setCopiedColor(colorCode)

    // To check whether the color is repeated if not then push
    const isColorAlreadyPresent = clipboard?.find(
      (existingColor) => existingColor === color
    )
    if (!isColorAlreadyPresent) clipboard?.push(color)

    setNotification(true)
    setTimeout(() => {
      setNotification(false)
    }, NOTIFICATION_TIMER)
  }

  function changeFormat() {
    if (isComplementColor) return
    if (colorCode.startsWith("#")) {
      const [red, green, blue] = convertHexToRGB(color)
      setColorCode(`rgb(${red}, ${green}, ${blue})`)
    } else if (colorCode.startsWith("rgb")) {
      const [hue, saturation, luminosity] = convertHexToHSL(color)
      setColorCode(`hsl(${hue}, ${saturation}%, ${luminosity}%)`)
    } else {
      setColorCode(color)
    }
  }

  useEffect(() => {
    setColorCode(color)
  }, [color])

  useEffect(() => {
    const storagePrefix = "chromatico"
    localStorage.setItem(
      storagePrefix + "-clipboard",
      JSON.stringify(clipboard)
    )
  }, [copiedColor])

  return (
    <>
      {notification && (
        <Notification
          text={`${copiedColor} has been copied to clipboard`}
          setNotification={setNotification}
        />
      )}
      <div className="relative h-full flex flex-col lg:basis-1/5 bg-white transition-all">
        <div
          className="color w-full h-full lg:h-full cursor-pointer"
          style={{
            backgroundColor: color,
          }}
          onClick={onClick}
        >
          <div
            className="color-code right-8 text-center bottom-1/2 translate-y-1/2 md:right-0 md:-translate-y-0 md:bottom-8 md:left-1/2 md:-translate-x-1/2 text-xl md:text-3xl absolute flex justify-center py-2 cursor-pointer md:w-full"
            onClick={changeFormat}
          >
            {colorCode}
          </div>
        </div>
      </div>
    </>
  )
}

export default Palette
