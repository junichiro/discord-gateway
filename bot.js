require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
  if (msg.mentions.has(client.user)) {
    try {
      const webhookUrl = 'https://n8n.junichiro.co.uk/webhook/discord-mention';
      const payload = {
        user: msg.author.username,
        userId: msg.author.id,
        message: msg.content,
        channelId: msg.channel.id,
        guildId: msg.guild.id,
      };
      await axios.post(webhookUrl, payload);
      console.log('Webhook data sent successfully!');
    } catch (error) {
      console.error('Error sending webhook data:', error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
