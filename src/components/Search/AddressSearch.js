/** @format */


import React, { useState, useEffect, useRef } from "react"
import logo from "../../assets/logo.png"
import styled from "styled-components"
import History from "./History.js"
import SearchBar from "./SearchBar.js"

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  & img {
    padding-top: 5vh;
    padding-left: 8%;
    width: 50%;
  }
`

function AddressSearch() {
	const [showHistory, setShowHistory] = useState(false);

	// 키에 해당하는 값을 받아옴. string 타입을 object로 변환
	const [addresses, setAddresses] = useState(
		JSON.parse(localStorage.getItem("addresses") || "[]")
	);

	const wrapperRef = useRef(null);

	useEffect(() => {
		// 키-값의 쌍을 보관함. array 타입을 string 타입을 변환
		localStorage.setItem("addresses", JSON.stringify(addresses));
	}, [addresses]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setShowHistory(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef]);

	// 검색히스토리 추가
	const handleAddAddress = (text) => {
		console.log("text", text);
		const newAddress = {
			id: Date.now(),
			text: text,
		};
		setAddresses([newAddress, ...addresses]);
	};

	// 검색어 삭제
	const handleRemoveAddress = (id) => {
		const nextAddress = addresses.filter((thisAddress) => {
			return thisAddress.id !== id;
		});
		setAddresses(nextAddress);
	};

	// 검색어 전체 삭제
	const handleClearAddress = () => {
		setAddresses([]);
	};

	// 검색 히스토리 보여주기
	const handleInputClick = () => {
		setShowHistory(true);
	};


  // 자식 컴포넌트에서 setState를 못함. 함수를 선언 후 그 함수를 넘겨줌.
  return (
    <Wrapper ref={wrapperRef}>
      <img src={logo} className="logo" alt="logo" />
      <SearchBar
        onAddAddress={handleAddAddress}
        onInputClick={handleInputClick}
      />
      {showHistory && (
        <History
          addresses={addresses}
          onRemoveAddress={handleRemoveAddress}
          onClearAddress={handleClearAddress}
        />
      )}
    </Wrapper>
  )

}

export default AddressSearch;
