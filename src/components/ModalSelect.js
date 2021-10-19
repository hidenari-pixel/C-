import Modal from "react-modal";
import useSelectMenu from "../hooks/useSelectMenu";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import SizeSelect from "./SizeSelect";
import ModeSelect from "./ModeSelect";
import Buttons from "./Buttons";

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
const ModalSelect = () => {
  const { size, mode, isModalOpen, openModalWindow, closeModalWindow } =
    useSelectMenu();

  return (
    <MenuWrapper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => openModalWindow()}
      >
        menu
      </Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => closeModalWindow()}
        style={windowStyle}
        contentLabel="EXAMPLE"
        overlayClassName="overlay"
      >
        <h3>迷路オプション</h3>
        <p> 迷路サイズ・モードを選択してください </p>
        <SizeSelect />
        <ModeSelect />
        <br />
        <h4>
          現在の迷路サイズは{size} × {size}
        </h4>
        <h4>{mode === 1 ? "到達" : "最長"} モードです</h4>
        <br />
        <Buttons />
      </Modal>
    </MenuWrapper>
  );
};

export default ModalSelect;

const MenuWrapper = styled.div`
  padding-top: 5px;
`;
