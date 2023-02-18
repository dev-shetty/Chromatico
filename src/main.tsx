import React from "react"
import ReactDOM from "react-dom/client"
import ColorsProvider from "./context/ColorsProvider"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ColorsProvider>
      <App />
    </ColorsProvider>
  </React.StrictMode>
)
