import ColorPalette from "../components/Palette/ColorPalette"
import PrimaryBtn from "../components/UIComponents/Buttons/PrimaryBtn"

function HomePage() {
  return (
    <div className="w-full pt-16">
      <main className="flex flex-col">
        <ColorPalette />
        <div className="my-8 flex justify-center self-center w-full">
          <PrimaryBtn text="Generate Palette" />
        </div>
      </main>
    </div>
  )
}

export default HomePage
