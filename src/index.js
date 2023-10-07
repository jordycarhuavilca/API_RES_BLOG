const app = require("./app.js");
const { PORT } = require("./config.js");
const sequelize = require('./database/db.js')
async function startApp() {
  try {
    // Connect to the database
    await sequelize.authenticate()
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startApp();
app.listen(PORT, () => {
  console.log(`the server is running on the PORT ${PORT}`);
});
