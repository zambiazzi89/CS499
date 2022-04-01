import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL)
    console.log(`MongoDB Connected: ${connect.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
// mongoose.connect()
// const db = mongoose.connection
// db.on('error', (error) => console.log(error))
// db.once('open', () => console.log('Connected to the db'))
