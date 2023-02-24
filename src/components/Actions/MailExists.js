import axios from "axios";
export async function MailExists(email) {
  console.log(email);
  const mailExists = await axios.post("http://localhost:3000/user/byEmail", {
    email: email,
  });
  console.log({ mailExists });
  return mailExists;
}
