var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi, } from "openai";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import GPT3TokenizerImport from "gpt3-tokenizer";
// Authentication module import
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
const users = [
    {
        email: 'user1@example.com',
        password: '$2b$10$fSnmSRRJwCwI1gdvKzCUquYI6XjK6mD1iZQ8WZM08rGJbKj70TzvW', // hashed version of 'password'
    },
    {
        email: 'user2@example.com',
        password: '$2b$10$Pg3qBzYfXjM07nB/iZL7seVRQLcIlyV7QeK/zkmJn7z3iWU9XsUjO', // hashed version of 'password'
    },
];
const jwtSecret = 'your_secret_key';
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Please provide an email and password' });
        return { token: '' };
    }
    const user = users.find((u) => u.email === email);
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
const verifyToken = (token) => {
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
const GPT3Tokenizer = typeof GPT3TokenizerImport === "function"
    ? GPT3TokenizerImport
    : GPT3TokenizerImport.default;
const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
function getTokens(input) {
    const tokens = tokenizer.encode(input);
    return tokens.text.length;
}
dotenv.config();
const port = 8000;
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "*",
}));
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.post("/api/authenticate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if user exists and password is correct
        const user = yield authenticate(email, password);
        if (user) {
            // Generate token with JWT
            const token = jwt.sign({ id: user.token }, process.env.JWT_SECRET || "");
            // Send token to client
            res.json({ token });
        }
        else {
            res.status(401).send("Invalid credentials");
        }
    }
    catch (error) {
        res.status(500).send("Something went wrong");
    }
}));
app.post("/api/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const requestMessages = req.body.messages;
    try {
        let tokenCount = 0;
        requestMessages.forEach((msg) => {
            const tokens = getTokens(msg.content);
            tokenCount += tokens;
        });
        const moderationResponse = yield openai.createModeration({
            input: requestMessages[requestMessages.length - 1].content,
        });
        if ((_a = moderationResponse.data.results[0]) === null || _a === void 0 ? void 0 : _a.flagged) {
            return res.status(400).send("Message is inappropriate");
        }
        const prompt = 'Eres "Careeryzer", un experto coach de carrera, y asistente basado en IA que te ayuda a crecer y desarrollarte en tu carrera profesional';
        tokenCount += getTokens(prompt);
        if (tokenCount > 4000) {
            return res.status(400).send("Message is too long");
        }
        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: prompt }, ...requestMessages],
            temperature: 0.6,
        };
        const completion = yield openai.createChatCompletion(apiRequestBody);
        res.json(completion.data);
    }
    catch (error) {
        if (error instanceof Error) {
            // @ts-ignore
            console.log(error.toJSON());
        }
        res.status(500).send("Something went wrong");
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map