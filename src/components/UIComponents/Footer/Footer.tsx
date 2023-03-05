import { useContext } from "react"
import { AiOutlineHeart } from "react-icons/ai"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { IoMdGlasses } from "react-icons/io"
import { complementContext } from "../../../context/ComplementProvider"

type Props = {
  onGenerate: () => void
  onLike: () => void
  onLeftToggle: () => void
  onRightToggle: () => void
}

function Footer({ onGenerate, onLike, onLeftToggle, onRightToggle }: Props) {
  const { isComplementColor, setIsComplementColor } =
    useContext(complementContext)
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
          className="text-xl hover:text-red-500 cursor-pointer"
          title="Like the Palette"
          onClick={onLike}
        >
          <AiOutlineHeart />
        </p>
        <p
          className={`text-xl ${
            isComplementColor && "text-blue-600"
          } cursor-pointer`}
          title="Like the Palette"
          onClick={() => setIsComplementColor?.(!isComplementColor)}
        >
          <IoMdGlasses />
        </p>
      </div>
      {/* <div className="px-2 flex items-center gap-2 text-xl">
        <a href="https://github.com/Deveesh-Shetty/Chromatico" target="_blank">
          <FaGithub className="hover:text-accent-500 cursor-pointer" />
        </a>
        <a
          href="https://www.linkedin.com/in/deveesh-shetty-908539214"
          target="_blank"
        >
          <FaLinkedin className="hover:text-accent-500 cursor-pointer" />
        </a>
        <a href="https://twitter.com/shettydeveesh" target="_blank">
          <FaTwitter className="hover:text-accent-500 cursor-pointer" />
        </a>
      </div> */}
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
