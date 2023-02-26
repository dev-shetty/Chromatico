import { AiOutlineHeart } from "react-icons/ai"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

type Props = {
  onGenerate: () => void
  onLike: () => void
  onLeftToggle: () => void
  onRightToggle: () => void
}

function Footer({ onGenerate, onLike, onLeftToggle, onRightToggle }: Props) {
  return (
    <div className="flex lg:hidden h-[7%] items-center justify-between mx-2">
      <div className="flex items-center gap-2">
        <button
          className="border-[1px] px-2 py-1 my-1 rounded-lg bg-accent-500"
          onClick={onGenerate}
        >
          Generate
        </button>
        <p
          className="text-xl hover:text-red-500"
          title="Like the Palette"
          onClick={onLike}
        >
          <AiOutlineHeart />
        </p>
      </div>
      <div className="flex items-center gap-2">
        <FiArrowLeft onClick={onLeftToggle} className="hover:text-accent-500" />
        <p>History</p>
        <FiArrowRight
          onClick={onRightToggle}
          className="hover:text-accent-500"
        />
      </div>
    </div>
  )
}

export default Footer
