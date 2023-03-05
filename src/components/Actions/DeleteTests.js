import axios from "axios";
const deleteTests = async (id) => {
  const deleteTest = await axios.delete(`http://localhost:3000/tests/${id}`, {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return deleteTest;
};

export default deleteTests;
