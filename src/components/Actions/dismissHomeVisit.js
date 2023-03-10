import axios from "axios";
const DismissHomeVisit = async (id) => {
    console.log('dismiss id: ' +id)
  const dismissHomeVisit = await axios.patch(`http://localhost:3000/homeVisit/dismissHomeVisit/${id}`, {
    id: id
  } ,{
    headers: {
        authorization: localStorage.getItem('authorization')
    }
  });
  console.log({dismissHomeVisit});
  return dismissHomeVisit;
};

export default DismissHomeVisit;
