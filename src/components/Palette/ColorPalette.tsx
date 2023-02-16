import Palette from "./Palette"

interface Props {
  colors: string[]
}

function ColorPalette({ colors }: Props) {
  return (
    <section className="flex flex-col lg:flex-row gap-4 mx-8">
      {colors.map((color, index) => (
        <Palette color={color} key={index} />
      ))}
    </section>
  )
}

export default ColorPalette
