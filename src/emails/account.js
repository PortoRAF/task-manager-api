const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'renatoafporto@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'renatoafporto@gmail.com',
    subject: 'Sorry to see you leaving',
    text: `Hi, ${name}. We're sorry to hear you cancelled you account. Could you share with us what motivated you to leave our service?`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
};
