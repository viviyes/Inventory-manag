import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
/* ROUTE IMPORTS */

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* STATIC FILES */
app.use("/assets", express.static(path.join(__dirname, "../assets")));

/* ROUTES */
app.use("/dashboard", dashboardRoutes); //http://localhost:8000/dashboard
app.use("/products", productRoutes); //http://localhost:8000/product
app.use("/users", userRoutes); //http://localhost:8000/users
app.use("/expense", expenseRoutes); //http://localhost:8000/expense
// app.get("/hello", (req, res) => {
//   res.send("Hello World");
// });



/* SERVER */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));