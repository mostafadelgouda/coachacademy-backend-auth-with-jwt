import express from "express"; //es6
import morgan from "morgan"; //es6
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import connectToDatabase from "./config/db.js";
import postRouter from "./routes/postRouter.js";
import { errorHandlingMiddleware } from "./middleware/errorHandling.js";
import Stripe from "stripe";
import http from "http";
import { Server } from "socket.io";
// import { connectToRedis } from "./config/redis.js";
const app = express();

// Create normal HTTP server from Express
const httpServer = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    io.emit("message", msg); // broadcast to everyone
  });
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

connectToDatabase();
// connectToRedis(); // Call the Redis connection function
dotenv.config();

const createPaymentIntent = async ({ amount, currency }) => {
  return await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
};
const createPaymentLink = async ({ amount, currency }) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: "Payment",
          },
          unit_amount: amount, // amount in smallest currency unit
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

app.post("/pay", async (req, res, next) => {
  try {
    // Never trust the client in production.
    // Calculate the amount from your database/products.
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
export default app;
httpServer.listen(3000);
