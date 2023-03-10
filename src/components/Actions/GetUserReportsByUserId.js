import axios from "axios";
const GetUserReportByUserId = async (patientIds) => {
  const userReport = await axios.post(
    `http://localhost:3000/userReport/byPatientIds`,
    {
        patientIds
    },
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
  return userReport;
};

export default GetUserReportByUserId;
