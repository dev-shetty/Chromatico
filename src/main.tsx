import React from "react"
import ReactDOM from "react-dom/client"
import ColorsProvider from "./context/ColorsProvider"
import ClipboardProvider from "./context/ClipboardProvider"
import HistoryProvider from "./context/HistoryProvider"
import ComplementProvider from "./context/ComplementProvider"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ColorsProvider>
      <HistoryProvider>
        <ClipboardProvider>
          <ComplementProvider>
            <App />
          </ComplementProvider>
        </ClipboardProvider>
      </HistoryProvider>
    </ColorsProvider>
  </React.StrictMode>
)
