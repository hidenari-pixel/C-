import React from "react";
import styled from "styled-components";

const Header = () => {
  return <HeaderStyle>迷路ゲーム</HeaderStyle>;
};

const HeaderStyle = styled.header`
  border-bottom: solid 2px #999;
  font-size: 1.8rem;
  color: #000044;
  background-color: #b0c4de;
  padding-bottom: 10px;
`;

export default Header;
