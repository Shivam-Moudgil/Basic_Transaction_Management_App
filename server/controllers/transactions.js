const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Transactions = require("../models/transactions");

const getAllTransactions = catchAsyncErrors(async (req, res) => {
    try {
      const allTransactions = await Transactions.find().sort({ createdAt: -1 });
      res.status(200).send({ success: true, data: allTransactions });
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  });
  

  const createTransaction = catchAsyncErrors(async (req, res) => {
    try {
      let { amount, type } = req.body;
  
      amount = Number(amount);
  
      const lastTransaction = await Transactions.findOne({}).sort({ createdAt: -1 });
  
      let newBalance;
      if (!lastTransaction) {
        newBalance = type === "debit" ? -amount : amount;
      } else {
        newBalance = type === "debit" ? lastTransaction.balance - amount : lastTransaction.balance + amount;
      }
  
      const transaction = new Transactions({
        ...req.body,
        amount: amount, 
        balance: newBalance,
      });
  
      await transaction.save();
  
      console.log(transaction);
      res.status(200).send({ success: true, message: "Transaction is created successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  });
  

  

module.exports = { createTransaction, getAllTransactions };
