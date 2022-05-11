"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("./prisma");
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b9dfe8e7a2f431",
        pass: "d0fb29c5111648"
    }
});
app.post('/messages', async (request, response) => {
    const { name, lastName, email, text } = request.body;
    const message = await prisma_1.prisma.message.create({
        data: {
            name,
            lastName,
            email,
            text,
        }
    });
    await transport.sendMail({
        from: 'Equipe Igão <opa@feedget.com>',
        to: 'Igor Lima <igorlimagn@gmail.com>',
        subject: 'Nova mensagem feita no campo de mensagem do portfolio',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Nome: ${name}</p>`,
            `<p>Sobrenome: ${lastName}</p>`,
            `<p>Email: ${email}</p>`,
            `<p>Assunto: ${text}</p>`,
            `</div>`
        ].join('\n')
    });
    return response.status(201).json({ data: message });
});
app.listen(3333, () => {
    console.log('Http Server Running!');
});
