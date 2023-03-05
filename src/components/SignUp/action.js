import axios from "axios";
const SignUpAction = async (signUpBody) => {
  const { role, ...rest } = signUpBody;
  console.log({ role, rest });
  console.log({ signUpBody });
  const signUp = await axios.post("http://localhost:3000/user", {
    ...signUpBody,
  });
  return signUp;
};

export default SignUpAction;
