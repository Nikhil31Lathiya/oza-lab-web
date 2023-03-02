import axios from "axios";
const GetUserById = async (id) => {
  const patient = await axios.get(`http://localhost:3000/user/${id}`, {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  return patient;
};

export default GetUserById;