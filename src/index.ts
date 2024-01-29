import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ msg: 'Hello Hono!' });
})

let todoList = [
  { id: "1", title: "Learning Hono", completed: false },
  { id: "2", title: "Watch the movie", completed: true },
  { id: "3", title: "Buy milk", completed: false },
];

app.get("/api/frequent", (c) => c.json(todoList));


export default app
