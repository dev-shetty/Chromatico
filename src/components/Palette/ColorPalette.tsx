import { motion } from "framer-motion"
import { useContext } from "react"
import { colorsContext } from "../../context/ColorsProvider"
import Palette from "./Palette"

function ColorPalette() {
  const { colors } = useContext(colorsContext)
  return (
    <section className="flex gap-4 mx-8">
      {colors &&
        colors.map((color, index) => (
          <motion.div
            className="w-full"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index / 10 }}
          >
            <Palette color={color} key={index} />
          </motion.div>
        ))}
    </section>
  )
}

export default ColorPalette
