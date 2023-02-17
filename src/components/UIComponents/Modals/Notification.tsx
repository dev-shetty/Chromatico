import { motion } from "framer-motion"
import { useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"

interface Props {
  text: string
  setNotification: (isNotification: boolean) => void
}

type Event = {
  key: string
}

function Notification({ text, setNotification }: Props) {
  function onEscape(event: Event) {
    if (event.key === "Escape") {
      setNotification(false)
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", onEscape)

    return () => {
      document.removeEventListener("keydown", onEscape)
    }
  }, [])

  return (
    <motion.div
      className="absolute top-[11%] left-1/2 -translate-x-1/2 flex items-center gap-4 bg-primary-100 w-[80%] md:w-fit px-4 py-2 rounded-full z-10"
      initial={{ opacity: 0, y: -100, x: "-50%" }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p>{text}</p>
      <AiOutlineClose
        className="scale-90 cursor-pointer hover:text-red-700"
        onClick={() => setNotification(false)}
      />
    </motion.div>
  )
}

export default Notification
