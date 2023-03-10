import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import viewPatientAction from "../Actions/ViewPatients";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GetPatientById from "../Actions/GetPatientById";
import { useNavigate } from "react-router-dom";
import viewUserAction from "../Actions/ViewUsers";
import viewTestAction from "../Actions/ViewTests";
import viewUserReportAction from "../Actions/ViewUserReports";
import GetUserReportById from "../Actions/GetUserReportById";
import deleteUserReport from "../Actions/DeleteUserReport";

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

const ViewReportsTable = () => {
  const [userReport, setUserReport] = useState([]);
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate();
  let sno = 0;
  useEffect(() => {
    const getUserReport = async () => {
      const { data } = await viewUserReportAction();
      const { data: patientData } = await viewPatientAction();
      const { data: userData } = await viewUserAction();
      const { data: testData } = await viewTestAction();
      setUserReport(data);
      setUsers(userData);
      setPatients(patientData.patients);
      setTests(testData);
    };
    getUserReport();
  }, [deleted]);

  const edit = async (id) => {
    console.log({'editreport':id})
    const { data } = await GetUserReportById(id);
    navigate("/reports/viewReport/edit", { state: data });
  };

  const handleDelete = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUserReportById = async () => {
    const { data } = await deleteUserReport(id);
    setDeleted(!deleted);
    setOpen(false);
  };

  return (
    <Main>
      <List>
        <ListItem>
          <ListItemText style={style}>
            <b>Sr No.</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Test</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Patient</b>
          </ListItemText>
          {/* <ListItemText style={style}>
            <b>Home Visit</b>
          </ListItemText> */}
          <ListItemText style={style}>
            <b>Actions</b>
          </ListItemText>
        </ListItem>

        {userReport.length > 0 ? (
          userReport.map((report, index) => {
            const patientData = patients.filter(
              (patient) => patient.id === report.patientId
            );
            const userData = users.filter((user) => user.id === patientData[0].userId);
            const testData = tests.filter((test) => test.id === report.testId);

            return (
              <ListItem key={index}>
                <ListItemText style={style}>{(sno += 1)}</ListItemText>
                <ListItemText style={style}>{testData[0].name}</ListItemText>
                <ListItemText style={style}>
                  {userData[0].firstName} {userData[0].lastName}
                </ListItemText>
                <ListItemText style={style}>
                  <Button onClick={() => edit(report.id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDelete(report.id)}>
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
                      {"Are you sure you want to delete this Report? "}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => deleteUserReportById()}>
                        Confirm Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ListItemText>
              </ListItem>
            );
          })
        ) : (
          <ListItem style={{ width: "100%" }}>No User Report Found</ListItem>
        )}
      </List>
    </Main>
  );
};

export default ViewReportsTable;
