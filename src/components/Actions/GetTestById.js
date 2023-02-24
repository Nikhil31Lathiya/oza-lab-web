import axios from "axios";
const GetTestById = async (id) => {
  const patient = await axios.get(`http://localhost:3000/tests/${id}`, {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  console.log(patient);
  return patient;
};

export default GetTestById;