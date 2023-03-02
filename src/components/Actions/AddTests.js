import axios from "axios";
const AddTestAction = async (testBody) => {
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
  return test;
};

export default AddTestAction;
