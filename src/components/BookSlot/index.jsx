import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import GetUserById from "../Actions/GetUserById";
import GetPatientByUserId from "../Actions/GetPatientByUserId";
import DropDown from "../Dropdown";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input } from "@mui/material";
import DatePicker from "../DatePicker";
import viewTestAction from "../Actions/ViewTests";
import AddHomeVisitAction from "../Actions/AddHomeVisit";
import { redirect, useNavigate } from "react-router-dom";
import viewUserHomeVisit from "../Actions/ViewUserHomeVisit";
import ViewHomeVisit from "./ViewHomeVisit";

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
const ariaLabel = { "aria-label": "description" };
const AddHomeVisitForm = () => {
  const [userData, setUserData] = useState({});
  const [patientData, setPatientData] = useState({});
  const [testData, setTestData] = useState([]);
  const [testInput, setTestInput] = useState([]);
  const [bookingDate, setBookingDate] = useState([]);
  const [userHomeVisit, setUserHomeVisit] = useState([]);
  const [reset, setReset] = useState(false);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const getData = async () => {
      setBookingDate("")
      //   const { data: patientData } = await GetPatientByUserId(userId);
      //   setPatientData(patientData);
      const { data: testData } = await viewTestAction();
      setTestData(testData);
      const { data: userData } = await GetUserById(userId);
      setUserData(userData);
      console.log({ userData, patientData });
      const { data: userHomeVisit } = await viewUserHomeVisit(userId);
      setUserHomeVisit(userHomeVisit);
    };
    getData();
  }, [reset]);
  const navigate = useNavigate();
  const handleBookSlot = async (e) => {
    e.preventDefault();
    console.log("In function book slot");
    console.log(userId, testInput, bookingDate);
    const testId = testData
      .filter((test) => test.name === testInput)
      .map((test) => test.id);
    console.log(testId);
    const homeVisitObject = {
      userId: parseInt(userId, 10),
      testId: testId[0],
      bookingDate: new Date(bookingDate),
    };
    const { data } = await AddHomeVisitAction(homeVisitObject);
    console.log(data);
    if (data.id) {
      console.log(
        "Your request for home visit has been made please wait for the response mail from OZA LAB"
      );
      setReset(!reset);
    }
  };

  const handleClose = () => {
    setReset(false);
  }

  return (
    <Main>
      <div>
        <form>
          <div class="form-group">
            <Input
              disabled
              className="form-control form-control-lg"
              label="patient"
              value={userData.email}
              inputProps={ariaLabel}
            />
          </div>
          <div className="form-group">
            <DropDown
              data={testData}
              title={"Test"}
              tempState={testInput}
              setTempState={setTestInput}
            />
          </div>
          <div class="form-group">
            <input
              type="date"
              min={`${new Date().toISOString().split("T")[0]}`}
              max={`${
                new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }`}
              className="form-control form-control-lg"
              label="Slot"
              inputProps={ariaLabel}
              value={bookingDate}
              onChange={(event) => setBookingDate(event.target.value)}
            />
          </div>
          <div className="form-group">
            <Button
              variant="outlined"
              size="large"
              fullWidth
              color="primary"
              onClick={handleBookSlot}
            >
              Book Slot
            </Button>
          </div>
          <Dialog
            open={reset}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                "Your request for home visit has been made please wait for the response mail from OZA LAB"
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>OK</Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
      <div>
        <>
        <h2>Requests</h2>
        <ViewHomeVisit userHomeVisit={userHomeVisit} testData={testData} />
        </>
      </div>
    </Main>
  );
};

export default AddHomeVisitForm;
