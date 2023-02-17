import { useEffect, useState } from "react"
import ColorPalette from "../components/Palette/ColorPalette"
import PrimaryBtn from "../components/UIComponents/Buttons/PrimaryBtn"
import { randomNumber, convertToHex } from "../lib/math"
import { KeyboardEvent } from "../lib/types"

function HomePage() {
  const [randomColors, setRandomColors] = useState<string[]>([])

  function generateRandomColors() {
    let n = 5
    const randomColor: string[] = []
    for (let i = 0; i < n; i++) {
      const color = `#${convertToHex(randomNumber(256))}${convertToHex(
        randomNumber(256)
      )}${convertToHex(randomNumber(256))}`
      randomColor.push(color)
    }
    setRandomColors(randomColor)
  }

  function onSpaceBar(event: KeyboardEvent) {
    if (event.key === " ") {
      generateRandomColors()
    }
  }

  useEffect(() => {
    generateRandomColors()

    document.addEventListener("keydown", onSpaceBar)

    return () => {
      document.removeEventListener("keydown", onSpaceBar)
    }
  }, [])

  return (
    <div className="w-full pt-16">
      <main className="flex flex-col">
        <ColorPalette colors={randomColors} />
        <div className="my-8 flex justify-center self-center w-full">
          <PrimaryBtn
            text="Generate Palette &nbsp; [Spacebar]"
            onClick={generateRandomColors}
          />
        </div>
      </main>
    </div>
  )
}

export default HomePage
