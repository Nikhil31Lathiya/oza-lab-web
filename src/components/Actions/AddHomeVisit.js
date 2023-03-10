import axios from "axios";
const AddHomeVisitAction = async (homeVisitBody) => {
  const homeVisit = await axios.post(
    "http://localhost:3000/homeVisit",
    {
      ...homeVisitBody,
    },
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
  return homeVisit;
};

export default AddHomeVisitAction;
