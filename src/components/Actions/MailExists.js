import axios from "axios";
export async function MailExists(email) {
  const mailExists = await axios.post("http://localhost:3000/user/byEmail", {
    email: email,
  });
  return mailExists;
}
