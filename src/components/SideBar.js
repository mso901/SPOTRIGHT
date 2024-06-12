/** @format */

import { useState } from "react";
import Data from "./Data";
import SideHead from "./SideHead.js";

function SideBar({ setAddress }) {
	return (
		<div className="sidebar">
			<SideHead setAddress={setAddress} />
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
