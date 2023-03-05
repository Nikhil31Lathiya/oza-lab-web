import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import DropDown from "../Dropdown";
import DatePicker from "../DatePicker";
import { FormLabel } from "react-bootstrap";
import { json, useLocation, useNavigate } from "react-router-dom";
import { sendMail } from "../Actions/SendMail";
import { MailExists } from "../Actions/MailExists";
import addPatientAction from "../Actions/AddPatients";
import AddTestAction from "../Actions/AddTests";
import updateTest from "../Actions/UpdateTests";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    marginLeft: `240px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const EditTestForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, setName] = useState(state.name);
  const [shortName, setShortName] = useState(state.shortName);
  const [isActive, setIsActive] = useState(state.isActive);
  const [price, setPrice] = useState(state.price);
  const [measurement, setMeasurement] = useState(state.measurement);
  const [error, setError] = useState("");
  const editTest = async (e) => {
    e.preventDefault();
    const test = await updateTest(state.id, {
      name,
      shortName,
      isActive: isActive === 'false' ? false : true,
      price: parseFloat(price),
      measurement,
    });
    if (test.data) {
      navigate("/test/viewTest");
    }
    else {
      setError("Something went wrong while updating test. please try again");
    }
  };
  return (
    <Main>
      <div className="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Edit Test</h4>
              <h4>{error}</h4>
              <form>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="text"
                    className="form-control form-control-lg"
                    label="Name"
                    variant="outlined"
                    defaultValue={state.name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="text"
                    className="form-control form-control-lg"
                    label="Short Name"
                    variant="outlined"
                    defaultValue={state.shortName}
                    onChange={(event) => setShortName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    is_Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={state.isActive}
                    name="radio-buttons-group"
                    onChange={(event) => setIsActive(event.target.value)}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="True"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="False"
                    />
                  </RadioGroup>
                </div>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="number"
                    className="form-control form-control-lg"
                    label="price"
                    variant="outlined"
                    defaultValue={state.price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="text"
                    className="form-control form-control-lg"
                    label="measurement"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    defaultValue={JSON.stringify(state.measurement)}
                    onChange={(event) =>
                      setMeasurement(JSON.parse(event.target.value))
                    }
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  onClick={editTest}
                >
                  Edit Test
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default EditTestForm;
