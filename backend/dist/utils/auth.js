var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const users = [
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
export const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const match = yield bcrypt.compare(password, user.password);
    if (!match) {
        res.status(401).json({ error: 'Invalid email or password' });
        return { token: '' };
    }
    const token = jwt.sign({ email }, jwtSecret);
    res.json({ token });
    return { token };
});
export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
};
//# sourceMappingURL=auth.js.map