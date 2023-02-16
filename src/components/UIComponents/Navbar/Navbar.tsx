import { Link } from "react-router-dom"
import Chromatico from "../../../assets/Chromatico"

function Navbar() {
  return (
    <nav className="flex justify-center bg-primary-100 py-2 px-4">
      <Link to="/">
        <div className="flex flex-col items-center cursor-pointer">
          <Chromatico size={50} />
          {/* <p className="primary-gradient text-clip text-transparent bg-clip-text"> */}
          <p className="opacity-0 -ml-1">Chromatico</p>
        </div>
      </Link>
      <ul></ul>
    </nav>
  )
}

export default Navbar
