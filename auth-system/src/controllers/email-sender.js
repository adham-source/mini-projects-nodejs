import sgMail from "@sendgrid/mail"
import { SENDGRID, HOST_EMAIL } from "../constants"

sgMail.setApiKey(SENDGRID)

const sendEmail = async (email, subject, text, html) => {
  try {
    const msg = {
      to: email, // Change to your recipient
      from: HOST_EMAIL, // Change to your verified sender
      subject,
      text,
      html,
    }
    await sgMail.send(msg)
    console.log("Email sent")
  } catch (err) {
    console.error("ERROR SENDING", err.message)
  } finally {
    return
  }
}

export default sendEmail
