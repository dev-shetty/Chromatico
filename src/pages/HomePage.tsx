import { useEffect, useState } from "react"
import ColorPalette from "../components/Palette/ColorPalette"
import PrimaryBtn from "../components/UIComponents/Buttons/PrimaryBtn"
import { randomNumber, convertToHex } from "../lib/math"

function HomePage() {
  const [randomColors, setRandomColors] = useState<string[]>([])

  function generateRandomColors() {
    let n = 5
    const randomColor: string[] = []
    for (let i = 0; i < n; i++) {
      const color = `#${convertToHex(randomNumber(255))}${convertToHex(
        randomNumber(255)
      )}${convertToHex(randomNumber(255))}`
      randomColor.push(color)
    }
    setRandomColors(randomColor)
  }

  useEffect(() => {
    generateRandomColors()
  }, [])

  return (
    <div className="w-full pt-16">
      <main className="flex flex-col">
        <ColorPalette colors={randomColors} />
        <div className="my-8 flex justify-center self-center w-full">
          <PrimaryBtn text="Generate Palette" onClick={generateRandomColors} />
        </div>
      </main>
    </div>
  )
}

export default HomePage
