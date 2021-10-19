import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import useSelectMenu from "../hooks/useSelectMenu";

const windowStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
const Select = () => {
  const {
    size,
    mode,
    isModalOpen,
    openModalWindow,
    closeModalWindow,
    sizeSelect,
    modeSelect,
    buttons,
  } = useSelectMenu();

  return (
    <div className="menu">
      <MenuButtonWrapper onClick={() => openModalWindow()}>
        menu
      </MenuButtonWrapper>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => closeModalWindow()}
        style={windowStyle}
        contentLabel="EXAMPLE"
        overlayClassName="overlay"
      >
        <h3>迷路オプション</h3>
        <p> 迷路サイズ・モードを選択してください </p>
        <ul className="list">
          <li>迷路サイズ: {sizeSelect()}</li>
          <li>モード選択: {modeSelect()}</li>
        </ul>
        <h4>
          現在の迷路サイズは{size} × {size}
        </h4>
        <h4>{mode === 1 ? "到達" : "最長"} モードです</h4>
        <br />
        {buttons()}
      </Modal>
    </div>
  );
};

const MenuButtonWrapper = styled.button`
   {
    margin-top: 15px;
    width: 30%;
    height: 20%;
    color: grey;
    background-color: skyblue;
    font-size: 20px;
    font-weight: 0;
    text-decoration: none;
    transition: 0.3s;
    border-color: skyblue;
    white-space: unwrap;
  }
  :hover {
    color: #f2f2f2;
  }
`;

export default Select;
