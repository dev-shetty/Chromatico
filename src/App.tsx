import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/UIComponents/Navbar/Navbar"
import ClipboardPage from "./pages/ClipboardPage"
import "./App.css"

function App() {
  return (
    <div className="h-full primary-gradient">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clipboard" element={<ClipboardPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
