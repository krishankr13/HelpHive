import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Load env variables
dotenv.config({
  path: "./.env",
});

// Debug (optional - remove later in production)
console.log("GEMINI KEY LOADED:", process.env.GOOGLE_GEMINI_API_KEY ? "YES" : "NO");

// Connect DB → then start server
connectDB()
  .then(() => {
    // Handle server errors
    app.on("error", (error) => {
      console.error("SERVER ERROR:", error);
      throw error;
    });

    // IMPORTANT: Use Render dynamic port
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MONGO DB connection failed:", err);
    process.exit(1); // important for Render
  });