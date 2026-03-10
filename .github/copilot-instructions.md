# Discord Bot Setup Instructions

## Project Overview
Breaking News Discord Bot - Provides admin tools for posting breaking news and special reports with emoji reaction-based auto-deletion.

## Setup Checklist

- [x] Project structure created
- [x] Dependencies configured in package.json
- [x] Main bot file created (src/index.js)
- [x] Slash commands created (breaking.js, specialreport.js)
- [x] README.md documentation complete
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Bot images added to assets folder
- [ ] Bot token registered with Discord
- [ ] Ready to deploy

## Next Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Discord bot token to DISCORD_TOKEN
   - Add your bot's client ID to CLIENT_ID
   - Add your server/guild ID to GUILD_ID

3. **Add Bot Images**
   - Place `breaking.png` in the `assets/` folder
   - Place `specialreport.png` in the `assets/` folder

4. **Register Bot with Discord**
   - Create a bot at https://discord.com/developers/applications
   - Set up slash commands OAuth2 scope
   - Invite to your server with appropriate permissions

5. **Run the Bot**
   - Development: `npm run dev`
   - Production: `npm start`

## Features

✅ /breaking - Post breaking news with image  
✅ /specialreport - Post special report with image  
✅ Auto-delete messages with 5+ recycling bin reactions
