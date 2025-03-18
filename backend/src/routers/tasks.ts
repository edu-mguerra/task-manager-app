import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export const routerT = Router()

routerT.post('/tasks', async (req, res) => {
  const { title, description, userId } = req.body

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId
    },
  })
  res.status(201).json(task)
})

routerT.get('/tasks/:userId', async (req, res) => {
  const { userId } = req.params


  const tasks = await prisma.task.findMany({
    where: { userId }
  })
  res.status(200).json(tasks)
})


routerT.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body


  const task = await prisma.task.update({
    where: { id: String(id) },
    data: {
      title: title ?? undefined,
      description: description ?? undefined

    }
  })
  res.status(200).json(task)
  return
})

routerT.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params

  await prisma.task.delete({
    where: { id: String(id) }
  })
  res.status(200).json({ message: 'Task deleted successfully' });
  return


})



export default routerT
