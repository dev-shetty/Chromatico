import React from "react"
import ReactDOM from "react-dom/client"
import ColorsProvider from "./context/ColorsProvider"
import App from "./App"
import ClipboardProvider from "./context/ClipboardProvider"
import HistoryProvider from "./context/HistoryProvider"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ColorsProvider>
      <HistoryProvider>
        <ClipboardProvider>
          <App />
        </ClipboardProvider>
      </HistoryProvider>
    </ColorsProvider>
  </React.StrictMode>
)
