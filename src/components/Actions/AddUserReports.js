import axios from "axios";
const AddUserReportAction = async (userReportBody) => {
  const test = await axios.post(
    "http://localhost:3000/userReport",
    {
      ...userReportBody,
    },
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
  return test;
};

export default AddUserReportAction;
