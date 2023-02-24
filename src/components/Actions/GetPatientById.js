import axios from "axios";
const GetPatientById = async (id) => {
  const patient = await axios.get(`http://localhost:3000/user/${id}`, {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  console.log(patient);
  return patient;
};

export default GetPatientById;