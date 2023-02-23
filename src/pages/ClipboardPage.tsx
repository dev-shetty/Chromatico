import { useContext, useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { motion } from "framer-motion"
import Notification from "../components/UIComponents/Modals/Notification"
import { clipboardContext } from "../context/ClipboardProvider"
import { copyToClipboard } from "../lib/clipboard"

function ClipboardPage() {
  const { clipboard, setClipboard } = useContext(clipboardContext)

  const [copiedColor, setCopiedColor] = useState("")
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    const storagePrefix = "chromatico"
    localStorage.setItem(
      storagePrefix + "-clipboard",
      JSON.stringify(clipboard)
    )
  }, [clipboard])

  function onClick(color: string) {
    const NOTIFICATION_TIMER = 3000
    copyToClipboard(color)
    setNotification(true)
    setCopiedColor(color)

    setTimeout(() => {
      setNotification(false)
    }, NOTIFICATION_TIMER)
  }

  function clearClipboard() {
    setClipboard?.([])
  }
  return (
    <section className="p-4">
      {notification && (
        <Notification
          text={`${copiedColor} has been copied to Clipboard`}
          setNotification={setNotification}
        />
      )}
      <h2 className="text-center font-bold text-4xl text-primary-100">
        Clipboard History
      </h2>
      <div className="grid lg:grid-cols-[40%_60%] m-2 p-2 my-8 gap-4">
        <div className="flex flex-col gap-4">
          <p className="text-center font-bold text-3xl text-primary-100">
            Pallete
          </p>
          <div className="flex flex-col items-center gap-2 mx-auto">
            <div className="flex">
              {clipboard?.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="h-24 aspect-square cursor-pointer"
                    onClick={() => onClick(color)}
                    style={{ backgroundColor: color }}
                  ></div>
                </motion.div>
              ))}
            </div>
            <p>Pallete Name</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-center font-bold text-3xl text-primary-100">
            Colors
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {clipboard?.map((color, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="h-36 aspect-square cursor-pointer rounded-lg"
                  onClick={() => onClick(color)}
                  style={{ backgroundColor: color }}
                ></div>
                <p>{color}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8">
        <button
          className="bg-red-500 p-4 text-primary-100 rounded-full hover:text-red-500 hover:bg-primary-100 transition-colors"
          title="Clear Clipboard"
          onClick={clearClipboard}
        >
          <FiTrash2 className="scale-150" />
        </button>
      </div>
    </section>
  )
}

export default ClipboardPage
