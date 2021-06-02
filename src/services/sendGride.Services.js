const sgMail = require('@sendgrid/mail');
const config = require('../config')
sgMail.setApiKey(config.sendGrid.apiKey);
    
const sendMail = async (email) => {
    const msg = {
        to: email,
        from: config.sendGrid.fromEmail, // Use the email address or domain you verified above
        subject: 'Correo de confirmacion Alkemy-Challenge',
        text: 'Felicitaciones se ha registrado correctamente',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };

    try {
      await sgMail.send(msg)
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

module.exports = {sendMail}