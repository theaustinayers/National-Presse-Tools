# Breaking News Discord Bot

A Discord bot providing admin tools for posting breaking news alerts and special reports with automatic emoji reaction-based message deletion.

## Features

- **Breaking News Command** (`/breaking`) - Post breaking news with an image alert
- **Special Report Command** (`/specialreport`) - Post special report with an image alert
- **Auto-delete on Reactions** - Delete messages when they receive 5+ recycling bin emoji reactions

## Setup

### Prerequisites
- Node.js 16.9.0 or higher
- A Discord bot token
- Admin permissions in your Discord server

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your bot credentials:
```
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
```

3. Add the following images to the `assets/` folder:
   - `breaking.png` - Image for breaking news alerts
   - `specialreport.png` - Image for special report alerts

### Running the Bot

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

## Commands

### /breaking
Prompts the user to enter a message. Posts the breaking news image, "BREAKING NEWS ALERT", @everyone mention, and the message.

### /specialreport
Prompts the user to enter a message. Posts the special report image, "SPECIAL REPORT", @everyone mention, and the message.

## Features

### Auto-delete on Reactions
When a message receives 5 or more recycling bin (♻️) emoji reactions, the message is automatically deleted.

## Configuration

Edit the following in `src/index.js` to customize:
- Emoji reaction threshold (currently 5)
- Reaction emoji type (currently ♻️)
- Message content and formatting
