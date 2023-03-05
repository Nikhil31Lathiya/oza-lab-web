import axios from "axios";
const addUserAction = async (signUpBody) => {
  const signUp = await axios.post("http://localhost:3000/user", {
    ...signUpBody,
  });
  return signUp;
};

export default addUserAction;