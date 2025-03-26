const venom = require('venom-bot');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Rota de "ping" para o UptimeRobot manter o bot online
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Servidor HTTP ativo na porta ${PORT}`);
});

venom
  .create({
    headless: true,
    browserArgs: ['--no-sandbox'],
  })
  .then((client) => start(client));

function start(client) {
  client.onMessage((message) => {
    const msg = message.body.toLowerCase();

    if (msg === '1') {
      client.sendText(
        message.from,
        '✨ Veja nossas joias em prata 925 no site:\n👉 https://seusite.com.br'
      );
    } else if (msg === '2') {
      client.sendText(
        message.from,
        '📦 *Trocas e Devoluções*\n\n' +
        'Você pode trocar em até 7 dias após o recebimento.\n' +
        'O produto deve estar sem uso e com embalagem original.\n\n' +
        'Para solicitar, envie: "Quero trocar um produto"'
      );
    } else if (msg === '3') {
      client.sendText(
        message.from,
        '❓ *Dúvidas Frequentes:*\n\n' +
        '- As joias são prata 925 de verdade?\n👉 Sim! Todas têm certificado.\n\n' +
        '- Fazem entregas para todo o Brasil?\n👉 Sim!\n\n' +
        '- Como limpar minha prata?\n👉 Use flanela ou produtos próprios.'
      );
    } else if (msg === '4') {
      const agora = new Date();
      const hora = agora.getHours();
      const minutos = agora.getMinutes();
      const dia = agora.getDay(); // 0 = domingo, 1 = segunda, ..., 6 = sábado

      const dentroDoHorario =
        dia >= 1 && dia <= 5 && // segunda a sexta
        (hora > 10 || (hora === 10 && minutos >= 30)) && // após 10h30
        hora < 18; // antes das 18h

      if (dentroDoHorario) {
        client.sendText(
          message.from,
          '📞 Um atendente será chamado para te ajudar em breve!'
        );
      } else {
        client.sendText(
          message.from,
          '⏰ Nosso horário de atendimento é de *segunda a sexta, das 10h30 às 18h*.\n' +
          'Envie sua dúvida e responderemos assim que possível!'
        );
      }
    } else {
      client.sendText(
        message.from,
        'Olá! 💍 Bem-vindo(a) à *Verttraue – Joias em Prata 925*.\n\n' +
        'Sou o assistente virtual. Me diga com o número:\n' +
        '1️⃣ Ver produtos\n' +
        '2️⃣ Trocas e devoluções\n' +
        '3️⃣ Dúvidas frequentes\n' +
        '4️⃣ Falar com atendente'
      );
    }
  });
}
