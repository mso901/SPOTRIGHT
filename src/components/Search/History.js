/** @format */

import React from "react"
import styled from "styled-components"

const StyledHistory = styled.div`
  position: absolute;
  top: 9vh;
  left: 7.5%;
  width: 85%;
  background: white;
  z-index: 10;
  border: 1px solid gray;
`

const ListContainer = styled.ul``

const AddressContainer = styled.li``

const Address = styled.span``

const RemoveButton = styled.button``

const RemoveText = styled.span``

function History({ addresses, onRemoveAddress, onClearAddress }) {
  console.log("address", addresses)

  return (
    <>
      <StyledHistory>
        <ListContainer>
          {addresses.length === 0 ? (
            <AddressContainer>최근 검색된 기록이 없습니다.</AddressContainer>
          ) : (
            addresses.map(({ id, text }) => (
              <AddressContainer key={id}>
                <Address>{text}</Address>
                <RemoveButton
                  onClick={() => {
                    onRemoveAddress(id)
                  }}
                >
                  ❌
                </RemoveButton>
              </AddressContainer>
            ))
          )}
        </ListContainer>
        {addresses.length === 0 ? null : (
          <RemoveText onClick={onClearAddress}>전체삭제</RemoveText>
        )}
      </StyledHistory>
    </>
  )
}

export default History
