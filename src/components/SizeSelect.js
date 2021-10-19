import { Select, MenuItem, InputLabel } from "@material-ui/core";
import useSelectMenu from "../hooks/useSelectMenu";

const SizeSelect = () => {
  const { size, handleSizeChange } = useSelectMenu();

  return (
    <div>
      <InputLabel>size</InputLabel>
      <Select
        onChange={(event) => handleSizeChange(event.target.value)}
        value={size}
        displayEmpty
      >
        <MenuItem value={""} disabled>
          <em>サイズを選択してください</em>
        </MenuItem>
        <MenuItem value={10}>10 × 10</MenuItem>
        <MenuItem value={20}>20 × 20</MenuItem>
        <MenuItem value={30}>30 × 30</MenuItem>
        <MenuItem value={40}>40 × 40</MenuItem>
        <MenuItem value={50}>50 × 50</MenuItem>
      </Select>
    </div>
  );
};

export default SizeSelect;
