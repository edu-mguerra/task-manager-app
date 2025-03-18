import express from "express"
import cors from "cors";
import { router } from "./routers";
import dotenv from 'dotenv';
import { routerT } from "./routers/tasks";
import { routerL } from "./routers/login";

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())


app.use(router)
app.use(routerT)
app.use(routerL)

app.listen(3000, () => {
  console.log('Servidor rodando na porta: http://localhost:3000')
})
