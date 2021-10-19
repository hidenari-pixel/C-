import { Button } from "@material-ui/core";
import useSelectMenu from "../hooks/useSelectMenu";

const Buttons = () => {
  const { timer, handleSetMaze, handleShowAnswer, closeModalWindow } =
    useSelectMenu();
  if (timer !== "stop") {
    return (
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSetMaze()}
          style={{ margin: 5 }}
        >
          再生成＆スタート
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleShowAnswer()}
          style={{ margin: 5 }}
        >
          解答
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => closeModalWindow()}
          style={{ margin: 5 }}
        >
          閉じる
        </Button>
      </div>
    );
  }
  return (
    <Button color="primary" variant="contained" onClick={() => handleSetMaze()}>
      生成{"&"}スタート
    </Button>
  );
};

export default Buttons;
