import { useContext } from "react"
import { clipboardContext } from "../context/ClipboardProvider"

function ClipboardPage() {
  const { clipboard } = useContext(clipboardContext)
  console.log(clipboard)
  return (
    <section>
      <div>
        {clipboard?.map((color, index) => (
          <p key={index}>{color}</p>
        ))}
      </div>
    </section>
  )
}

export default ClipboardPage
