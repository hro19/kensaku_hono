import { Hono } from 'hono'
import { frequents } from "./frequent"

const app = new Hono()

app.get('/', (c) => {
  return c.json({ msg: 'Hello Hono!' });
})

app.get("/api/frequent", (c) => c.json(frequents));


export default app
