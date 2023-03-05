import axios from "axios";
const viewTestAction = async () => {
  const patients = await axios.get("http://localhost:3000/tests", {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  return patients;
};

export default viewTestAction;