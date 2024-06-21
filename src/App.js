/** @format */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import { TourProvider } from "@reactour/tour";
import PC from "./pc";
import Mobile from "./Mobile";
import steps from "./steps";

function App() {
  const isPc = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="App">
      <TourProvider steps={steps}>
        <ToastContainer className="toast-container" hideProgressBar={true} />
        {isPc ? <PC /> : <Mobile />}
      </TourProvider>
    </div>
  );
}

export default App;
