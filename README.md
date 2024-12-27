# Group Shield Telegram Bot  
Group Shield is an open-source, serverless group member verification bot that helps you verify users reliably, quickly, and conveniently.

**Example Bot**: [@GroupShieldTGBot](https://t.me/GroupShieldTGBot)

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot-cf-worker/refs/heads/main/other/image.jpg)
![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot-cf-worker/refs/heads/main/other/image2.jpg)

---

## Deployment Guide

Note: Before use, please rename example-wrangler.toml to wrangler.toml.

### Step 1: Create Your Telegram Bot  
1. Go to **@BotFather** on Telegram and use the `/newbot` command to create your bot.  
2. Follow the prompts to provide the required information.  
3. Once created, **@BotFather** will send you the bot's token. This token is essential for deployment—save it for later use.  

### Step 2: Learn to Deploy Cloudflare Workers  
1. Refer to the [Cloudflare Workers Deployment Guide](https://developers.cloudflare.com/workers/get-started/guide/).  
2. Download the bot's source code.  
3. Run `npm run deploy` locally to deploy your worker.
4. In the Cloudflare Workers dashboard, configure KV. The bot relies on Cloudflare KV, so the correct mappings must be set up.
5. In the Cloudflare Workers dashboard, configure the automatic scheduling to run every minute. The bot's automatic checks depend on this scheduling, so it must be configured.

### Step 3: Configure Required Environment Variables  
To run the bot successfully, two environment variables must be set:  
- **BOT_TOKEN**  
- **BOT_SECRET_TOKEN**
- **BOT_USERNAME**
- **LANGUAGE_CODE**
- **VERIFICATION_EXPIRATION_SECONDS**
- **RE_JOIN_SECONDS**

Refer to the Cloudflare Workers documentation for [adding environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard).  

#### Details:  
1. **BOT_TOKEN**: Copy and paste the token received from **@BotFather** into this variable.  
2. **BOT_SECRET_TOKEN**: This is a value you define yourself. It must meet the following criteria:  
   - 1-256 characters in length.  
   - Allowed characters: `A-Z`, `a-z`, `0-9`, `_`, and `-`.  
   - This ensures the bot's security. 
3. **BOT_USERNAME**: Enter your bot username without the @
4. **LANGUAGE_CODE**: With ChatGPT’s automatic translation, the currently supported languages are English (en), Spanish (es), Russian (ru), Chinese (zh), and French (fr). The default is set to en.
5. **VERIFICATION_EXPIRATION_SECONDS**: The verification waiting time after a user joins the group is 120 seconds by default. If verification is not completed within 120 seconds, the bot will automatically remove the user.
6. **RE_JOIN_SECONDS**: The time before a removed user can rejoin is set to 120 seconds by default.

### Step 4: Set the Webhook URL  
Access the following API endpoint in your browser to configure the webhook URL:  

```
https://api.telegram.org/bot<token>/setWebhook?url=<url>&secret_token=<BOT_SECRET_TOKEN>&allowed_updates=["update_id","message","edited_message","channel_post","edited_channel_post","inline_query","chosen_inline_result","callback_query","shipping_query","pre_checkout_query","poll","poll_answer","my_chat_member","chat_member","chat_join_request"]
```

**Replace the placeholders `<token>`, `<url>`, and `<BOT_SECRET_TOKEN>` with your actual values:**  
- `<token>`: Your bot's token from **@BotFather**.  
- `<url>`: The URL provided by Cloudflare after deploying your worker.  
- `<BOT_SECRET_TOKEN>`: The value you defined in Step 3, ensuring it matches exactly.