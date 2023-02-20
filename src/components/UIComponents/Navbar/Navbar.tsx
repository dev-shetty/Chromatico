import { Link, useLocation } from "react-router-dom"
import { AiOutlineHome } from "react-icons/ai"
import { TbClipboardText } from "react-icons/tb"
import Chromatico from "../../../assets/Chromatico"
import { useEffect, useState } from "react"

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
    <nav className="flex justify-center items-center bg-primary-100 py-2 px-8">
      <Link to="/">
        <div className="flex flex-col items-center cursor-pointer">
          <Chromatico size={50} />
          {/* <p className="primary-gradient text-clip text-transparent bg-clip-text"> */}
          <p className="opacity-0 -ml-1">Chromatico</p>
        </div>
      </Link>
      <div className="ml-auto">
        <Link
          to={route === "/clipboard" ? "/" : "/clipboard"}
          onClick={changeRoute}
        >
          {route === "/" ? (
            <TbClipboardText className="scale-150 cursor-pointer hover:scale-[1.75]" />
          ) : (
            <AiOutlineHome className="scale-150 cursor-pointer hover:scale-[1.75]" />
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
