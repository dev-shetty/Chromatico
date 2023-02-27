import { motion } from "framer-motion"
import { useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { KeyboardEvent } from "../../../lib/types"

interface Props {
  text: string
  setNotification: (isNotification: boolean) => void
}

function Notification({ text, setNotification }: Props) {
  function onEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setNotification(false)
    }
  }
  useEffect(() => {
    document.addEventListener("keyup", onEscape)

    return () => {
      document.removeEventListener("keyup", onEscape)
    }
  }, [])

  return (
    <motion.div
      className="absolute top-[11%] left-1/2 -translate-x-1/2 flex items-center gap-4 bg-primary-100 text-center w-[98%] md:w-fit px-4 py-2 rounded-full z-10"
      initial={{ opacity: 0, y: -100, x: "-50%" }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-1">
        <p>{text}</p>
      </div>
      <AiOutlineClose
        className="scale-90 cursor-pointer hover:text-red-700"
        onClick={() => setNotification(false)}
      />
    </motion.div>
  )
}

export default Notification
