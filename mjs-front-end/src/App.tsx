import { Outlet } from "react-router-dom"
import Root from "./store/Root"

function App() {

  return (
    <Root >
      <Outlet/>
    </Root>
  )
}

export default App
