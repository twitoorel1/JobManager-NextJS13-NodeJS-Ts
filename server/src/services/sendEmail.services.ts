import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

interface ISendEmail {
	from: string | undefined;
	to: string | undefined;
	subject: string;
	html: string;
}

export const sendEmail = async (email: ISendEmail) => {
	const transporter: Transporter = nodemailer.createTransport({
		host: 'c7.vangus.io',
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	const mailOptions = { from: email.from, to: email.to, subject: email.subject, html: email.html };

	return await transporter.sendMail(mailOptions as SendMailOptions);
};
