import { useState } from "react"
import Notification from "../UIComponents/Modals/Notification"
import { copyToClipboard } from "../../lib/clipboard"

interface Props {
  color: string
}

function Palette({ color }: Props) {
  const [notification, setNotification] = useState(false)
  function onClick() {
    const NOTIFICATION_TIMER = 3000
    copyToClipboard(color)
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
