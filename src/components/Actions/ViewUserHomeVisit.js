import axios from "axios";
const viewUserHomeVisit = async (userId) => {
  const userHomeVisit = await axios.get(`http://localhost:3000/homeVisit/user/${userId}`, {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  return userHomeVisit;
};

export default viewUserHomeVisit;