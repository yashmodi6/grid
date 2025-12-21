import {sendEmail} from "@/lib/emails/send-email";

type User = {
    email: string;
    name: string;
};

type VerifyEmailParams = {
    user: User;
    url: string;
};

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;
const VERIFY_EMAIL_HTML = (user: User, url: string) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Typography & Reset */
      body {
        font-family:
          "Inter",
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          Roboto,
          sans-serif;
        background-color: #f8fafc;
        margin: 0;
        padding: 0;
        color: #1e293b;
        line-height: 1.5;
      }
      .wrapper {
        width: 100%;
        padding: 48px 0;
        background-color: #f8fafc;
      }
      .container {
        max-width: 560px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
      }
      .header {
        padding: 40px 40px 0;
        text-align: left; /* Aligned Left */
      }
      .logo {
        font-size: 20px;
        font-weight: 800;
        letter-spacing: -0.04em;
        color: #0f172a;
        text-decoration: none;
        text-transform: uppercase;
      }
      .content {
        padding: 32px 40px;
        text-align: left; /* Aligned Left */
      }
      h1 {
        font-size: 26px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #0f172a;
        margin-bottom: 16px;
        text-align: left; /* Aligned Left */
      }
      p {
        font-size: 16px;
        color: #475569;
        margin-bottom: 24px;
        text-align: left; /* Aligned Left */
      }
      .emphasis {
        color: #0f172a;
        font-weight: 600;
      }
      /* Action Area */
      .cta-wrapper {
        text-align: left; /* Aligned Left */
        padding: 12px 0 32px;
      }
      .button {
        background-color: #000000;
        color: #ffffff !important;
        padding: 14px 32px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
      }
      /* Fine Print & Security */
      .security-section {
        background-color: #f1f5f9;
        padding: 24px 40px;
        font-size: 14px;
        color: #64748b;
        text-align: left; /* Aligned Left */
      }
      .security-link {
        color: #0f172a;
        font-weight: 500;
        text-decoration: underline;
      }
      .security-section p {
        margin: 8px 0 0;
      }
      .footer {
        padding: 32px 40px;
        text-align: center; /* Kept Centered */
        font-size: 12px;
        color: #94a3b8;
        letter-spacing: 0.02em;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <div class="header">
          <a href="#" class="logo">Grid</a>
        </div>

        <div class="content">
          <h1>Verify your email</h1>
          <p>Hello <span class="emphasis">${user.name}</span>,</p>
          <p>
            We’re excited to have you join the <strong>Grid</strong> community. Before we get you
            started, we just need to verify your email address
            <span class="emphasis">${user.email}</span>
          </p>

          <div class="cta-wrapper">
            <a href="${url}" class="button">Confirm my email</a>
          </div>

          <p style="font-size: 14px; margin-bottom: 0">
            This link will remain active for the next 24 hours.
          </p>

          <p style="margin-top: 24px">Thanks,<br />The Grid Team</p>
        </div>

        <div class="security-section">
          <strong>Didn't sign up for Grid?</strong><br />
          If you didn't create an account or this email was sent in error, you can safely ignore
          this message.<br />
          For any other concerns, please contact us at
          <a href="mailto:${SUPPORT_EMAIL}" class="security-link"> ${SUPPORT_EMAIL} </a>
        </div>

        <div class="footer">&copy; 2025 Grid. All rights reserved.</div>
      </div>
    </div>
  </body>
</html>


`;

export async function sendEmailVerificationEmail({user, url}: VerifyEmailParams) {
    return sendEmail({
        to: user.email,
        subject: "Verify your email | GRID",
        html: VERIFY_EMAIL_HTML(user, url),
        text: `Hi ${user.name}, verify your email for GRID by visiting: ${url}`
    });
}
