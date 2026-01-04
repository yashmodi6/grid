import transporter from "./nodemailer";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendEmail({to, subject, html, text}: SendEmailParams) {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html,
      text,
    });

    return {success: true};
  } catch (err) {
    console.error("sendEmail:", err);
    return {success: false};
  }
}
