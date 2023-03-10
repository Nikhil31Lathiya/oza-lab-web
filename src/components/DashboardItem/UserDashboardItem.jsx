import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  patientsCount,
  testsCount,
  userReportsCount,
  usersCount,
} from "../../pages/Dashboard/action";
import GetPatientByUserId from "../Actions/GetPatientByUserId";
import GetUserById from "../Actions/GetUserById";
import GetUserReportById from "../Actions/GetUserReportById";
import GetUserReportByUserId from "../Actions/GetUserReportsByUserId";
import viewTestAction from "../Actions/ViewTests";
import DownloadIcon from "@mui/icons-material/Download";
import ReactDOMServer from "react-dom/server";
import Report from "../Report";
import Bill from "../Bill";

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

const style = {
  width: "100px",
};

const UserDashboardItem = () => {
  let sno = 0;
  const [reports, setReports] = useState([]);
  const [patientIds, setPatientIds] = useState([]);
  const [patientData, setPatientData] = useState({});
  const [test, setTest] = useState([]);
  const reportData = {
    patientName: "John Doe",
    patientDOB: "01/01/1980",
    patientGender: "Male",
    patientPhoneNumber: "1234567890",
    patientEmail: "johndoe@example.com",
    tests: [
      {
        name: "Blood Pressure",
        result: "120/80",
        referenceRange: "Normal: < 140/90",
      },
      {
        name: "Cholesterol",
        result: "180 mg/dL",
        referenceRange: "Normal: < 200 mg/dL",
      },
    ],
    doctorsNotes: "Patient is in good health.",
  };
  useEffect(() => {
    const getReports = async () => {
      const userId = parseInt(localStorage.getItem("userId"));
      const { data } = await GetPatientByUserId(userId);
      const acc = data.reduce((acc, report) => {
        acc.push(report.id);
        return acc;
      }, []);
      setPatientIds(acc);
      const { data: reports } = await GetUserReportByUserId(acc);
      console.log(reports);
      setReports(reports);
      const { data: user } = await GetUserById(userId);
      console.log(user);
      setPatientData(user);
      const { data: test } = await viewTestAction();
      console.log(test);
      setTest(test);
    };
    getReports();
  }, []);
  const testArray = [];
  let testName = "";

  // const newReportData = {
  //   patientName: patientData.firstName + " " + patientData.lastName,
  //   patientDOB: new Date(patientData.dob).toLocaleDateString("en-GB"),
  //   patientGender: patientData.gender,
  //   patientPhoneNumber: patientData.contact,
  //   patientEmail: patientData.email,
  //   testName: testName,
  //   tests: testArray,
  // };
  const handlePrintReport = async (reportId, name, referenceRange, testResult) => {
    const reportData = {
      patientName: patientData.firstName + " " + patientData.lastName,
      patientDOB: new Date(patientData.dob).toLocaleDateString("en-GB"),
      patientGender: patientData.gender,
      patientPhoneNumber: patientData.contact,
      patientEmail: patientData.email,
      test: {
        name: name,
        result: JSON.stringify(testResult),
        referenceRange: JSON.stringify(referenceRange)
      },
    };
    const html = ReactDOMServer.renderToString(
      <Report reportData={reportData} />
    );
    const printWindow = window.open("", "PrintWindow", "height=400,width=600");
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };
  
  const handlePrintBill = async (reportId, name, price) => {
    const billData = {
      patientName: patientData.firstName + " " + patientData.lastName,
      patientDOB: new Date(patientData.dob).toLocaleDateString("en-GB"),
      patientGender: patientData.gender,
      patientPhoneNumber: patientData.contact,
      patientEmail: patientData.email,
      bill: {
        testName: name,
        price: price,
      },
    };
    const html = ReactDOMServer.renderToString(
      <Bill billData={billData} />
    );
    const printWindow = window.open("", "PrintWindow", "height=400,width=600");
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <Main>
      <div class="row">
        <div>
          <List>
            <ListItem>
              <ListItemText style={style}>
                <b>Sr No.</b>
              </ListItemText>
              <ListItemText style={style}>
                <b>Name</b>
              </ListItemText>
              <ListItemText style={style}>
                <b>Test Name</b>
              </ListItemText>
              <ListItemText style={style}>
                <b>Report</b>
              </ListItemText>
              <ListItemText style={style}>
                <b>Bill</b>
              </ListItemText>
            </ListItem>
            {reports.length > 0 ?
              reports.map((report, index) => {
                const testData = test
                  .filter((item) => item.id === report.testId)
                  .reduce((acc, item) => {
                    acc = {
                      name: item.name,
                      result: JSON.stringify(report.testResult),
                      referenceRange: item.measurement,
                      price: item.price,
                    };
                    // testArray.push(acc);
                    testName = item.name;
                    return acc;
                  }, []);
                console.log({ testName, testArray });
                return (
                  <ListItem key={index}>
                    <ListItemText style={style}>{(sno += 1)}</ListItemText>
                    <ListItemText style={style}>
                      {patientData.firstName} {patientData.lastName}
                    </ListItemText>
                    <ListItemText style={style}>{testData.name}</ListItemText>
                    <ListItemText style={style}>
                      <DownloadIcon
                        onClick={() =>
                          handlePrintReport(
                            report.id,
                            testData.name,
                            testData.referenceRange,
                            report.testResult
                          )
                        }
                      />
                    </ListItemText>
                    <ListItemText style={style}>
                      <DownloadIcon
                        onClick={() =>
                          handlePrintBill(
                            report.id,
                            testData.name,
                            testData.price
                          )
                        }
                      />
                    </ListItemText>
                  </ListItem>
                );
              }): (
                <ListItem>
                  <ListItemText>No Reports</ListItemText>
                </ListItem>
              )}
          </List>
        </div>
      </div>
    </Main>
  );
};

export default UserDashboardItem;
