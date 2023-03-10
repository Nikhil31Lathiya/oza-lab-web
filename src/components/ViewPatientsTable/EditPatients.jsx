import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import DatePicker from "../DatePicker";
import DropDown from "../Dropdown";
import updatePatients from "../Actions/UpdatePatients";
import deletePatients from "../Actions/DeletePatients";
import viewTestAction from "../Actions/ViewTests";
import GetTestById from "../Actions/GetTestById";

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

const EditPatients = () => {
  const { state } = useLocation();
  const [testsData, setTestsData] = useState([]);
  const [test, setTest] = useState("");
  useEffect(() => {
    const testById = async () => {
      const { data } = await GetTestById(state.testId);
      setTest(data.name);
    };
    testById();
  }, [state.testId]);
  useEffect(() => {
    const getTests = async () => {
      const { data } = await viewTestAction();
      setTestsData(data);
    };
    getTests();
  }, []);
  const [homeVisit, setHomeVisit] = useState(
    state.homeVisit === true ? "Yes" : "No"
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const edit = async (e) => {
    e.preventDefault();
    const { data } = await updatePatients(state.id, {
      homeVisit,
      test,
    });
    if (data) {
      navigate("/patient/viewPatient");
    }
  };

  return (
    <Main>
      <div className="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Edit Patient</h4>
              <h4>{error}</h4>

              <form>
                <div className="form-group">
                  <TextField disabled label="Test" value={test} variant="outlined" />
                </div>
                <div className="form-group">
                  <DropDown
                    title={"Edit Test"}
                    data={testsData}
                    tempState={test}
                    setTempState={setTest}
                  />
                </div>
                <div className="form-group">
                  <DropDown
                    title={"HomeVisit"}
                    data={["Yes", "No"]}
                    tempState={homeVisit}
                    setTempState={setHomeVisit}
                  />
                </div>
                {/* <div className="form-group">
                  <TextField
                    required={true}
                    type="text"
                    className="form-control form-control-lg"
                    label="First Name"
                    variant="outlined"
                    defaultValue={state.firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="text"
                    className="form-control form-control-lg"
                    label="Last Name"
                    variant="outlined"
                    defaultValue={state.lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={state.gender}
                    name="radio-buttons-group"
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </div>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="email"
                    className="form-control form-control-lg"
                    label="email"
                    variant="outlined"
                    defaultValue={state.email}
                    onChange={(event) => {
                      setError("");
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="contact"
                    className="form-control form-control-lg"
                    label="Contact"
                    defaultValue={state.contact}
                    variant="outlined"
                    onChange={(event) => setContact(event.target.value)}
                  />
                </div> */}
                {/* <div className="form-group">
                  <DatePicker tempState={state.dob} setTempState={setDob} />
                </div> */}
                {/* <div className="form-group">
                  <TextField
                    required={true}
                    id="outlined-multiline-flexible"
                    className="form-control form-control-lg"
                    label="Address"
                    multiline
                    maxRows={4}
                    defaultValue={state.address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div> */}
                {/* <div class="form-group" style={otp ? {} : { display: "none" }}>
                  <TextField
                    type={"text"}
                    id="exampleInputPassword1"
                    label="OTP"
                    variant="outlined"
                    size="large"
                    required={true}
                    fullWidth
                    onChange={(event) => {
                      setOtpInput(event.target.value);
                    }}
                  /> */}
                {/* <input type="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" /> */}
                {/* </div> */}
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  onClick={edit}
                >
                  Edit Patient
                </button>
                <button
                  class="btn btn-light"
                  onClick={() => navigate("/patient/viewPatient")}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default EditPatients;
