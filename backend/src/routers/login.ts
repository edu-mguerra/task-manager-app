import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

export const routerL = Router()
const prisma = new PrismaClient()


routerL.post('/login', async (req, res) => {
  const { email, password } = req.body;


  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    res.status(400).json({ message: "User not found" });
    return

  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(400).json({ message: "Invalid password" });
    return
  }

  res.status(200).json({ message: "Login successful", user });
});

