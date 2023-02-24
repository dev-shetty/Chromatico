import { Link, useLocation } from "react-router-dom"
import Chromatico from "../../../assets/Chromatico"
import { useEffect, useState } from "react"
import { FiArrowRight } from "react-icons/fi"

function Navbar() {
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
    <section className="grid grid-cols-2 md:grid-cols-[20%_80%] h-[10%]">
      <div className="flex justify-center items-center gap-4 cursor-pointer">
        <Link to="/">
          {/* <Chromatico size="10%" /> */}
          <p className="font-chromatico text-3xl text-accent-500 mt-2">
            Chromatico
          </p>
        </Link>
      </div>
      <nav>
        <button>  </button>
      </nav>
      <nav className="hidden md:grid grid-rows-2">
        <div className="primary-nav flex justify-center items-center bg-primary-100">
          <div className="flex w-full justify-between ml-auto mr-8">
            <div className="ml-4">
              <p className="opacity-75">Spacebar to Generate</p>
            </div>
            <Link
              to={route === "/clipboard" ? "/" : "/clipboard"}
              onClick={changeRoute}
            >
              {route === "/" ? (
                // <TbClipboardText className="scale-150 cursor-pointer hover:scale-[1.75]" />
                <div className="flex items-center cursor-pointer gap-1 hover:text-accent-500">
                  <p>Palettes</p>
                  <FiArrowRight className="-mt-[0.1rem]" />
                </div>
              ) : (
                // <AiOutlineHome className="scale-150 cursor-pointer hover:scale-[1.75]" />
                <div className="flex items-center cursor-pointer gap-1 hover:text-accent-500">
                  <p>Home</p>
                </div>
              )}
            </Link>
          </div>
          <div className="secondary-nav"></div>
        </div>
      </nav>
    </section>
  )
}

export default Navbar
