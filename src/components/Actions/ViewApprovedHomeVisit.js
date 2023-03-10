import axios from "axios";
const viewApprovedHomeVisitAction = async () => {
  const approvedHomeVisit = await axios.get(`http://localhost:3000/homeVisit/approved`, {
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  console.log({approvedHomeVisit});
  return approvedHomeVisit;
};

export default viewApprovedHomeVisitAction;