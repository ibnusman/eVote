import mongoose from 'mongoose'
import 'dotenv/config'



const db = mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
 .catch((err) => console.error('Failed to connect to MongoDB', err));


 export default db;
