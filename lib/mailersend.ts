import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});

export const mailerSender = new Sender("suporte@send.educadogemcasa.online", "Educa Dog");

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
  const recipients = [new Recipient(to)];

  const emailParams = new EmailParams()
    .setFrom(mailerSender)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(html);

  return mailersend.email.send(emailParams);
}
