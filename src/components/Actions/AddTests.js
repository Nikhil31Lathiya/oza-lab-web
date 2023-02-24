import axios from "axios";
const AddTestAction = async (testBody) => {
  console.log({ testBody });
  const test = await axios.post(
    "http://localhost:3000/tests",
    {
      ...testBody,
    },
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
  console.log(test);
  return test;
};

export default AddTestAction;
