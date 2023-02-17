import { AiOutlineClose } from "react-icons/ai"

interface Props {
  text: string
  setNotification: (isNotification: boolean) => void
}

function Notification({ text, setNotification }: Props) {
  return (
    <div className="absolute top-[12%] md:top-[10%] left-1/2 -translate-x-1/2 flex items-center gap-4 bg-primary-100 w-[80%] md:w-fit px-4 py-2 rounded-full">
      <p>{text}</p>
      <AiOutlineClose
        className="scale-90 cursor-pointer"
        onClick={() => setNotification(false)}
      />
    </div>
  )
}

export default Notification
