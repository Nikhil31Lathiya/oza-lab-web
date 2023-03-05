import axios from "axios";
const GetUserById = async (id) => {
  const user = await axios.get(`http://localhost:3000/user/${id}`, {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  return user;
};

export default GetUserById;