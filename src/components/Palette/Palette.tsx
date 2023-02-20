import { useContext, useEffect, useState } from "react"
import Notification from "../UIComponents/Modals/Notification"
import { copyToClipboard } from "../../lib/clipboard"
import { clipboardContext } from "../../context/ClipboardProvider"
import { convertHexToRGB, convertHexToHSL } from "../../lib/math"

interface Props {
  color: string
}

function Palette({ color }: Props) {
  const { clipboard } = useContext(clipboardContext)

  const [notification, setNotification] = useState(false)
  const [colorCode, setColorCode] = useState(color) // this is in hexCode

  function onClick() {
    const NOTIFICATION_TIMER = 3000
    copyToClipboard(colorCode)

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

  return (
    <>
      {notification && (
        <Notification
          text={`${colorCode} has been copied to clipboard`}
          setNotification={setNotification}
        />
      )}
      <div className="flex flex-col lg:basis-1/5 bg-white rounded-lg shadow-lg shadow-gray-400 hover:scale-[1.01] hover:shadow-gray-500 transition-all">
        <div
          className="color w-full h-24 lg:h-96 cursor-pointer rounded-t-lg"
          style={{ backgroundColor: color }}
          onClick={onClick}
        ></div>
        <div
          className="color-code flex justify-center border-t-2 py-2 bg-slate-50 rounded-b-lg cursor-pointer"
          onClick={changeFormat}
        >
          {colorCode}
        </div>
      </div>
    </>
  )
}

export default Palette
