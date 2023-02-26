import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/UIComponents/Navbar/Navbar"
import ClipboardPage from "./pages/ClipboardPage"
import "./App.css"
import { useState } from "react"

function App() {
  const [save, setSave] = useState(false)
  return (
    <div className="h-full primary-gradient">
      <Router>
        <Navbar setSave={setSave} />
        <Routes>
          <Route
            path="/"
            element={<HomePage save={save} setSave={setSave} />}
          />
          <Route path="/clipboard" element={<ClipboardPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
