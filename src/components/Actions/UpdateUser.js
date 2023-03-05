
import axios from "axios";
const updateUser = async (id, updateBody) => {
  const updatePatient = await axios.patch(`http://localhost:3000/user/${id}`, {
    ...updateBody,
  }, {
    headers: {
      'authorization': localStorage.getItem('authorization'),
    }
  });
  return updatePatient;
};

export default updateUser;