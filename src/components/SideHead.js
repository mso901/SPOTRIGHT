/** @format */

import styled from "styled-components";
// import AddressSearch from "./Search/AddressSearch.js";
import CustomizedInputBase from "./Search/SearchBar.js";

const Header = styled.div`
	& img {
		padding-top: 5vh;
		width: 80%;
	}
`;

function SideHead({ setAddress }) {
	return (
		<Header>
			{/* <AddressSearch /> */}
			<CustomizedInputBase setAddress={setAddress} />
		</Header>
	);
}

export default SideHead;
