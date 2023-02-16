import Palette from "./Palette"

function ColorPalette() {
  return (
    <section className="flex flex-col lg:flex-row gap-4 mx-8">
      <Palette />
      <Palette />
      <Palette />
      <Palette />
      <Palette />
    </section>
  )
}

export default ColorPalette
