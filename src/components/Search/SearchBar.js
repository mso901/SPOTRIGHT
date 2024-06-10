/** @format */

import React, { useState } from "react"
import styled from "styled-components"

const InputContainer = styled.div`
  width: 100%;
  text-align: center;
`

const Input = styled.input`
  margin: 5vh auto 5vh;
  width: 85%;
  height: 4vh;
  border-radius: 2.5rem;
  border: 3px solid #004aad;
`
const RemoveIcon = styled.span`

`

function SearchBar({ onAddAddress, onInputClick }) {
  const [address, setAddress] = useState("")

  const handleAddress = (e) => {
    setAddress(e.target.value)
  }

  // address 추가 후 입력 필드를 초기화
  const handleEnter = (e) => {
    //Enter 키가 눌렸는지 확인
    if (address && e.keyCode === 13) {
      onAddAddress(address)
      setAddress("")
    }
  }

  const handleClearAddress = () => {
    setAddress('')
  }

  // boolean 값으로 변경
  const hasAddress = !!address

  return (
    <>
      <InputContainer>
        <Input
          placeholer="주소를 입력해주세요"
          active={hasAddress}
          value={address}
          onChange={handleAddress}
          onKeyDown={handleEnter}
          onClick={onInputClick} // 검색 히스토리 보여줌
        />
        {address && <RemoveIcon onClick={handleClearAddress}>❌</RemoveIcon>}
      </InputContainer>
    </>
  )
}

export default SearchBar
