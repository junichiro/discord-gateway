# discord-gateway

This repository contains a Discord bot that listens for mentions and sends data to a webhook.

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install discord.js axios dotenv
    ```
2.  **Create .env file:** Create a `.env` file in the root directory and add your Discord bot token:
    ```
    DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
    ```
3.  **Run the bot:**  You can specify the environment using the `NODE_ENV` environment variable.  `NODE_ENV=test node bot.js` will run in test mode, and `NODE_ENV=production node bot.js` will run in production mode.  The default is test mode.
    ```bash
    node bot.js
    ```

## Functionality

The bot listens for mentions and, upon detection, sends a POST request to the following webhook URL:

`https://n8n.junichiro.co.uk/webhook/discord-mention`

The payload includes:

*   `user`: The username of the user who mentioned the bot.
*   `userId`: The user ID of the user who mentioned the bot.
*   `message`: The content of the message.
*   `channelId`: The ID of the channel where the mention occurred.
*   `guildId`: The ID of the server where the mention occurred.
