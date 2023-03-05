import axios from "axios";

export const patientsCount = () => {
  const response = axios.get("http://localhost:3000/patients/count", {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return response
};
export const usersCount = () => {
  const response = axios.get("http://localhost:3000/user/count", {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return response
};
export const userReportsCount = () => {
  const response = axios.get("http://localhost:3000/userReport/count", {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return response
};
export const testsCount = () => {
  const response = axios.get("http://localhost:3000/tests/count", {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  });
  return response
};

