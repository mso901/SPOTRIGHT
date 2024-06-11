/** @format */

import "./App.css";
import SideBar from "./components/SideBar";
import KakaoMap from "./components/Map";
import { useState } from "react";

function App() {
	const [address, setAddress] = useState("");

	return (
		<div className="App">
			<SideBar setSelectedAddress={setAddress} />
			<KakaoMap currAddr={address} />
			{console.log(address)}
		</div>
	);
}

export default App;
