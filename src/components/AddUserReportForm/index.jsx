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
import viewPatientAction from "../Actions/ViewPatients";
import GetUserByIds from "../Actions/GetUserByIds";
import AddUserReportAction from "../Actions/AddUserReports";
import { sendMailUserReport } from "../Actions/sendMailUserReport";

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

const AddUserReportForm = () => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("female");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [patientInput, setPatientInput] = useState("");
  const [otp, setOtp] = useState(null);
  const [otpInput, setOtpInput] = useState(null);
  const [error, setError] = useState("");
  const [tests, setTests] = useState([]);
  const [testIndividual, setTestIndividual] = useState([]);
  const [testsInput, setTestsInput] = useState("");
  const [patients, setPatients] = useState([]);
  const [users, setUsers] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [testId, setTestId] = useState(null);
  const [report, setReport] = useState(undefined);
  const [userReportInput, setUserReportInput] = useState({});
  const ids = [];

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const { data } = await viewTestAction();
      const { data: patientData } = await viewPatientAction();
      patientData.patients.forEach((patient) => {
        if (!ids.includes(patient.userId)) {
          ids.push(patient.userId);
        }
      });
      const { data: userData } = await GetUserByIds(ids);
      setPatients(patientData.patients);
      setUsers(userData);
      setTests(data);
    };
    getData();
  }, []);

  const testIds = [];
  useEffect(() => {
    const getTest = async () => {
      const { data } = await viewTestAction();
      setTests(data);
      const userData = await users.filter(
        (user) => user.email === patientInput
      );
      const userId = userData[0].id;
      const patientData = await patients.filter(
        (patient) => patient.userId === userId
      );
      patientData.forEach((patient) => {
        if (!testIds.includes(patient.id)) {
          testIds.push(patient.testId);
        }
      });
      setPatientId(patientData[0].id);

      const testData = tests.filter((test) => testIds.includes(test.id));
      setTestIndividual(testData);
    };
    getTest();
  }, [patientInput]);

  useEffect(() => {
    const testData = tests.filter((test) => test.name === testsInput);
    setReport(
      testData.length > 0 ? JSON.stringify(testData[0].measurement) : ""
    );
    setTestId(testData.length > 0 ? testData[0].id : null);
  }, [testsInput]);

  const AddUserReport = async (e) => {
    e.preventDefault();
    const userReport = await AddUserReportAction({
      patientId,
      testId,
      testResult: userReportInput,
    });
    const emailSend = await sendMailUserReport(patientInput);
    if (!emailSend.data.sent) {
        setError("Error while sending notification email to user.")
      }
    if (userReport.data) {
      navigate("/reports/ViewReport");
    }
  };
  const cancelAddUserReport = () => {
    navigate("/reports/AddReport");
  };
  return (
    <Main>
      <div className="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Add User Report</h4>
              <h4>{error}</h4>

              <form>
                <div class="form-group">
                  <DropDown
                    data={users}
                    title={"Patient"}
                    tempState={patientInput}
                    setTempState={setPatientInput}
                  />
                </div>
                <div class="form-group">
                  <DropDown
                    data={testIndividual}
                    title={"Tests"}
                    tempState={testsInput}
                    setTempState={setTestsInput}
                  />
                </div>
                <div
                  class="form-group"
                  style={{ display: report ? "block" : "none" }}
                >
                  <TextField
                    multiline
                    className="form-control form-control-lg"
                    label="User Report"
                    defaultValue={report}
                    // value={report}
                    variant="outlined"
                    onChange={(event) => {
                      setUserReportInput(JSON.parse(event.target.value));
                    }}
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  onClick={AddUserReport}
                >
                  Add User Report
                </button>
                <button class="btn btn-light" onClick={cancelAddUserReport}>
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

export default AddUserReportForm;
