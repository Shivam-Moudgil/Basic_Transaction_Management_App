require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 4400;

const DataBase = require("./config/db");

const db = new DataBase(process.env.MONGODB_URI);

db.connect().catch((err) => console.log("Error while connecting the DataBase"));

//Routes files:
const Transactions = require("./routes/transactions")

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",Transactions)

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server");
});

process.on("SIGINT", async () => {
  try {
    await db.disconnect();
  } catch (err) {
    console.log(err);
  }
});


app.listen(PORT, () =>
  console.log(`Server is connected to http://localhost:${PORT}`)
);
