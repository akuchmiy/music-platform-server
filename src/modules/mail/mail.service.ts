import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { configService } from '../../config/configService'

@Injectable()
export class MailService {
  private readonly mailAccount: string
  private readonly applicationLink: string
  private readonly transporter: nodemailer.Transporter

  constructor() {
    this.applicationLink = configService.getValue('APP_LINK')
    this.mailAccount = configService.getValue('SMTP_USER')
    this.transporter = nodemailer.createTransport({
      host: configService.getValue('SMTP_HOST'),
      port: +configService.getValue('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.mailAccount,
        pass: configService.getValue('SMTP_PASSWORD'),
      },
    })
  }

  public async sendActivationMail(to: string, userId: string) {
    const link = `${this.applicationLink}/auth/activate/${userId}`

    return this.transporter.sendMail({
      from: this.mailAccount,
      subject: `Account activation on ${this.applicationLink}`,
      to,
      text: '',
      html: `
        <div>
            <h1>
                <a href="${link}">Click to activate your profile</a>
            </h1>
        </div>
      `,
    })
  }
}
