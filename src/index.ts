import { Hono } from 'hono';
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { setCookie } from 'hono/cookie'
import { frequents } from "./frequent";
import { Frequent, FormDataFrequent } from "./types/frequent";

const app = new Hono()

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "https://kensaku-xy2e.vercel.app"],
    maxAge: 100000,
    credentials: true,
  })
);

app.get('/', (c) => {
  return c.json({ msg: 'Hello Hono!' });
})

app.get("/api/frequent", (c) => {
  setCookie(c, "frequents", "kanryo4", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return c.json(frequents);
});

app.post("/api/frequent", async (c) => {
  const maxId: number = Math.max(...frequents.map((frequent) => frequent.id));

  const formData: FormDataFrequent = await c.req.json();
  const newTodo: Frequent = { id: Number(maxId + 1), ...formData };
  // console.log(newTodo);

  const updatedFrequents: Frequent[] = [...frequents, newTodo];
  // console.log(updatedFrequents);
  return c.json(newTodo);
});

export default app
