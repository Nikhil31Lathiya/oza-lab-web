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
      {/* <Select
        id="demo-simple-select"
        label={title}
        defaultValue={tempState}
        onChange={handleChange}
      > */}
      <Select
        id="demo-simple-select"
        label={title}
        defaultValue={typeof tempState === "string" ? tempState : tempState.name ? tempState.name : tempState.email}
        // defaultValue={tempState}
        onChange={handleChange}
      >
        {data.length > 0 &&
          data.map((dataItem, index) => {
            return (
              <MenuItem
                key={index}
                // value={dataItem}
                // defaultValue={typeof dataItem === "string" ? dataItem : dataItem.name}
                // defaultValue={typeof tempState === "string" ? tempState : dataItem.name}
                value={typeof dataItem === "string" ? dataItem : dataItem.name ? dataItem.name : dataItem.email}
              >
                {typeof dataItem === "string" ? dataItem : dataItem.name ? dataItem.name : dataItem.email}
                {/* {dataItem} */}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default DropDown;
