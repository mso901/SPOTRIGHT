/** @format */

import { atom, useSetAtom } from "jotai"
import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import DaumPostcode from "react-daum-postcode"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton"
import Modal from "@mui/material/Modal"
import SearchIcon from "@mui/icons-material/Search"
import Box from "@mui/material/Box"
import InputAdornment from "@mui/material/InputAdornment"

// 입력한 주소
export const selectedAddress = atom("")
// 다른 파일에서 데이터 타입을 읽을 수 있게 export
// export const selectedAddress = atom((get) => get(address));

export default function SearchBar({ setSearchHistory }) {
  const [zipcode, setZipCode] = useState("")
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }
  const setAddress = useSetAtom(selectedAddress)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #316BFF",
    boxShadow: 24,
    p: 4,
  }

  const handleAddress = (data) => {
    const { address, zonecode } = data
    setZipCode(zonecode)
    setAddress(address)
    setSearchHistory((searchHis) => [...searchHis, address])
    handleClose()
  }

  const isPc = useMediaQuery({ query: "(min-width: 768px)" })

  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <Paper
        component="form"
        sx={{
          margin: "1rem 0",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: 2,
          borderColor: "#316BFF",
          borderRadius: 5,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="장소, 버스, 지하철 도로 검색"
          inputProps={{ "aria-label": "search google maps" }}
          onClick={handleOpen}
          startAdornment={
            <InputAdornment position="start">
              {isPc ? null : (
                <img
                  src="/S.png"
                  alt="logo icon"
                  style={{ width: "20px", marginTop: "-14px" }}
                />
              )}
            </InputAdornment>
          }
        />
        <IconButton
          type="button"
          sx={{ p: "10px", color: "#004AAD" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <DaumPostcode onComplete={handleAddress} />
        </Box>
      </Modal>
    </div>
  )
}
