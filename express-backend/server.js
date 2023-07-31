const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SK);

const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const db = mongoose.connect(process.env.MONGO_DB_URI);
const itemRouter = require("./routes/ItemRoute");
app.use("/items", itemRouter);

// FOR STRIPE
app.post("/checkout", async (req, res) => {
  /*
    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
  const items = req.body.items;
  const lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: process.env.FRONTEND_SUCCESS_LINK,
    cancel_url: process.env.FRONTEND_CANCEL_LINK,
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(process.env.API_PORT, () =>
  console.log(`Listening on port ${process.env.API_PORT}!`)
);
