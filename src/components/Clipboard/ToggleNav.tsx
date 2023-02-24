import { NavigationType } from "../../lib/types"

type Props = {
  active: NavigationType
  setActive: React.Dispatch<React.SetStateAction<NavigationType>>
}

function ToggleNav({ active, setActive }: Props) {
  return (
    <div className="flex items-center">
      <div className="flex justify-center text-center my-2 border-2 border-primary-100 rounded-lg ">
        <p
          className={`px-4 py-2 ${
            active === 1 &&
            "bg-primary-100 rounded-lg shadow-md shadow-gray-400"
          } cursor-pointer`}
          onClick={() => setActive(1)}
        >
          Liked Palettes
        </p>
        <p
          className={`px-4 py-2 ${
            active === 2 &&
            "bg-primary-100 rounded-lg shadow-md shadow-gray-400"
          } cursor-pointer`}
          onClick={() => setActive(2)}
        >
          Clipboard
        </p>
      </div>
    </div>
  )
}

export default ToggleNav
