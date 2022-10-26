const nodemailer = require('nodemailer');
import { OAuth2Client } from 'google-auth-library';

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

// send mail
const sendEmail = async (to: string, url: string, txt: string) => {
	const oAuth2Client = new OAuth2Client(
		CLIENT_ID,
		CLIENT_SECRET,
		OAUTH_PLAYGROUND
	);

	oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

	try {
		const access_token = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: SENDER_MAIL,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				access_token,
			},
		});

		const mailOptions = {
			from: SENDER_MAIL,
			to: to,
			subject: 'blog app',
			html: `
              <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DevAT channel.</h2>
              <p>축하합니다! blog app을 사용할 준비가 거의 되었습니다.
							아래 버튼을 클릭하여 이메일 주소를 확인하십시오.
              </p>
              
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
          
              <p>어떤 이유로든 버튼이 작동하지 않으면 아래 링크를 클릭하세요</p>
          
              <div>${url}</div>
              </div>
            `,
		};

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (err) {
		console.log(err);
	}
};

export default sendEmail;
