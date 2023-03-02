import axios from "axios";
const viewUserAction = async () => {
  const user = await axios.get("http://localhost:3000/user", {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  return user;
};

export default viewUserAction;