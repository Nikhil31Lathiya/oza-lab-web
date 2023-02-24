import axios from "axios";
const SignUpAction = async (signUpBody) => {
  console.log({ signUpBody });
  const signUp = await axios.post("http://localhost:3000/user", {
    ...signUpBody,
  });
  console.log(signUp);
  return signUp;
};

export default SignUpAction;
