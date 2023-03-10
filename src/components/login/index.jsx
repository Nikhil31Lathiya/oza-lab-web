import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { sendMail } from "../Actions/SendMail";
import GetPermissionsByRoleId from "../Actions/GetPermission";
import PermissionContext from "../../context/PermissionContext";

const Login = () => {
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(null);
  const [otpInput, setOtpInput] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(PermissionContext);

  const checkMailExists = async () => {
    const mailExists = await axios.post("http://localhost:3000/user/byEmail", {
      email: email,
    });
    return mailExists;
  };
  const login = async () => {
    const mailExists = await checkMailExists();
    if (mailExists.data.message) {
      return setError("User Not Found. Please Sign Up");
    }
    if (!otp) {
      setError("Sending Otp to the email. please wait.");
      setDisabled(true);
      const emailSend = await sendMail(email);
      setError("Otp sent to the email address, please check your email");
      if (emailSend.data.sent && emailSend.data.otp) {
        setDisabled(false);
        return setOtp(emailSend.data.otp);
      } else {
        setError(
          "Something went wrong while sending the email. please try again"
        );
      }
    }
    if (otp === parseInt(otpInput, 10)) {
      const token = await axios.post("http://localhost:3000/token", {
        email: email,
      });
      localStorage.setItem("authorization", token.data.token);
      localStorage.setItem("roleId", mailExists.data.roleId);
      localStorage.setItem("userId", mailExists.data.id);
      const permissions = await GetPermissionsByRoleId(mailExists.data.roleId);
      await dispatch({ type: "USER_PROFILE", payload: permissions.data });
      if (mailExists.data.roleId === 3) {
        return navigate("/user/dashboard");
      }
      navigate("/dashboard");
    } else {
      setError("Incorrect otp. Please Try Again!");
    }
  };
  return (
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth px-0">
          <div class="row w-100 mx-0">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                <div style={{ display: "flex", marginBottom: '40px' }}>
                  {/* <img src={LoginLogo} alt="logo" /> */}
                  <img
                    src={require("../../assets/images/oza-lab-logo.png")}
                    alt="logo"
                    height="70px"
                  />
                  <h3 style={{marginTop: "30px", marginLeft: "30px"}}>OZA-LAB</h3>
                </div>
                <h6 class="font-weight-light">Sign in to continue.</h6>
                <h6>{error}</h6>
                <form class="pt-3">
                  <div class="form-group">
                    <TextField
                      type="email"
                      className="form-control form-control-lg"
                      label="email"
                      id="exampleInputEmail1"
                      variant="outlined"
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                      }}
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
                  <div class="mt-3">
                    <Button
                      variant="outlined"
                      size="large"
                      fullWidth
                      color="primary"
                      disabled={disabled}
                      onClick={login}
                    >
                      SIGN IN
                    </Button>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/signup" class="text-primary">
                      Create
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

export default Login;
