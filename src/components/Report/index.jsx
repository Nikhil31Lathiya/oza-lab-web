import React from "react";
import PropTypes from "prop-types";
import "./report.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReportTable from "./ReportTable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Report = ({ reportData }) => {
  return (
    <html className="">
      <head>
        <title>Checkup Report - Oza-Lab Laboratory</title>
      </head>
      <body>
        <h1>Checkup Report - Oza-Lab Laboratory</h1>

        <h2>Patient Information</h2>
        <p>
          <strong>Name:</strong> {reportData.patientName}
        </p>
        <p>
          <strong>Date of Birth:</strong> {reportData.patientDOB}
        </p>
        <p>
          <strong>Gender:</strong> {reportData.patientGender}
        </p>
        <p>
          <strong>Contact Number:</strong> {reportData.patientPhoneNumber}
        </p>
        <p>
          <strong>Email:</strong> {reportData.patientEmail}
        </p>

        <h2>Test Results</h2>
        {console.log(reportData)}
        {console.log(reportData.test)}
        <h4>{reportData.test.name}</h4>

        <table
          style={{
            width: "100%",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Test
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Result
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                Reference Range
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(JSON.parse(reportData.test.result)).map((key) => {
              return (
                <>
                  <tr key={Math.random()}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {key}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {JSON.parse(reportData.test.result)[key]}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {JSON.parse(reportData.test.referenceRange)[key]}
                    </td>
                  </tr>
                </>
              );
            })}
            {/* {Object.keys(JSON.parse(reportData.test.referenceRange)).map((key) => {
                  return (
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {JSON.parse(reportData.test.referenceRange)[key]}
                    </td>
                  );
                })} */}
          </tbody>
        </table>

        <p>
          Thank you for choosing Oza-Lab for your checkup. If you have any
          questions or concerns, please don't hesitate to contact us.
        </p>
      </body>
    </html>
  );
};

Report.defaultProps = {
  reportData: {
    patientName: "",
    patientDOB: "",
    patientGender: "",
    patientPhoneNumber: "",
    patientEmail: "",
    testName: "",
    test: {},
  },
};

Report.propTypes = {
  reportData: PropTypes.shape({
    patientName: PropTypes.string.isRequired,
    patientDOB: PropTypes.string.isRequired,
    patientGender: PropTypes.string.isRequired,
    patientPhoneNumber: PropTypes.string.isRequired,
    patientEmail: PropTypes.string.isRequired,
    testName: PropTypes.string.isRequired,
    test: PropTypes.object.isRequired,
  }).isRequired,
};
export default Report;
