import axios from "axios";
const viewPatientAction = async () => {
  const patients = await axios.get("http://localhost:3000/patients", {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  return patients;
};

export default viewPatientAction;