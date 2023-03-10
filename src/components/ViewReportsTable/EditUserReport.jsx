import React, { useEffect, useState } from "react";
// import { Main } from "../../pages/Dashboard";
import { styled } from "@mui/material/styles";
import {
  Button,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import DropDown from "../Dropdown";
import DatePicker from "../DatePicker";
import { FormLabel } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { sendMail } from "../Actions/SendMail";
import { MailExists } from "../Actions/MailExists";
import addPatientAction from "../Actions/AddPatients";
import viewTestAction from "../Actions/ViewTests";
import viewPatientAction from "../Actions/ViewPatients";
import GetUserByIds from "../Actions/GetUserByIds";
import AddUserReportAction from "../Actions/AddUserReports";
import GetTestById from "../Actions/GetTestById";
import GetPatientById from "../Actions/GetPatientById";
import GetUserById from "../Actions/GetUserById";
import updateUserReport from "../Actions/UpdateUserReport";
// import puppeteer from "puppeteer";

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

const EditUserReportsForm = () => {
  const [patientInput, setPatientInput] = useState("");
  const [error, setError] = useState("");
  const { state } = useLocation();
  const [testIndividual, setTestIndividual] = useState([]);
  const [report, setReport] = useState(JSON.stringify(state.testResult));
  const navigate = useNavigate();

  useEffect(() => {
    const getInitialData = async () => {
      console.log("getInitialData", state)
      console.log("patientId", state.patientId)

      const { data: patientData } = await GetPatientById(state.patientId);
      console.log(patientData)
      const { data: userData } = await GetUserById(patientData.userId);

      setPatientInput(userData);
      const { data: testData } = await GetTestById(state.testId);
      setTestIndividual(testData);
    };
    getInitialData();
  }, []);

  const EditUserReport = async (e) => {
    e.preventDefault();
    const {data: userReport} = await updateUserReport(state.id, {
      patientId: state.patientId,
      testId: state.testId,
      testResult: report
    })
    if (userReport) {
      navigate("/reports/ViewReport");
    }
  };
  const cancelEditUserReport = () => {
    navigate("/reports/ViewReport");
  };
  const ariaLabel = { "aria-label": "description" };
  return (
    <Main>
      <div className="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Edit User Report</h4>
              <h4>{error}</h4>

              <form>
                <div class="form-group">
                  <Input
                    disabled
                    className="form-control form-control-lg"
                    label="patient"
                    value={patientInput.email}
                    inputProps={ariaLabel}
                  />
                </div>
                <div class="form-group">
                  <Input
                    disabled
                    className="form-control form-control-lg"
                    label="patient"
                    value={testIndividual.name}
                    inputProps={ariaLabel}
                  />
                </div>
                <div class="form-group">
                  <TextField
                    multiline
                    className="form-control form-control-lg"
                    label="User Report"
                    defaultValue={report}
                    variant="outlined"
                    onChange={(event) =>
                      setReport(JSON.parse(event.target.value))
                    }
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  onClick={EditUserReport}
                >
                  Edit User Report
                </button>
                <button class="btn btn-light" onClick={cancelEditUserReport}>
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

export default EditUserReportsForm;
