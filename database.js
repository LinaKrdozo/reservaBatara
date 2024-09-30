const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos
const sequelize = new Sequelize('reservaBatara', 'root', '12345', {
  host: 'localhost',
  port: 3312, 
  dialect: 'mysql',
  logging: true 
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

// Llama a la función para probar la conexión
testConnection();
