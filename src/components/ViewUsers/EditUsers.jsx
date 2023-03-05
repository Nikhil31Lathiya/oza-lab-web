import React, { useState } from "react";
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
import updateUser from "../Actions/UpdateUser";
import { sendMail } from "../Actions/SendMail";

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

const EditUsers = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState(state.title);
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [gender, setGender] = useState(state.gender);
  const [contact, setContact] = useState(state.contact);
  const [address, setAddress] = useState(state.address);
  const [email, setEmail] = useState(state.email);
  const [role, setRole] = useState(
    state.roleId === 1 ? "SUPER ADMIN" : state.roleId === 2 ? "ADMIN" : "USER"
  );
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState(null);
  const [otpInput, setOtpInput] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log("EditUser", state);
  const edit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Sending Otp to the email. please wait.");
      const emailSend = await sendMail(email);
      if (emailSend.data.sent && emailSend.data.otp) {
        setError("Otp sent to the email address, please check your email");
        return setOtp(emailSend.data.otp);
      } else {
        setError(
          "Something went wrong while sending the email. Please try again"
        );
      }
    }
    if (otp === parseInt(otpInput, 10)) {
      const { data } = await updateUser(state.id, {
        title,
        firstName,
        lastName,
        gender,
        contact,
        address,
        email,
        role,
      });
      console.log(data);
      if (data) {
        navigate("/user/viewUser");
      }
    }
  };

  return (
    <Main>
      <div className="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Edit User</h4>
              <h4>{error}</h4>

              <form>
                <div className="form-group">
                  <DropDown
                    title={"title"}
                    data={["mr", "mrs", "ms"]}
                    tempState={state.title}
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
                </div>

                <div className="form-group">
                  <DropDown
                    title={"Role"}
                    data={["SUPER ADMIN", "ADMIN", "USER"]}
                    tempState={role}
                    setTempState={setRole}
                  />
                </div>

                {/* <div className="form-group">
                  <DatePicker tempState={state.dob} setTempState={setDob} />
                </div> */}
                <div className="form-group">
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
                </div>
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  onClick={edit}
                >
                  Edit User
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

export default EditUsers;
