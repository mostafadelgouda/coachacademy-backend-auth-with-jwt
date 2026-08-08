import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import Stripe from "stripe";
import connectToDatabase from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import { errorHandlingMiddleware } from "./middleware/errorHandling.js";

dotenv.config();

const app = express();

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

if (process.env.MONGO_URI && process.env.NODE_ENV !== "test") {
  await connectToDatabase();
}

const createPaymentIntent = async ({ amount, currency }) => {
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }

  return await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
};

const createPaymentLink = async ({ amount, currency }) => {
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: "Payment",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: "https://yourwebsite.com/success",
    cancel_url: "https://yourwebsite.com/cancel",
  });

  return session.url;
};

app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, timestamp: new Date().toISOString() });
});

app.post("/pay", async (req, res, next) => {
  try {
    const { amount, currency = "usd" } = req.body;

    const link = await createPaymentLink({ amount, currency });
    res.json({
      success: true,
      url: link,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use(errorHandlingMiddleware);

if (process.env.NODE_ENV !== "test" && process.env.VERCEL !== "1") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
