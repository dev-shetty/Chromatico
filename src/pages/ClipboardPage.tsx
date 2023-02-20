import { useContext, useState } from "react"
import Notification from "../components/UIComponents/Modals/Notification"
import { clipboardContext } from "../context/ClipboardProvider"
import { copyToClipboard } from "../lib/clipboard"

function ClipboardPage() {
  const { clipboard } = useContext(clipboardContext)

  const [copiedColor, setCopiedColor] = useState("")
  const [notification, setNotification] = useState(false)

  function onClick(color: string) {
    const NOTIFICATION_TIMER = 3000
    copyToClipboard(color)
    setNotification(true)
    setCopiedColor(color)

    setTimeout(() => {
      setNotification(false)
    }, NOTIFICATION_TIMER)
  }
  return (
    <section className="p-4">
      {notification && (
        <Notification
          text={`${copiedColor} has been copied to Clipboard`}
          setNotification={setNotification}
        />
      )}
      <h2 className="text-center font-bold text-3xl text-primary-100">
        Clipboard History
      </h2>
      <div className="m-2 p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {clipboard?.map((color, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className="h-36 aspect-square cursor-pointer rounded-lg"
                onClick={() => onClick(color)}
                style={{ backgroundColor: color }}
              ></div>
              <p>{color}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClipboardPage
