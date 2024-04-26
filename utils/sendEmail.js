const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const sendEmail = (to, subject, cname, email, message, template) => {
    // Create an OAuth2 client
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground" // Redirect URL
    );

    // Set your access token and refresh token
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
    });

    // Generate an access token
    oauth2Client.getAccessToken().then((token) => {
        const accessToken = token.token;

        // Create a transporter object using OAuth2
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_ADDRESS,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        // Define email options
        const mailOptions = {
            from: "akoley012@gmail.com",
            to: to,
            subject: subject,
            html: template(cname, email, message),
        };

        // Send email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    });
};

module.exports = { sendEmail };
