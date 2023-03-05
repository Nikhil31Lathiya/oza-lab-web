import axios from "axios";
const viewUserReportAction = async () => {
  const userReport = await axios.get("http://localhost:3000/userReport", {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  return userReport;
};

export default viewUserReportAction;