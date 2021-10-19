import React from "react";
import styled from "styled-components";

const Header = () => {
  return <HeaderStyle>迷路ゲーム</HeaderStyle>;
};

const HeaderStyle = styled.header`
  border-bottom: solid 1px #ccc;
  font-size: 1.8rem;
  color: #000044;
  background-color: #ccc;
  padding-bottom: 20px;
  margin-bottom: 10px;
`;

export default Header;
