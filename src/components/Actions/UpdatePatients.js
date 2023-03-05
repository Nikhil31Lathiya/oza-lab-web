import axios from "axios";
const updatePatients = async (id, updateBody) => {
  const { test, homeVisit } = updateBody;
  const { data } = await axios.get(
    `http://localhost:3000/tests/name/${test}`,
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
  const updatePatient = await axios.patch(`http://localhost:3000/patients/${id}`, {
    homeVisit: homeVisit === 'Yes' ? true : false,
    testId: data.id,
  }, {
    headers: {
      'authorization': localStorage.getItem('authorization'),
    }
  });
  return updatePatient;
};

export default updatePatients;
