import "./App.css"
import AppRoutes from "./routes/AppRoutes"

import TheObserver from "./components/TheObserver"

function App() {
  return (
    <>
      <div className="noise-overlay"></div>
      <TheObserver />
      <AppRoutes />
    </>
  )
}

export default App
