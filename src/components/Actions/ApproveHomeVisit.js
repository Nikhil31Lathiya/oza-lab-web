import axios from "axios";
const approvedHomeVisitAction = async (id) => {
    console.log(id);
    console.log(localStorage.getItem('authorization'));
  const approvedHomeVisit = await axios.patch(`http://localhost:3000/homeVisit/approveHomeVisit/${id}`, {
    id: id
  } ,{
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  console.log({approvedHomeVisit});
  return approvedHomeVisit;
};

export default approvedHomeVisitAction;
