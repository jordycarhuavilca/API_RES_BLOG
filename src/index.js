const app = require("./app.js");
const { PORT } = require("./config/ServerConfig.js");
const models = require('./database/index.models.js')
const sequelize = require('./database/DB_connect.js')
const insertData = require('./insertData.js')

const port = new PORT()

async function runServer(){
  app.listen(port.get(), () => {
    console.log(`the server is running on the PORT ${port.get()}`);
  });
}

app.on('error',(err)=>{
  if(err.code === 'EADDRINUSE'){
    port.set(3300)
    runServer()
  } else {
    console.error('An error occurred:', err.message);
  }
})

async function startApp() {
  try {
    // Connect to the database
    await sequelize.authenticate()
    console.log("Connected to the database");
    await sequelize.sync({force : true})
    console.log('Tables created successfully')
    await insertData()
    // console.log('Data was inserted Successfully')
  } catch (error) {
    console.error("error in database : ", error);
  }
  runServer()
}

startApp();

