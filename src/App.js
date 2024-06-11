/** @format */

import "./App.css"
import { useMediaQuery } from "react-responsive"
import PC from "./pc"
import Mobile from "./Mobile"

function App() {
  
  const isPc = useMediaQuery({ query: "(min-width: 768px)" })

   return <div className="App">{isPc ? <PC /> : <Mobile />}</div>
}

export default App
