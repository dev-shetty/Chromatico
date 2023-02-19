import React from "react"
import ReactDOM from "react-dom/client"
import ColorsProvider from "./context/ColorsProvider"
import App from "./App"
import ClipboardProvider from "./context/ClipboardProvider"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ColorsProvider>
      <ClipboardProvider>
        <App />
      </ClipboardProvider>
    </ColorsProvider>
  </React.StrictMode>
)
