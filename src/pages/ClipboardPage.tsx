import { useContext, useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { motion } from "framer-motion"
import Notification from "../components/UIComponents/Modals/Notification"
import ToggleNav from "../components/Clipboard/ToggleNav"
import { clipboardContext } from "../context/ClipboardProvider"
import { copyToClipboard } from "../lib/clipboard"
import { NavigationType } from "../lib/types"

function ClipboardPage() {
  const { palette, clipboard, setClipboard, setPalette } =
    useContext(clipboardContext)

  const [copiedColor, setCopiedColor] = useState("")
  const [notification, setNotification] = useState(false)
  const [activeToggle, setActiveToggle] = useState<NavigationType>(2)

  useEffect(() => {
    const storagePrefix = "chromatico"
    localStorage.setItem(
      storagePrefix + "-clipboard",
      JSON.stringify(clipboard)
    )
    localStorage.setItem(storagePrefix + "-palette", JSON.stringify(palette))
  }, [clipboard, palette])

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
    if (activeToggle === 2) setClipboard?.([])
    else if (activeToggle === 1)
      setPalette?.([
        {
          colors: [],
          name: "",
        },
      ])
  }
  return (
    <section className="flex flex-col p-4">
      {notification && (
        <Notification
          text={`${copiedColor} has been copied to Clipboard`}
          setNotification={setNotification}
        />
      )}
      <h2 className="text-center font-bold text-4xl text-primary-100">
        Dashboard
      </h2>
      <div className="mx-auto my-4">
        <ToggleNav active={activeToggle} setActive={setActiveToggle} />
      </div>
      <div className="grid m-2 p-2 gap-4">
        {activeToggle === 1 && (
          <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 gap-2">
            {palette?.map((paletteItem, index) => (
              <motion.div
                className="flex flex-col items-center gap-2"
                key={index}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
              >
                <div key={index} className="flex items-center">
                  {paletteItem.colors.map((color, index) => (
                    <div
                      className="h-14 sm:h-20 aspect-square cursor-pointer gap-2"
                      key={index}
                      onClick={() => onClick(color)}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                <p>{paletteItem.name}</p>
              </motion.div>
            ))}
          </div>
        )}
        {activeToggle === 2 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
              {clipboard?.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="h-24 md:h-36 aspect-square cursor-pointer rounded-lg"
                    onClick={() => onClick(color)}
                    style={{ backgroundColor: color }}
                  ></div>
                  <p>{color}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
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
