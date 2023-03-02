import axios from "axios";
const deleteUser = async (id) => {
  const deleteUser = await axios.delete(`http://localhost:3000/user/${id}`, {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return deleteUser;
};

export default deleteUser;
