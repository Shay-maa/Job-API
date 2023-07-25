require("dotenv").config();

const notFound = require('./middlewares/not_found')
const errorMiddleware =require('./middlewares/error_handler')
const auth = require("./middlewares/authentication")
const express = require('express')
const connectDB = require('./db/connect')

const authRouter = require("./routes/auth")
const jobsRouter = require("./routes/jobs")

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send('JOB_API'))

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/jobs', auth,jobsRouter)

app.use(notFound);
app.use(errorMiddleware);


const start = async()=>{
    await connectDB(process.env.MONGO_URI);
    try{
        app.listen(port, console.log(`server is listening port ${port}...`))
    }catch(error){
        console.log(error)
    }
}
start();
