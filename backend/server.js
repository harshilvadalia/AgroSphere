import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import 'dotenv/config'

//app congig
const app = express();
const port = 4000

//middleware
app.use(cors()); //for security
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json()); // Parses JSON data

//db connection
connectDB();

//api endpoints
app.use("/api/products", productRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/orders",orderRouter)


app.get('/', (req, res) => {
    res.send('API WORKING')
})

//listen
app.listen(port, () => {    
    console.log(`Server is running on port http://localhost:${port}`)
}
);

//mongodb+srv://fatemakapadia0304:<db_password>@cluster0.rx8g3.mongodb.net/?
//mongodb+srv://fatemakapadia0304:<db_password>@cluster0.rx8g3.mongodb.net/