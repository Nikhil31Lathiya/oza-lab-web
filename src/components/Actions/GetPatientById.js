import axios from "axios";
const GetPatientById = async (id) => {
  console.log("GetPatientById", id);
  const patient = await axios.get(`http://localhost:3000/patients/${id}`, {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  return patient;
};

export default GetPatientById;