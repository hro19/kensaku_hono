import { Hono } from 'hono'
import { cors } from "hono/cors";
import { frequents } from "./frequent"

const app = new Hono()

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "https://kensaku-xy2e.vercel.app"],
    maxAge: 60000,
    credentials: true,
  })
);

app.get('/', (c) => {
  return c.json({ msg: 'Hello Hono!' });
})

let frequentsData = frequents;

app.get("/api/frequent", (c) => c.json(frequentsData));

app.post("/api/frequent", async (c) => {

  const maxId:number = Math.max(...frequentsData.map((frequent) => frequent.id));

  const { name, word } = await c.req.json();
  const newTodo = {id: Number(maxId + 1),name,word};
  // console.log(newTodo);
  frequentsData = [...frequentsData, newTodo];

  return c.json({
    msg:"新規頻出単語追加",
    data: frequentsData
  });
});

export default app
