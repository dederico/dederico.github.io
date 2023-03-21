import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

interface User {
  email: string;
  password: string;
}

interface Token {
  id: string
}

const users: User[] = [
  {
    email: 'user1@example.com',
    password: '$2b$10$fSnmSRRJwCwI1gdvKzCUquYI6XjK6mD1iZQ8WZM08rGJbKj70TzvW' // hashed version of 'password'
  },
  {
    email: 'user2@example.com',
    password: '$2b$10$Pg3qBzYfXjM07nB/iZL7seVRQLcIlyV7QeK/zkmJn7z3iWU9XsUjO' // hashed version of 'password'
  }
];

const jwtSecret = 'your_secret_key';

export const authenticate = async (req: Request, res: Response): Promise<{ token: string }> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Please provide an email and password' });
    return { token: '' };
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return { token: '' };
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(401).json({ error: 'Invalid email or password' });
    return { token: '' };
  }

  const token = jwt.sign({ email }, jwtSecret);

  res.json({ token });
  return { token };
};

export const verifyToken = (token: string): Promise<{ email: string }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as { email: string });
      }
    });
  });
};
