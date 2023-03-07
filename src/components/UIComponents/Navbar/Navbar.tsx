import { Link, useLocation } from "react-router-dom"
import Chromatico from "../../../assets/Chromatico"
import Joyride from "react-joyride"
import { Dispatch, useContext, useEffect, useState } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import useScreenResize from "../../../hooks/useScreenResize"
import { IoMdGlasses } from "react-icons/io"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { AiOutlineHeart } from "react-icons/ai"
import { complementContext } from "../../../context/ComplementProvider"
import { navbarSteps } from "../../../lib/steps"
import { storagePrefix, Data } from "../../../lib/types"
import { tutorialContext } from "../../../context/TutorialProvider"

type Props = {
  setCopyPalette: Dispatch<React.SetStateAction<boolean>>
}

function Navbar({ setCopyPalette }: Props) {
  const { screenWidth } = useScreenResize()

  const [steps] = useState(navbarSteps)
  const { tutorialStatus, setTutorialStatus } = useContext(tutorialContext)

  const location = useLocation()
  const [route, setRoute] = useState(location.pathname)

  const { isComplementColor, setIsComplementColor } =
    useContext(complementContext)

  function changeRoute() {
    if (route === "/") setRoute("/clipboard")
    else setRoute("/")
  }

  function handleJoyRide(data: Data) {
    const { action, status } = data
    if (status === "running") {
      document.body.style.position = "fixed"
    } else {
    }
    if (action === "reset") {
      localStorage.setItem(storagePrefix + "tutorial-status", "completed")
      document.body.style.position = "relative"
    }
  }

  useEffect(() => {
    setRoute(location.pathname)
  }, [location])

  useEffect(() => {
    const checkTutorialStatus = localStorage.getItem(
      storagePrefix + "tutorial-status"
    )
    if (checkTutorialStatus === "completed") {
      setTutorialStatus?.(checkTutorialStatus)
    }
  }, [route])

  return (
    <>
      {screenWidth >= 768 && route === "/" && (
        <Joyride
          steps={steps}
          continuous
          run={tutorialStatus === "pending"}
          showSkipButton
          locale={{ last: "Finish" }}
          callback={handleJoyRide}
          styles={{
            options: {
              primaryColor: "var(--secondary)",
            },
          }}
        />
      )}
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
        <div className="md:hidden ml-auto mr-2 self-center">
          <Link to={route === "/" ? "/clipboard" : "/"}>
            <div
              className={`flex items-center cursor-pointer gap-1 text-accent-500 mr-2`}
            >
              {route === "/" ? (
                <>
                  <p>Palettes</p>
                  <FiArrowRight className="-mt-[0.1rem]" />
                </>
              ) : (
                <>
                  <p className="text-primary-100">Home</p>
                  <FiArrowLeft className="-mt-[0.1rem] text-primary-100" />
                </>
              )}
            </div>
          </Link>
        </div>
        <nav className="hidden md:grid grid-rows-2">
          <div className="justify-center my-auto items-center">
            <div className="primary-nav flex w-full justify-between ml-auto mr-8">
              <div className="px-2 flex items-center gap-2 text-xl">
                <a
                  href="https://github.com/Deveesh-Shetty/Chromatico"
                  target="_blank"
                  className="github"
                >
                  <FaGithub
                    className={`${
                      route === "/"
                        ? "hover:text-accent-500"
                        : "text-primary-100 hover:text-primary-900"
                    } cursor-pointer`}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/deveesh-shetty-908539214"
                  target="_blank"
                >
                  <FaLinkedin
                    className={`${
                      route === "/"
                        ? "hover:text-accent-500"
                        : "text-primary-100 hover:text-primary-900"
                    } cursor-pointer`}
                  />
                </a>
                <a href="https://twitter.com/shettydeveesh" target="_blank">
                  <FaTwitter
                    className={`${
                      route === "/"
                        ? "hover:text-accent-500"
                        : "text-primary-100 hover:text-primary-900"
                    } cursor-pointer`}
                  />
                </a>
              </div>
              <Link
                to={route === "/clipboard" ? "/" : "/clipboard"}
                onClick={changeRoute}
              >
                <div
                  className={`flex items-center cursor-pointer gap-1 ${
                    route === "/"
                      ? "hover:text-accent-500 "
                      : "hover:text-primary-100 "
                  } mr-2`}
                >
                  {route === "/" ? (
                    <>
                      <p>Palettes</p>
                      <FiArrowRight className="-mt-[0.1rem]" />
                    </>
                  ) : (
                    <>
                      <p>Home</p>
                      <FiArrowLeft className="-mt-[0.1rem]" />
                    </>
                  )}
                </div>
              </Link>
            </div>
          </div>
          <div className="secondary-nav flex items-center justify-between px-2">
            {route === "/" && (
              <>
                <div className="generate-palette opacity-75">
                  <kbd>Spacebar</kbd> to Generate
                </div>
                <div className="toggle-history opacity-75 flex items-center gap-2">
                  Press <kbd>&#8592;</kbd> <kbd>&#8594;</kbd> for History
                </div>
              </>
            )}
            {route === "/" && (
              <div className="flex gap-4">
                <div
                  className={`complement-colors flex items-center gap-2 cursor-pointer ${
                    isComplementColor && "text-blue-600"
                  } text-lg`}
                  onClick={() => setIsComplementColor?.(!isComplementColor)}
                >
                  <IoMdGlasses title="Complementary Colors" />
                  <p className="hidden xl:block">Complement</p>
                </div>
                <div
                  className="save-palette flex items-center gap-2 cursor-pointer hover:text-red-400 text-lg"
                  onClick={() => setCopyPalette(true)}
                >
                  <AiOutlineHeart title="Save Palette" />
                  <p className="hidden xl:block">Save Palette</p>
                </div>
              </div>
            )}
          </div>
        </nav>
      </section>
    </>
  )
}

export default Navbar
