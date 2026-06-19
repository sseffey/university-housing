import cors from "cors";
import multer from "multer";


app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

const corsOptions = {
   origin: process.env.CORS_ORIGIN || "*",
 };

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);

  if (error instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.statusCode ? error.message : "Internal Server Error",
  });
});

export default app;
