import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import DropDown from "../Dropdown";
import DatePicker from "../DatePicker";
import { FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sendMail } from "../Actions/SendMail";
import { MailExists } from "../Actions/MailExists";
import addPatientAction from "../Actions/AddPatients";
import AddTestAction from "../Actions/AddTests";

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

const AddTestForm = () => {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [price, setPrice] = useState("female");
  const [measurement, setMeasurement] = useState("female");
  //   const [contact, setContact] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [dob, setDob] = useState("");
  //   const [otp, setOtp] = useState(null);
  //   const [otpInput, setOtpInput] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const addTest = async (e) => {
    e.preventDefault();
    const test = await AddTestAction({
      name,
      shortName,
      isActive,
      price,
      measurement
    })
    if(test.data) {
      navigate('/test/viewTest')
    }
  }
  return (
    <Main>
      <div className="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Add Test</h4>
              <h4>{error}</h4>

              <form>
                {/* <div className="form-group">
                  <DropDown
                    title={"title"}
                    data={["mr", "mrs", "ms"]}
                    tempState={title}
                    setTempState={setTitle}
                  />
                </div> */}
                <div className="form-group">
                  <TextField
                    required={true}
                    type="text"
                    className="form-control form-control-lg"
                    label="Name"
                    variant="outlined"
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
                    defaultValue="true"
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
                    onChange={(event) => setMeasurement(JSON.parse(event.target.value))}
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  onClick={addTest}
                >
                  Add Test
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AddTestForm;
