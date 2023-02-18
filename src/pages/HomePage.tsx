import { useContext, useEffect, useState } from "react"
import ColorPalette from "../components/Palette/ColorPalette"
import PrimaryBtn from "../components/UIComponents/Buttons/PrimaryBtn"
import { colorsContext } from "../context/ColorsProvider"
import { randomNumber, convertToHex } from "../lib/math"
import { KeyboardEvent } from "../lib/types"

function HomePage() {
  const { setColors } = useContext(colorsContext)

  function generateRandomColors() {
    let n = 5
    const randomColor: string[] = []
    for (let i = 0; i < n; i++) {
      const color = `#${convertToHex(randomNumber(256))}${convertToHex(
        randomNumber(256)
      )}${convertToHex(randomNumber(256))}`
      randomColor.push(color)
    }
    // * "?." makes sure that the function is not undefined
    // * "Cannot invoke an object which is possibly 'undefined'." <- this bug

    if (randomColor) setColors?.(randomColor)
  }

  function onSpaceBar(event: KeyboardEvent) {
    if (event.key === " ") {
      generateRandomColors()
    }
  }

  useEffect(() => {
    generateRandomColors()

    document.addEventListener("keyup", onSpaceBar)

    return () => {
      document.removeEventListener("keyup", onSpaceBar)
    }
  }, [])

  return (
    <div className="w-full pt-16">
      <main className="flex flex-col">
        <ColorPalette />
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
