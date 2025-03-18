import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()



export const router = Router()

router.post('/user', async (req, res) => {
  const { name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10);



  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword

    }
  })
  res.status(201).json(user)

})

router.get('/user', async (req, res) => {
  const result = await prisma.user.findMany()

  res.status(200).json({ result })
})

router.put('/user/:id', async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      email
    }
  })

  res.status(200).json(user)
})


router.delete('/user/:id', async (req, res) => {
  const { id } = req.params

  const user = await prisma.user.delete({
    where: { id }
  })
  res.status(200).json(user)
})
