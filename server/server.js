import express from "express";
import cors from "cors";
import "dotenv/config";

// Export for Vercel
export const config = {
  api: {
    bodyParser: true,
  },
};

// Create Express app
const createApp = () => {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(cors());
  
  // Routes
  app.get('/', (req, res) => res.send("Server is Live..."));
  
  // Import routes dynamically to avoid circular dependencies
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
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  const app = createApp();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// For Vercel serverless functions
export default async function handler(req, res) {
  const app = createApp();
  return app(req, res);
}