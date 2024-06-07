/** @format */

import React, { useState, useEffect } from "react";
import History from "./History.js";
import SearchBar from "./SearchBar.js";

function AddressSearch() {
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem('address')||'[]'),
  )

  useEffect(() => { 
    localStorage.setItem('address', JSON.stringify(address))
  }, [address])

  return (
    <>
      <SearchBar />
      <History />
    </>
  );
}

export default AddressSearch;
