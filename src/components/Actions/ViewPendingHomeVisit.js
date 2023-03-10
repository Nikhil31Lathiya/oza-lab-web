import axios from "axios";
const viewPendingHomeVisit = async () => {
  const pendingHomeVisit = await axios.get(`http://localhost:3000/homeVisit/pending`, {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  console.log(pendingHomeVisit);
  return pendingHomeVisit;
};

export default viewPendingHomeVisit;