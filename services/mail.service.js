const nodemailer = require('nodemailer')
class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendActivationMail(email, activationLink) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: 'Activate Your Account',
			text: `Welcome! Click this link to activate your account: ${activationLink}`,
			html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Activation</title>
            </head>
            <body style="
                margin: 0;
                padding: 0;
                background-color: #f6f9fc;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            ">
                <div style="
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 40px 20px;
                ">
                    <div style="
                        background-color: white;
                        border-radius: 8px;
                        padding: 40px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    ">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <!-- Replace with your logo -->
                            <h1 style="
                                color: #1a1a1a;
                                margin: 0;
                                font-size: 24px;
                                font-weight: 600;
                            ">Welcome!</h1>
                        </div>
                        
                        <p style="
                            color: #4a4a4a;
                            font-size: 16px;
                            line-height: 24px;
                            margin: 0 0 24px;
                        ">
                            Thank you for signing up! To complete your registration and activate your account, please click the button below:
                        </p>
                        
                        <div style="text-align: center; margin: 32px 0;">
                            <a href="${activationLink}" style="
                                display: inline-block;
                                background-color: #5469d4;
                                color: white;
                                text-decoration: none;
                                padding: 12px 32px;
                                border-radius: 4px;
                                font-weight: 600;
                                font-size: 16px;
                            ">Activate Account</a>
                        </div>
                        
                        <p style="
                            color: #4a4a4a;
                            font-size: 16px;
                            line-height: 24px;
                            margin: 0 0 24px;
                        ">
                            If the button doesn't work, you can also click the link below or copy it to your browser:
                        </p>
                        
                        <p style="
                            color: #6b7280;
                            font-size: 14px;
                            line-height: 20px;
                            margin: 0;
                            word-break: break-all;
                        ">
                            <a href="${activationLink}" style="color: #5469d4; text-decoration: underline;">
                                ${activationLink}
                            </a>
                        </p>
                        
                        <div style="
                            margin-top: 40px;
                            padding-top: 20px;
                            border-top: 1px solid #e5e7eb;
                            text-align: center;
                            color: #6b7280;
                            font-size: 12px;
                        ">
                            <p style="margin: 0;">
                                If you didn't create an account, you can safely ignore this email.
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html
			`,
		})
	}

	async sendForgotPasswordMail(email, resetPasswordLink) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: `Forgot password. This email can be used during 15 minutes`,
			text: '',
			html: `
                <div>
                    <h1>Time to hacking. If you want to recover your account just click the link below</h1>
                    <a href="${resetPasswordLink}">Link to recover account</a>
                    
                    <b>This link will work during 15 minutes </b>
                </div>
            `,
		})
	}
}

module.exports = new MailService()
