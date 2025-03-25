const nodemailer = require('nodemailer');

// Configuración del transporter (ejemplo para Gmail)
const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.es',
  // Servidor SMTP de IONOS
  port: 587,
  // Puerto seguro para STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    ciphers: 'SSLv3',
    // A veces necesario para IONOS
    rejectUnauthorized: true // Solo en desarrollo, quitar en producción
  }
});

// Función para enviar correo de confirmación
const sendRegistrationEmail = async (recipient, userData) => {
  try {
    const mailOptions = {
      from: '"BCN Clean Soporte" <soporte@bcnclean.com>',
      to: recipient,
      subject: 'Confirmación de Registro',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066cc;">¡Gracias por registrarte en BCN Clean!</h2>
          <p>Hola ${userData.Nombres},</p>
          <p>Tu registro se ha completado exitosamente:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Correo:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${userData.Correo}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>NIF:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${userData.Telefono}</td>
            </tr>
          </table>
          
          <p style="margin-top: 20px;">
            <a href="https://www.bcnclean.com" 
               style="background-color: #0066cc; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
              Visita nuestro sitio web
            </a>
          </p>
        </div>
      `,
      // Opcional: versión texto plano para clientes que no soportan HTML
      text: `Gracias por registrarte en BCN Clean.\n\nDetalles:\nCorreo: ${userData.Correo}`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado a %s', recipient);
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Error enviando correo:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
module.exports = {
  sendRegistrationEmail
};