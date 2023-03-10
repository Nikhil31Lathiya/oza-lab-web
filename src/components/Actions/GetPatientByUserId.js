import axios from "axios";
const GetPatientByUserId = async (userId) => {
    console.log("GetPatientByUserId', userId: " + userId + typeof userId);
  const userReport = await axios.get(
    `http://localhost:3000/patients/user/${userId}`,
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
  return userReport;
};

export default GetPatientByUserId;
