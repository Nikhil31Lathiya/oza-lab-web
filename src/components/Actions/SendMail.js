import axios from 'axios'
export async function sendMail(email) {
  const emailSend = await axios.post(
    "http://localhost:3000/verification/mail",
    {
      email: email,
    }
  );
  return emailSend;
}
