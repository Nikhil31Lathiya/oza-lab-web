import axios from "axios";
const LoginAction = async (email, password) => {
  const loggedIn = await axios.post("http://localhost:3000/login", {
    email: email,
    password: password,
  });
  return loggedIn;
};

export default LoginAction;
