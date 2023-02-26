import { AiOutlineHeart } from "react-icons/ai"

type Props = {
  onGenerate: () => void
  onLike: () => void
}

function Footer({ onGenerate, onLike }: Props) {
  return (
    <div className="flex lg:hidden h-[7%] items-center">
      <button
        className="mx-2 border-[1px] px-2 py-1 my-1 rounded-lg bg-accent-500"
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
  )
}

export default Footer
