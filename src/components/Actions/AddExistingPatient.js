import axios from "axios";
import { MailExists } from "./MailExists";

const AddExistingPatientAction = async (patientBody) => {
  const { email, testsInput, homeVisit } = patientBody;
  const { data } = await MailExists(email);
  const test = await axios.get(
    `http://localhost:3000/tests/name/${testsInput}`,
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
  const patientAdded = await axios.post(
    "http://localhost:3000/patients",
    {
      userId: data.id,
      testId: test.data.id,
      homeVisit: homeVisit === "Yes" ? true : false,
    },
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
  return patientAdded;
};

export default AddExistingPatientAction;
