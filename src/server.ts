import "dotenv/config";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { request } from "node:http";
import axios from "axios";

const API_KEY = process.env.API_KEY;

const app = express();

const port = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.get("/", (_request: Request, response: Response) => {
  response.json({
    message: "OK",
  });
});

app.get("/api/search", async (request: Request, response: Response) => {
  console.log(request.query);
  const userInput = request.query.userSearch;

  if (!userInput) {
    response.status(400);
    response.json("Please provide a search query");
    return;
  }

  const params = new URLSearchParams({
    q: userInput as string,
    country: "us",
  });

  const res = await axios.get(
    `https://api.pricesapi.io/api/v1/products/search?${params}`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  );
  response.json({
    message: "Welcome to prices search ",
    data: res.data,
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
