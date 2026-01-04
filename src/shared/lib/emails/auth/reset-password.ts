import {sendEmail} from "@/shared/lib/emails/send-email";
// import {getUserMeta} from "@/shared/lib/request-user-meta.ts";

// type SecurityMeta = {
//     operatingSystem: string;
//     browserName: string;
//     country: string | null;
//     city: string | null;
//     continent: string | null;
// };

// <p style="font-size: 14px; color: #64748b;">
//     For security, this request was received from a <strong>${meta.operatingSystem}</strong> device using <strong>${meta.browserName}</strong> loacted at <strong>${meta.city}, ${meta.country}, ${meta.continent}</strong>.
// </p>

type User = {
  email: string;
  name: string;
};

type ResetPasswordEmailParams = {
  user: User;
  url: string;
};

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;

const RESET_PASSWORD_EMAIL = (user: User, url: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
            text-align: left; /* Shifted Left */
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
            text-align: left; /* Shifted Left */
        }
        h1 {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #0f172a;
            margin-bottom: 16px;
            text-align: left; /* Shifted Left */
        }
        p {
            font-size: 16px;
            color: #475569;
            margin-bottom: 24px;
            text-align: left; /* Shifted Left */
        }
        .emphasis {
            color: #0f172a;
            font-weight: 600;
        }
        .cta-wrapper {
            text-align: left; /* Shifted Left */
            padding: 12px 0 24px;
        }
        .button {
            background-color: #0f172a;
            color: #ffffff !important;
            padding: 14px 32px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
        }
        .fallback {
            font-size: 13px;
            color: #94a3b8;
            word-break: break-all;
            margin-top: 24px;
            text-align: left; /* Shifted Left */
        }
        .security-section {
            background-color: #f1f5f9;
            padding: 24px 40px;
            font-size: 14px;
            color: #64748b;
            line-height: 1.6;
            text-align: left; /* Shifted Left */
        }
        .footer {
            padding: 32px 40px;
            text-align: center; /* Kept Centered */
            font-size: 12px;
            color: #94a3b8;
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
                <h1>Reset your password</h1>
                <p>Hello <span class="emphasis">${user.name}</span>,</p>
                <p>
                    We received a request to reset the password for your account associated with <span class="emphasis">${user.email}</span>.
                </p>
                
                <div class="cta-wrapper">
                    <a href="${url}" class="button">Reset Password</a>
                </div>


                <p>Thanks,<br>The Grid Team</p>

                <div class="fallback">
                    If you're having trouble with the button above, copy and paste the URL below into your web browser:<br>
                    <span style="color: #0f172a; text-decoration: underline;">${url}</span>
                </div>
            </div>
            <div class="security-section">
                If you did not request a password reset, please ignore this email or contact support at <a href="mailto:${SUPPORT_EMAIL}" style="color: #0f172a; font-weight: 500;">${SUPPORT_EMAIL}</a> if you have questions.
            </div>


            <div class="footer">
                &copy; 2025 Grid SaaS. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
`;

export async function sendResetPasswordEmail({user, url}: ResetPasswordEmailParams) {
  return sendEmail({
    to: user.email,
    subject: "Reset Your Password| GRID",
    html: RESET_PASSWORD_EMAIL(user, url),
    text: `Hi ${user.name}, reset your password for GRID by visiting: ${url}`,
  });
}
