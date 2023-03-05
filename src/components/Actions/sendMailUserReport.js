import axios from 'axios'
export async function sendMailUserReport(email) {
  const emailSend = await axios.post(
    "http://localhost:3000/verification/mail/userReport",
    {
      email: email,
    }
  );
  return emailSend;
}
