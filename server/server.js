import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

// Create Express app
const createApp = () => {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(cors());
  
  // Routes
  app.get('/', (req, res) => res.send("Server is Live..."));
  
  // Import routes
  import("./routes/userRoutes.js").then(userRouter => {
    app.use('/api/users', userRouter.default);
  }).catch(err => console.error("Failed to load user routes:", err));
  
  import("./routes/resumeRoutes.js").then(resumeRouter => {
    app.use('/api/resumes', resumeRouter.default);
  }).catch(err => console.error("Failed to load resume routes:", err));
  
  import("./routes/aiRoutes.js").then(aiRouter => {
    app.use('/api/ai', aiRouter.default);
  }).catch(err => console.error("Failed to load AI routes:", err));
  
  return app;
};

// For local development
const PORT = process.env.PORT || 3001;
await connectDB();
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;