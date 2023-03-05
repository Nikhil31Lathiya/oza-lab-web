import axios from "axios";
const deleteUserReport = async (id) => {
  const deletedUserReport = await axios.delete(`http://localhost:3000/userReport/${id}`, {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return deletedUserReport;
};

export default deleteUserReport;
