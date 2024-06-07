/** @format */

import React from "react";
import styled from "styled-components";

const ListContainer = styled.ul``;

const AddressContainer = styled.li``;

const Address = styled.span``;

const RemoveButton = styled.button``;

function History() {
  return (
    <>
      <ListContainer>
        <AddressContainer>
          <Address></Address>
          <RemoveButton>x</RemoveButton>
        </AddressContainer>
      </ListContainer>
    </>
  );
}

export default History;
