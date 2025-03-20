import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export const routerT = Router()

routerT.post('/tasks', async (req, res) => {
  const { title, description, userId, categoryId, dueDate } = req.body

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId,
      categoryId,
      dueDate: new Date(dueDate)
    },
    include: {
      Category: true
    }
  })
  res.status(201).json(task)
})

routerT.get('/tasks/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      include: {
        Category: true,
      }
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro ao carregar as tarefas:', error);
    res.status(500).json({ message: 'Erro ao carregar as tarefas' });
  }
});

routerT.get('/tasks/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  const tasks = await prisma.task.findMany({
    where: {
      categoryId: String(categoryId),
    },
  });

  res.status(200).json(tasks);
})

routerT.get('/tasks/deadline/:date', async (req, res) => {
  const { date } = req.params;

  const tasks = await prisma.task.findMany({
    where: {
      dueDate: {
        lte: new Date(date),
      },
    },
  });

  res.status(200).json(tasks);
});

routerT.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Erro ao carregar as categorias:', error);
    res.status(500).json({ message: 'Erro ao carregar as categorias' });
  }
});




routerT.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params
  const { title, description, categoryId, dueDate } = req.body


  const task = await prisma.task.update({
    where: { id: String(id) },
    data: {
      title: title ?? undefined,
      description: description ?? undefined,
      categoryId: categoryId ?? undefined,
      dueDate: dueDate ?? undefined,

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
