import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    try {
      const messsage = await this.client.sendMail({
        from: 'Equipe GoBarber <equipe@gobarber.com.br>',
        to,
        subject: 'Recuperação de senha',
        text: body,
      });

      console.log('Message sent: %s', messsage.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(messsage));
    } catch (err) {
      console.log(err);
    }
  }
}
