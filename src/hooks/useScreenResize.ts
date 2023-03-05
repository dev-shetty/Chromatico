import { useEffect, useState } from "react"

function useScreenResize() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [screenWidth])
  return { screenWidth }
}

export default useScreenResize
