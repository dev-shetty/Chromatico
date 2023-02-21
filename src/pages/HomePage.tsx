import { useContext, useEffect, useState } from "react"
import ColorPalette from "../components/Palette/ColorPalette"
import PrimaryBtn from "../components/UIComponents/Buttons/PrimaryBtn"
import { clipboardContext } from "../context/ClipboardProvider"
import { colorsContext } from "../context/ColorsProvider"
import { randomNumber, convertToHex } from "../lib/math"
import { KeyboardEvent } from "../lib/types"

function HomePage() {
  const { colors, setColors } = useContext(colorsContext)
  const { clipboard } = useContext(clipboardContext)

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

  function copyPallete() {
    colors?.map((color) => {
      const isColorAlreadyPresent = clipboard?.find(
        (existingColor) => existingColor === color
      )
      if (!isColorAlreadyPresent) clipboard?.push(color)
    })
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
        <div className="my-8 flex flex-col items-center gap-4 justify-center self-center w-full">
          <PrimaryBtn
            text="Generate Palette &nbsp; [Spacebar]"
            onClick={generateRandomColors}
          />
          <PrimaryBtn text="Copy Pallete" onClick={copyPallete} />
        </div>
      </main>
    </div>
  )
}

export default HomePage
