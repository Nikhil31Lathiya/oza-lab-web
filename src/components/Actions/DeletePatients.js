import axios from "axios";
const deletePatients = async (id) => {
  const deletePatient = await axios.delete(`http://localhost:3000/patients/${id}`, {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return deletePatient;
};

export default deletePatients;
