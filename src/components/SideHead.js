/** @format */

import logo from "../assets/logo.png"
import styled from "styled-components"
// import AddressSearch from "./Search/AddressSearch.js";
import CustomizedInputBase from "./Search/SearchBar.js"

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
	
  & img {
    padding-top: 5vh;
    width: 80%;
  }

  @media (max-width: 768px) {
		align-items: flex-start;
    & img {
      padding-left: 8%;
      width: 50%;
    }
  }
`

function SideHead({ setAddress }) {
  return (
    <Header>
      <img src={logo} className="logo" alt="logo" />
      {/* <AddressSearch /> */}
      <CustomizedInputBase setAddress={setAddress} />
    </Header>
  )
}

export default SideHead
