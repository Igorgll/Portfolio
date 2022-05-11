import express from 'express'
import { prisma } from './prisma';
import nodemailer from 'nodemailer'
import cors from 'cors'

const app = express();

    app.use(express.json());
    app.use(cors());

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "b9dfe8e7a2f431",
        pass: "d0fb29c5111648"
        }
    });

    app.post('/messages', async (request, response) => {
        const { name, lastName, email, text } = request.body;
        
        const message = await prisma.message.create({
            data: {
                name,
                lastName,
                email,
                text,
            }
        })    
        
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
    })

    app.listen(process.env.PORT || 3333, () => {
        console.log('Http Server Running!');
    });