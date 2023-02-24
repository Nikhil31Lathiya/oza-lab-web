import axios from "axios";
const deleteTests = async (id) => {
  console.log({ id });
  const deleteTest = await axios.delete(`http://localhost:3000/tests/${id}`, {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  console.log({ deleteTest });
  return deleteTest;
};

export default deleteTests;
