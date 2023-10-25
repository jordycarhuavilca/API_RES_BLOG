const app = require("./app.js");
const { PORT } = require("./config/ServerConfig.js");
const models = require('./database/index.models.js')
const sequelize = require('./database/DB_connect.js')
const insertData = require('./insertData.js')
const {user,comments,courseDetails,courses,purchase,userCourse} = models

async function startApp() {
  try {
    // Connect to the database
    await sequelize.authenticate()
    console.log("Connected to the database");
    await sequelize.sync({force : true})
    console.log('Tables created successfully')
    await insertData()
    console.log('Data was inserted Successfully')
  } catch (error) {
    console.error("error in database :", error);
  }
  app.listen(PORT, () => {
    console.log(`the server is running on the PORT ${PORT}`);
  });
}

startApp();

