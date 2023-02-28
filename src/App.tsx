import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/UIComponents/Navbar/Navbar"
import ClipboardPage from "./pages/ClipboardPage"
import { useState } from "react"
import "./App.css"

function App() {
  const [copyPalette, setCopyPalette] = useState(false)
  return (
    <div className="h-full primary-gradient">
      <Router>
        <Navbar setCopyPalette={setCopyPalette} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                copyPalette={copyPalette}
                setCopyPalette={setCopyPalette}
              />
            }
          />
          <Route path="/clipboard" element={<ClipboardPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
