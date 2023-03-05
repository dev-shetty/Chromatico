import { motion } from "framer-motion"
import { useContext } from "react"
import { colorsContext } from "../../context/ColorsProvider"
import { complementContext } from "../../context/ComplementProvider"
import { getComplementary } from "../../lib/math"
import Palette from "./Palette"

function ColorPalette() {
  const { colors } = useContext(colorsContext)
  const { isComplementColor } = useContext(complementContext)

  return (
    <section className="h-full flex flex-col lg:flex-row overflow-hidden">
      {colors &&
        colors.map((color, index) => (
          <motion.div
            className="h-full w-full"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index / 10 }}
            key={index}
          >
            <Palette
              color={isComplementColor ? getComplementary(color) : color}
              key={index}
            />
          </motion.div>
        ))}
    </section>
  )
}

export default ColorPalette
