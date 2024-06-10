/** @format */

import React from "react"
import styled from "styled-components"

const ListContainer = styled.ul`
  width: 300px;
  height: 100px;
  border: 1px solid black;
`

const AddressContainer = styled.li``

const Address = styled.span``

const RemoveButton = styled.button``

const RemoveText = styled.span``

function History({ addresses, onRemoveAddress, onClearAddress }) {
  console.log("address", addresses)

  if (addresses.length === 0) {
    return <ListContainer>최근 검색된 기록이 없습니다.</ListContainer>
  }

  return (
    <>
      <ListContainer>
        {addresses.map(({ id, text }) => {
          return (
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
          )
        })}
      </ListContainer>
      <RemoveText onClick={onClearAddress}>전체삭제</RemoveText>
    </>
  )
}

export default History
