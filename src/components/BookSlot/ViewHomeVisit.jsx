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
import deleteTests from "../Actions/DeleteTests";
import GetTestById from "../Actions/GetTestById";
import PermissionContext from "../../context/PermissionContext";
import { CAN_EDIT_TEST } from "../../constants/permission";
import viewUserHomeVisit from "../Actions/ViewUserHomeVisit";

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
const testDataState = [];
const ViewHomeVisit = ({ userHomeVisit, userEmail, testData }) => {
  //   const [userHomeVisits, setTest] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const { permission } = useContext(PermissionContext);
  const navigate = useNavigate();
  //   const [testDataState, setTestDataState] = useState(testData);
  let sno = 0;
  console.log("homeVisitSlot", userHomeVisit);
  console.log("userEmail", userEmail);

  //   const getTestData = async () => {
  //     const { data: test } = await viewTestAction();
  //     console.log({ test });
  //     // testData = test;
  //     testDataState.push(test);
  //   };

  //   if (testData.length === 0) {
  //     console.log({ testData });
  //     getTestData();
  //   }
  //   useEffect(() => {
  //     const getTests = async () => {
  //     //   const {data: userHomeVisit} = await viewUserHomeVisit(localStorage.getItem("userId"));
  //     //   setTest(test.data);
  //     };
  //     getTests();
  //   }, [deleted]);

  //   const edit = async (id) => {
  //     const { data } = await GetTestById(id);
  //     navigate("/test/viewTest/edit", { state: data });
  //   };

  //   const deleteTest = (id) => {
  //     setId(id);
  //     setOpen(true);
  //   };

  //   const handleDelete = async () => {
  //     const { data } = await deleteTests(id);
  //     if (data) {
  //       setDeleted(!deleted);
  //       setOpen(false);
  //     }
  //   };

  //   const handleClose = async (id) => {
  //     setOpen(false);
  //   };

  return (
    <Main>
      <List>
        <ListItem>
          <ListItemText style={style}>
            <b>Sr No.</b>
          </ListItemText>
          {userEmail && (
            <ListItemText style={style}>
              <b>Name</b>
            </ListItemText>
          )}
          <ListItemText style={style}>
            <b>Test</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Booking Date</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Approved ?</b>
          </ListItemText>
        </ListItem>
        {userHomeVisit.length > 0 ? (
          userHomeVisit.map((homeVisit, index) => {
            const testName = testData
              .filter((item) => item.id === homeVisit.testId)
              .map((mapItem) => mapItem.name);
            return (
              <ListItem key={index}>
                <ListItemText style={style}>{(sno += 1)}</ListItemText>
                {userEmail && (
                  <ListItemText style={style}>{userEmail}</ListItemText>
                )}
                <ListItemText style={style}>{testName}</ListItemText>
                <ListItemText style={style}>
                  {new Date(homeVisit.bookingDate).toLocaleDateString("en-GB")}
                </ListItemText>
                <ListItemText style={style}>
                  {homeVisit.isApproved === true ? "Approved" : homeVisit.isActive === true ? "Pending" : "Declined"}
                </ListItemText>
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText>No. request</ListItemText>
          </ListItem>
        )}
        {/* {test.map((test, index) => {
          return (
            <ListItem key={index}>
              <ListItemText style={style}>
                <span
                  style={{
                    backgroundColor: test.isActive === true ? "green" : "red",
                    color: "white",
                  }}
                >
                  {test.isActive === true ? "Active" : "InActive"}
                </span>
              </ListItemText>
              {permission.length > 0 && permission.includes(CAN_EDIT_TEST) && (
                <ListItemText style={style}>
                  <Button onClick={() => edit(test.id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => deleteTest(test.id)}>
                    <DeleteIcon />
                  </Button>
                  <Dialog
                    style={{ margin: "20px" }}
                    className="MuiDialog-root"
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>
                      {"Are you sure you want to delete this Test?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => handleDelete()}>
                        Confirm Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ListItemText>
              )}
            </ListItem>
          );
        })} */}
      </List>
    </Main>
  );
};

export default ViewHomeVisit;
