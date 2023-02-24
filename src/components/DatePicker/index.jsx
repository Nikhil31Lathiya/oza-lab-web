import { TextField } from "@mui/material";
import React from "react";

const DatePicker = ({tempState, setTempState}) => {
  return (
    <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue={tempState}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => setTempState(event.target.value)}
      />
  );
};

export default DatePicker;
