
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../context/contextProvider";



const Header = () => {
  const global = useContext(GlobalContext)
  console.log("address context", global )
  return(
        <HeaderDiv>
          This is the header
          <p>{global.state.name}</p>
        </HeaderDiv>
      )

}

export default Header;

const HeaderDiv = styled.div `
  background-color: yellow;
  height: 45px;
  width: 100%;
`
