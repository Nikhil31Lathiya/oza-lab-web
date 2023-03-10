import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown";
import { SignUpLogo } from "./RegistrationImages";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DatePicker from "../DatePicker";
import SignUpAction from "./action";
import { sendMail } from "../Actions/SendMail";
import axios from "axios";
import addUserAction from "../Actions/AddUsers";
import GetPermissionsByRoleId from "../Actions/GetPermission";
import PermissionContext from "../../context/PermissionContext";

const RegistrationForm = () => {
  localStorage.clear();
  const [title, setTitle] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [gender, setGender] = React.useState("female");
  const [contact, setContact] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [otp, setOtp] = React.useState(null);
  const [otpInput, setOtpInput] = React.useState(null);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(PermissionContext);

  const signUp = async () => {
    if (!otp) {
      setError("Sending Otp to the email. please wait.");
      const emailSend = await sendMail(email);
      if (emailSend.data.sent && emailSend.data.otp) {
        setError("Otp sent to the email address, please check your email");
        return setOtp(emailSend.data.otp);
      } else {
        setError("something went wrong while sending email. please try again");
      }
    }
    if (otp === parseInt(otpInput, 10)) {
      const signUpObject = {
        email,
        title,
        firstName,
        lastName,
        dob,
        role: "USER",
        gender,
        address,
        contact,
      };
      const response = await addUserAction(signUpObject);
      if (response.data.token) {
        localStorage.setItem("roleId", response.data.user.roleId);
        localStorage.setItem("authorization", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        const permissions = await GetPermissionsByRoleId(
          response.data.user.roleId
        );
        await dispatch({ type: "USER_PROFILE", payload: permissions.data });
        if (
          response.data.user.roleId === 1 ||
          response.data.user.roleId === 2
        ) {
          navigate("/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
      setError(response.data.message);
    } else {
      setError("Incorrect otp. Please Try Again!");
    }
  };
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div style={{ display: "flex" }}>
                  <img
                    src={require("../../assets/images/oza-lab-logo.png")}
                    alt="logo"
                    height="100px"
                  />
                  <h4 style={{marginTop: "30px", marginLeft: "30px"}}>OZA-LAB</h4>
                </div>
                <h4 style={{ marginTop: "20px" }}>New here?</h4>
                <h6 className="font-weight-light">
                  Signing up is easy. It only takes a few steps
                </h6>
                <form className="pt-3">
                  <div className="form-group">
                    <Dropdown
                      data={["mr", "mrs", "ms"]}
                      title={"title"}
                      tempState={title}
                      setTempState={setTitle}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      required="true"
                      type="text"
                      className="form-control form-control-lg"
                      label="First Name"
                      variant="outlined"
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      required="true"
                      type="text"
                      className="form-control form-control-lg"
                      label="Last Name"
                      variant="outlined"
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <DatePicker tempState={dob} setTempState={setDob} />
                  </div>
                  <div className="form-group">
                    <TextField
                      required="true"
                      type="email"
                      className="form-control form-control-lg"
                      label="email"
                      variant="outlined"
                      onChange={(event) => setEmail(event.target.value)}
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
                      required="true"
                      id="outlined-multiline-flexible"
                      className="form-control form-control-lg"
                      label="Address"
                      multiline
                      maxRows={4}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      required="true"
                      className="form-control form-control-lg"
                      label="Contact"
                      onChange={(event) => setContact(event.target.value)}
                    />
                  </div>
                  <div
                    class="form-group"
                    style={otp ? {} : { display: "none" }}
                  >
                    <TextField
                      type={"number"}
                      id="exampleInputPassword1"
                      label="OTP"
                      variant="outlined"
                      size="large"
                      fullWidth
                      onChange={(event) => {
                        setOtpInput(event.target.value);
                      }}
                    />
                  </div>
                  <h6 className="font-weight-light">{error}</h6>
                  <div className="mt-3">
                    <Button
                      variant="outlined"
                      size="large"
                      fullWidth
                      color="primary"
                      onClick={signUp}
                    >
                      SIGN UP
                    </Button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account?{" "}
                    <Link to="/" className="text-primary">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
