import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import viewTestAction from "../Actions/ViewTests";
import PermissionContext from "../../context/PermissionContext";
import viewUserAction from "../Actions/ViewUsers";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import approvedHomeVisitAction from "../Actions/ApproveHomeVisit";
import viewPendingHomeVisit from "../Actions/ViewPendingHomeVisit";
import DismissHomeVisit from "../Actions/dismissHomeVisit";
import { SendApprovalMail } from "../Actions/SendApprovalMail";

const style = {
  width: "100px",
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

const ViewHomeVisitRequests = () => {
  const [deleted, setDeleted] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [testData, setTestData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userHomeVisit, setUserHomeVisit] = useState([]);
  const [reset, setReset] = useState(false);
  const { permission } = useContext(PermissionContext);
  const navigate = useNavigate();
  let sno = 0;

  useEffect(() => {
    const getPendingHomeVisit = async () => {
      const { data: userHomeVisit } = await viewPendingHomeVisit();
      console.log({ userHomeVisit });
      setUserHomeVisit(userHomeVisit);
    };
    getPendingHomeVisit();
  }, [reset]);

  useEffect(() => {
    const getData = async () => {
      const { data: testData } = await viewTestAction();
      setTestData(testData);
      const { data: userData } = await viewUserAction();
      setUserData(userData);
    };
    getData();
  }, []);

  const approve = async (homeVisit, userName, testName) => {
    console.log("approve", id);
    const data = await approvedHomeVisitAction(homeVisit.id);
    console.log(userName, testName, homeVisit.bookingDate);
    const object = {
      email: userName[0],
      bookingDate: new Date(homeVisit.bookingDate).toLocaleDateString("en-GB"),
      testName: testName[0],
      approved: "APPROVED!",
    };
    // console.log('data', data);
    SendApprovalMail(object);
    setReset(!reset);
  };

  const dismiss = async (homeVisit, userName, testName) => {
    console.log("dismiss", id);
    const data = await DismissHomeVisit(homeVisit.id);
    console.log(userName, testName, homeVisit.bookingDate);
    const object = {
      email: userName[0],
      bookingDate: new Date(homeVisit.bookingDate).toLocaleDateString("en-GB"),
      testName: testName[0],
      approved:
        "DECLINED due to unavailability. Please try again on another date",
    };
    console.log("data", data);
    SendApprovalMail(object);

    console.log("data", data);
    setReset(!reset);
  };

  return (
    <Main>
      <List>
        <ListItem>
          <ListItemText style={style}>
            <b>Sr No.</b>
          </ListItemText>
          {/* {userEmail && ( */}
          <ListItemText style={style}>
            <b>User Email</b>
          </ListItemText>
          {/* )} */}
          <ListItemText style={style}>
            <b>Test</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Booking Date</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Action</b>
          </ListItemText>
        </ListItem>
        {userHomeVisit.length > 0 ? (
          userHomeVisit.map((homeVisit, index) => {
            const testName = testData
              .filter((item) => item.id === homeVisit.testId)
              .map((mapItem) => mapItem.name);
            const userName = userData
              .filter((item) => item.id === homeVisit.userId)
              .map((item) => item.email);
            return (
              <ListItem key={index}>
                <ListItemText style={style}>{(sno += 1)}</ListItemText>
                <ListItemText style={style}>{userName}</ListItemText>
                <ListItemText style={style}>{testName}</ListItemText>
                <ListItemText style={style}>
                  {new Date(homeVisit.bookingDate).toLocaleDateString("en-GB")}
                </ListItemText>
                <ListItemText style={style}>
                  <Button>
                    <DoneIcon
                      onClick={() => approve(homeVisit, userName, testName)}
                    />
                  </Button>
                  <Button>
                    <ClearIcon
                      onClick={() => dismiss(homeVisit, userName, testName)}
                    />
                  </Button>
                </ListItemText>
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText>No. Pending Requests.</ListItemText>
          </ListItem>
        )}
      </List>
    </Main>
  );
};

export default ViewHomeVisitRequests;
