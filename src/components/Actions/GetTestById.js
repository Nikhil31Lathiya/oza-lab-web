import axios from "axios";
const GetTestById = async (id) => {
  const patient = await axios.get(`http://localhost:3000/tests/${id}`, {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return patient;
};

export default GetTestById;
