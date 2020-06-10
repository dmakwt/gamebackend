const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendForgotPassword = (email, name, link) => {
    sgMail.send({
        to: email,
        from: process.env.APP_EMAIL,
        subject: 'Password change request',
        text: `Click this link to reset password   ${link}`,
        html: ` 
        <h2>Reset Your Password</h2>
        <strong>Hello ${name}, Click belowe to reset password</strong>
        <br>
        <br>
        <a href="${link}">RESET PASSWORD</a>
        <br>
        <p>Game</p>
        `


    }
    )
}



module.exports = {
    sendForgotPassword,
}