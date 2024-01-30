import { Hono } from 'hono'
import { cors } from "hono/cors";
import { setCookie } from 'hono/cookie'
import { frequents } from "./frequent"

const app = new Hono()

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

  const { name, word } = await c.req.json();
  const newTodo = {id: Number(maxId + 1),name,word};
  // console.log(newTodo);
  const updatedFrequents = [...frequents, newTodo];

  return c.json(newTodo);
});

export default app
