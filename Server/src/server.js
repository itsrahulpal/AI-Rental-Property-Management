require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

//Routes
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const propertyRoute = require("./routes/propertyRoute");
const rentalReqRoute = require("./routes/rentalReqRoute");
const adminRoute = require("./routes/adminRoute");
const aiRoute = require("./routes/aiRoute");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoute);
app.use("category",categoryRoute);
app.use("/property",propertyRoute);
app.use("/rental-requests",rentalReqRoute);
app.use("/ai", aiRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.json({ msg: "Hello From Property Rental Manager" });
});

const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is Running at Port ${PORT}`),
);
