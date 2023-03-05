import React, { useEffect, useState } from "react";
// import { Main } from "../../pages/Dashboard";
import { styled } from "@mui/material/styles";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import DropDown from "../Dropdown";
import DatePicker from "../DatePicker";
import { FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sendMail } from "../Actions/SendMail";
import { MailExists } from "../Actions/MailExists";
import addPatientAction from "../Actions/AddPatients";
import viewTestAction from "../Actions/ViewTests";
import AddExistingPatientAction from "../Actions/AddExistingPatient";

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

const AddExistingPatientForm = () => {
  //   const [title, setTitle] = useState("");
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [gender, setGender] = useState("female");
  //   const [contact, setContact] = useState("");
  //   const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  //   const [dob, setDob] = useState("");
  const [homeVisit, setHomeVisit] = useState("");
  const [otp, setOtp] = useState(null);
  const [otpInput, setOtpInput] = useState(null);
  const [error, setError] = useState("");
  const [tests, setTests] = useState([]);
  const [testsInput, setTestsInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTests = async () => {
      const { data } = await viewTestAction();
      setTests(data);
    };
    getTests();
  }, []);
  const addPatient = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const mailExists = await MailExists(email);
    if (mailExists.data.message) {
      setDisabled(false);
      return setError("Email does not exists");
    }
    if (open === false && !otp) {
      setError("Sending Otp to the email. please wait.");
      const emailSend = await sendMail(email);
      if (emailSend.data.sent && emailSend.data.otp) {
        setError("Otp sent to the email address, please check your email");
        setOpen(true);
        setDisabled(false)
        return setOtp(emailSend.data.otp);
      } else {
        setDisabled(false)
        setError(
          "something went wrong while sending the email. please try again"
        );
      }
    }
    if (otp === parseInt(otpInput, 10)) {
      const patient = await AddExistingPatientAction({
        email,
        homeVisit,
        testsInput,
      });
      if (patient.data) {
        navigate("/patient/viewPatient");
      }
    }
  };
  const cancelAddPatient = () => {
    navigate("/patient/addPatient");
  };
  return (
    <Main>
      <div className="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Add Existing Patient</h4>
              <h4>{error}</h4>

              <form>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="email"
                    className="form-control form-control-lg"
                    label="email"
                    variant="outlined"
                    onChange={(event) => {
                      setError("");
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                {open && (
                  <div>
                    <div className="form-group">
                      <TextField
                        required={true}
                        type="text"
                        className="form-control form-control-lg"
                        label="OTP"
                        variant="outlined"
                        onChange={(event) => {
                          setOtpInput(event.target.value);
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <DropDown
                        data={["Yes", "No"]}
                        title={"Home Visit"}
                        tempState={homeVisit}
                        setTempState={setHomeVisit}
                      />
                    </div>
                    <div class="form-group">
                      <DropDown
                        data={tests}
                        title={"Tests"}
                        tempState={testsInput}
                        setTempState={setTestsInput}
                      />
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  disabled={disabled}
                  onClick={addPatient}
                >
                  {open ? "Add Patient" : "Verify Email"}
                </button>
                <button class="btn btn-light" onClick={cancelAddPatient}>
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

export default AddExistingPatientForm;
