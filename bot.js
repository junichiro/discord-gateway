require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

function parseDiscordMessage(content) {
  const mentionPattern = /<[@#][!&]?(\d+)>|@everyone|@here/g;
  const mentions = [];
  const mentionIds = [];
  
  let match;
  let processedContent = content;
  
  while ((match = mentionPattern.exec(content)) !== null) {
      mentions.push(match[0]);
      if (match[1]) mentionIds.push(match[1]);
  }
  
  const message = content.replace(mentionPattern, '').trim();
  
  return {
      mentions,
      mentionIds,
      message
  };
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
  if (msg.mentions.has(client.user)) {
    try {
      const webhookUrl = process.env.NODE_ENV === 'test'
        ? 'https://n8n.junichiro.co.uk/webhook-test/discord-mention'
        : 'https://n8n.junichiro.co.uk/webhook/discord-mention';
      const parsedMessage = parseDiscordMessage(msg.content);
      const payload = {
        user: msg.author.username,
        userId: msg.author.id,
        messageId: msg.id,
        rawMessage: msg.content,
        message: parsedMessage.message,
        mentions: parsedMessage.mentions,
        mentionIds: parsedMessage.mentionIds,
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
