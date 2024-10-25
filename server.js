import bodyParser from "body-parser";
import express, { urlencoded } from "express"
import cors from 'cors'
import { config } from 'dotenv'
import { connection } from "./postgres/database.js";
import StudentRouter from "./Route/StudentRoute.js"
import MarksRoutes from "./Route/MarksRouter.js"

const app = express();
config({ path: "./config/config.env" })


const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(urlencoded({ extended: true })); // This is useful if you are handling URL-encoded data
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));


app.use("/api/v1/student", StudentRouter)
app.use('/api/v2/marks', MarksRoutes);

connection()

// to handle error ie middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log("server is runnin g on port", PORT)
})

