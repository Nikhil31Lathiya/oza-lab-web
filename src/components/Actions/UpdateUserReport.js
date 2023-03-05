import axios from "axios";
const updateUserReport = async (id, updateBody) => {
  const updatedUserReport = await axios.patch(`http://localhost:3000/userReport/${id}`, {
    ...updateBody,
  }, {
    headers: {
      'authorization': localStorage.getItem('authorization'),
    }
  });
  return updatedUserReport;
};

export default updateUserReport;