const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { getAllTransactions, createTransaction } = require("../controllers/transactions");

const router = express.Router();

router.get("/transactions",getAllTransactions)
router.post("/create",createTransaction)

module.exports=router;
