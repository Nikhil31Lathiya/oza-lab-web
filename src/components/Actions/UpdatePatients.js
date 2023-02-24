import axios from "axios";
const updatePatients = async (id, updateBody) => {
  console.log({ id, updateBody });
  const updatePatient = await axios.patch(`http://localhost:3000/user/${id}`, {
    ...updateBody,
  }, {
    headers: {
      'authorization': localStorage.getItem('authorization'),
    }
  });
  console.log(updatePatient);
  return updatePatient;
};

export default updatePatients;