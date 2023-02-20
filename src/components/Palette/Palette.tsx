import { useContext, useState } from "react"
import Notification from "../UIComponents/Modals/Notification"
import { copyToClipboard } from "../../lib/clipboard"
import { colorsContext } from "../../context/ColorsProvider"
import { clipboardContext } from "../../context/ClipboardProvider"

interface Props {
  color: string
}

function Palette({ color }: Props) {
  const { clipboard } = useContext(clipboardContext)
  const { setCopiedColor } = useContext(colorsContext)

  const [notification, setNotification] = useState(false)

  function saveToClipboard() {
    const colorAlreadyPresent = clipboard?.find(
      (existingColor) => existingColor === color
    )
    if (!colorAlreadyPresent) clipboard?.push(color)
  }

  function onClick() {
    const NOTIFICATION_TIMER = 3000
    copyToClipboard(color)
    setCopiedColor?.(color)

    saveToClipboard()

    setNotification(true)
    setTimeout(() => {
      setNotification(false)
    }, NOTIFICATION_TIMER)
  }

  return (
    <>
      {notification && (
        <Notification
          text={`${color} has been copied to clipboard`}
          setNotification={setNotification}
        />
      )}
      <div className="flex flex-col lg:basis-1/5 bg-white rounded-lg shadow-lg shadow-gray-400 hover:scale-[1.01] hover:shadow-gray-500 transition-all">
        <div
          className="color w-full h-24 lg:h-96 cursor-pointer rounded-t-lg"
          style={{ backgroundColor: color }}
          onClick={onClick}
        ></div>
        <div className="color-code flex justify-center border-t-2 py-2 bg-slate-50 rounded-b-lg cursor-pointer">
          {color}
        </div>
      </div>
    </>
  )
}

export default Palette
