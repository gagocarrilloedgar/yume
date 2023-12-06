import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

export async function sendPasswordRecoveryToken({
  email,
  url,
  token
}: {
  email: string;
  url: string;
  token: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD
    }
  });

  const info = await transporter.sendMail({
    from: `Yume`, // sender address
    to: email,
    subject: "Yume password Recovery",
    html: `
        <p>Someone (hopefully you) has requested a password reset for your account.</p>
        <p>If you did not request this, you can safely ignore this email.</p>
        <p>Otherwise, please click the link below to complete the process:</p>
        <a href="${url}?token=${token}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        `
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
