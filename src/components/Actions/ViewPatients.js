import axios from "axios";
const viewPatientAction = async () => {
  const patients = await axios.get("http://localhost:3000/user", {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  console.log(patients);
  return patients;
};

export default viewPatientAction;