const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "reservabataraprueba@gmail.com",
      pass: "iotbfmqoyzfieflg",
    },
  });

  module.exports = { transporter };
/*
  testTransporter.sendMail({
    from: 'reservabataraprueba@gmail.com',
    to: 'usuarioreservabatara@gmail.com',
    subject: 'Prueba',
    text: 'Esto es una prueba de envío.',
}, (error, info) => {
    if (error) {
        return console.log('Error:', error);
    }
    console.log('Mensaje enviado: %s', info.messageId);
});*/