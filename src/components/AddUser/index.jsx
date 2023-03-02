import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import DropDown from "../Dropdown";
import DatePicker from "../DatePicker";
import { FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sendMail } from "../Actions/SendMail";
import { MailExists } from "../Actions/MailExists";
import addUserAction from "../Actions/AddUsers";

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

const AddUserForm = () => {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("female");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState(null);
  const [otpInput, setOtpInput] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const addPatient = async (e) => {
    e.preventDefault();
    const mailExists = await MailExists(email);
    if (!mailExists.data.message) {
      return setError("Email already exists");
    }
    if (!otp) {
      const emailSend = await sendMail(email);
      if (emailSend.data.sent && emailSend.data.otp) {
        setError("Otp sent to the email address, please check your email");
        return setOtp(emailSend.data.otp);
      }
    }
    if (otp === parseInt(otpInput, 10)) {
      const patient = await addUserAction({
        email,
        title,
        firstName,
        lastName,
        address,
        gender,
        contact,
        dob,
        role
      });
      if(patient.data.user) {
        navigate('/user/viewUser')
      }
    }
  };
  return (
    <Main>
      <div className="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Add User</h4>
              <h4>{error}</h4>

              <form>
                <div className="form-group">
                  <DropDown
                    title={"title"}
                    data={["mr", "mrs", "ms"]}
                    tempState={title}
                    setTempState={setTitle}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="text"
                    className="form-control form-control-lg"
                    label="First Name"
                    variant="outlined"
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
                    defaultValue="female"
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
                    onChange={(event) => {
                      setError("");
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                 <div className="form-group">
                  <DropDown
                    title={"Role"}
                    data={["SUPER ADMIN", "ADMIN", "USER"]}
                    tempState={role}
                    setTempState={setRole}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    required={true}
                    type="contact"
                    className="form-control form-control-lg"
                    label="Contact"
                    variant="outlined"
                    onChange={(event) => setContact(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <DatePicker tempState={dob} setTempState={setDob} />
                </div>
                <div className="form-group">
                  <TextField
                    required={true}
                    id="outlined-multiline-flexible"
                    className="form-control form-control-lg"
                    label="Address"
                    multiline
                    maxRows={4}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                <div class="form-group" style={otp ? {} : { display: "none" }}>
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
                  />
                  {/* <input type="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" /> */}
                </div>
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  onClick={addPatient}
                >
                  Add User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AddUserForm;
