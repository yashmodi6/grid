import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_SMTP_HOST,
  port: process.env.NODEMAILER_SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
} as SMTPTransport.Options);

export default transporter;
