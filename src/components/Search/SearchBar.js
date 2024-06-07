/** @format */

import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  margin: 5vh auto 5vh;
  width: 85%;
  height: 4vh;
  border-radius: 2.5rem;
  border: 3px solid #004aad;
`;

function SearchBar() {
  return (
    <>
      <InputContainer>
        <Input placeholer="주소를 입력해주세요" />
        {/* <RemoveIcon/> */}
      </InputContainer>
    </>
  );
}

export default SearchBar;
