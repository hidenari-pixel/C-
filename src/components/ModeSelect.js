import { Select, MenuItem, InputLabel } from "@material-ui/core";
import useSelectMenu from "../hooks/useSelectMenu";

const ModeSelect = () => {
  const { mode, handleModeChange } = useSelectMenu();

  return (
    <div>
      <InputLabel>mode</InputLabel>
      <Select
        onChange={(event) => handleModeChange(event.target.value)}
        value={mode}
        displayEmpty
      >
        <MenuItem value={""} disabled>
          <em>モードを選択してください</em>
        </MenuItem>
        <MenuItem value={1}>到達モード</MenuItem>
        <MenuItem value={2}>最長モード</MenuItem>
      </Select>
    </div>
  );
};

export default ModeSelect;
