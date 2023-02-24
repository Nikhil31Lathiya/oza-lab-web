import axios from "axios";
const deletePatients = async (id) => {
  console.log({ id });
  const deletePatient = await axios.delete(`http://localhost:3000/user/${id}`, {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  console.log({ deletePatient });
  return deletePatient;
};

export default deletePatients;
