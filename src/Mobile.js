/** @format */

import styled from "styled-components"
import KakaoMap from "./components/Map"
import AddressSearch from "./components/Search/AddressSearch.js"
import Data from "./components/Data.js"

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

function Mobile() {
  return (
    <>
      <MobileWrapper>
        <AddressSearch />
        <KakaoMap currAddr={address}/>
        <Data />
      </MobileWrapper>
    </>
  )
}

export default Mobile
