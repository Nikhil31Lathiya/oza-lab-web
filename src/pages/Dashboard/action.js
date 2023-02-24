import axios from "axios";

export const patientsCount = () => {
  const response = axios.get("http://localhost:3000/patients/count", {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return response
};
