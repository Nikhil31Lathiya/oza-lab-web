import axios from "axios";
const GetUserReportById = async (id) => {
  const userReport = await axios.get(`http://localhost:3000/userReport/${id}`, {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  return userReport;
};

export default GetUserReportById;