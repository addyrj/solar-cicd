const sequelize = require('./DB/config'); // adjust path
(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connection: SUCCESS');
    process.exit(0);
  } catch (err) {
    console.error('DB connection: FAILED\n', err);
    process.exit(1);
  }
})();
