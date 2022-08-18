require('dotenv').config()
import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'

const app = express()

// middlware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded())

// Datatbase

const uri = "mongodb+srv://tranthuykieu:thoai1998@cluster0.siqp6qm.mongodb.net/DBQuestion?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
} as ConnectOptions, (err) => {
  if (err) throw err;
  console.log('Mongodb connection.')
})

// Routes
app.use('/api', routes)

// Start server listening
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`)
})