import { Link, useLocation } from "react-router-dom"
import Chromatico from "../../../assets/Chromatico"
import { useContext, useEffect, useState } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { AiOutlineHeart } from "react-icons/ai"
import { clipboardContext } from "../../../context/ClipboardProvider"

type Props = {
  setSave: React.Dispatch<React.SetStateAction<boolean>>
}

function Navbar({ setSave }: Props) {
  const location = useLocation()
  const [route, setRoute] = useState(location.pathname)

  function changeRoute() {
    if (route === "/") setRoute("/clipboard")
    else setRoute("/")
  }

  useEffect(() => {
    setRoute(location.pathname)
  }, [location])

  return (
    <section
      className={`${
        route === "/" ? "bg-primary-100" : "bg-accent-500"
      } grid grid-cols-2 md:grid-cols-[20%_80%] h-[10%]`}
    >
      <div className="flex justify-center items-center gap-4 cursor-pointer">
        <Link to="/">
          {/* <Chromatico size="10%" /> */}
          <p
            className={`font-chromatico text-3xl ${
              route === "/" ? "text-accent-500" : "text-primary-100"
            } mt-2`}
          >
            Chromatico
          </p>
        </Link>
      </div>
      <nav className="hidden md:grid grid-rows-2">
        <div className="justify-center my-auto items-center">
          <div className="primary-nav flex w-full justify-between ml-auto mr-8">
            <div></div>
            <Link
              to={route === "/clipboard" ? "/" : "/clipboard"}
              onClick={changeRoute}
            >
              {route === "/" ? (
                <div
                  className={`flex items-center cursor-pointer gap-1 ${
                    route === "/"
                      ? "hover:text-accent-500 "
                      : "hover:text-primary-100 "
                  } mr-2`}
                >
                  <p>Palettes</p>
                  <FiArrowRight className="-mt-[0.1rem]" />
                </div>
              ) : (
                <div
                  className={`flex items-center cursor-pointer gap-1 ${
                    route === "/"
                      ? "hover:text-accent-500 "
                      : "hover:text-primary-900 text-white"
                  } text-lg mr-2`}
                >
                  <p>Home</p>
                  <FiArrowLeft className="-mt-[0.1rem]" />
                </div>
              )}
            </Link>
          </div>
        </div>
        <div className="secondary-nav flex items-center justify-between px-2">
          {route === "/" && <p className="opacity-75">Spacebar to Generate</p>}
          {route === "/" && (
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-red-400 text-lg"
              onClick={() => setSave(true)}
            >
              <AiOutlineHeart />
              <p>Save Palette</p>
            </div>
          )}
        </div>
      </nav>
    </section>
  )
}

export default Navbar
