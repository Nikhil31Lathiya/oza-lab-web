import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropDown = ({ tempState, setTempState, data, title }) => {
  const handleChange = (event) => {
    setTempState(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        id="demo-simple-select"
        label={title}
        defaultValue={tempState}
        onChange={handleChange}
      >
        {data.map((dataItem, index) => (
          <MenuItem key={index} value={dataItem}>{dataItem}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
