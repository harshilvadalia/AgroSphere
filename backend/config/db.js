//logic to connect with database
import mongoose from 'mongoose';
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://fatemakapadia0304:0304@cluster0.rx8g3.mongodb.net/food-del').then(()=>{
        console.log('Database connected')
    })
}