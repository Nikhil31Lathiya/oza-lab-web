import axios from 'axios'
export async function SendApprovalMail(object) {
  const emailSend = await axios.post(
    "http://localhost:3000/verification/mail/approval",
    {
      ...object,
    }
  );
  return emailSend;
}
