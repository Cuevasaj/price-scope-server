import "dotenv/config";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

const app = express();

const port = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173/",
  }),
);

app.use(express.json());

app.get("/", (_request: Request, response: Response) => {
  response.json({
    message: "OK",
  });
});

app.use(
  (
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    console.error(error);

    response.status(500).json({
      error: "Internal server error",
    });
  },
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
