/** @format */

import styled from "styled-components"
import Data from './Data';
import AddressSearch from './Search/AddressSearch.js';

const Header = styled.div`
  & img {
    padding-top: 5vh;
    width: 80%;
  }
`


function SideBar() {
  return (
    <div className="sidebar">
      <Header>
        <AddressSearch />
      </Header>
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
