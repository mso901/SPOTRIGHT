/** @format */

import logo from "../assets/logo.png";
import Data from "./Data";
import AddressSearch from "./Search/AddressSearch.js";
import CustomizedInputBase from "./Search/SearchBar.js";

function SideBar({ setSelectedAddress }) {
	return (
		<div className="sidebar">
			<header className="header">
				<img src={logo} className="logo" alt="logo" />
				<CustomizedInputBase setAddress={setSelectedAddress} />
			</header>
			<nav>
				<ul>
					<li>menu1</li>
					<li>menu2</li>
					<li>menu3</li>
					<li>menu4</li>
				</ul>
			</nav>
			<Data />
		</div>
	);
}

export default SideBar;
