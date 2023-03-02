import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { sendMail } from "../Actions/SendMail";

const Login = () => {
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(null);
  const [otpInput, setOtpInput] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
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
      setDisabled(true)
      const emailSend = await sendMail(email)
      if (emailSend.data.sent && emailSend.data.otp) {
        setError("Otp sent to the email address, please check your email");
        setDisabled(false)
        return setOtp(emailSend.data.otp);
      }
    }
    if (otp === parseInt(otpInput, 10)) {
      const token = await axios.post("http://localhost:3000/token", {
        email: email,
      });
      localStorage.setItem("authorization", token.data.token);
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
                <div class="brand-logo">
                  {/* <img src={LoginLogo} alt="logo" /> */}
                  <h3>OZA-LAB</h3>
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
                        setError("")
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
