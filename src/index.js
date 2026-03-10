const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
});

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) =>
  file.endsWith(".js")
);

// Load commands
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  }
}

// Register slash commands
client.once("ready", async () => {
  try {
    console.log(`Logged in as ${client.user.tag}`);

    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
      body: commands,
    });

    console.log("Slash commands registered successfully");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
});

// Handle slash command interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commandFile = path.join(commandsPath, `${interaction.commandName}.js`);

  try {
    const command = require(commandFile);
    await command.execute(interaction);
  } catch (error) {
    console.error("Error executing command:", error);
    await interaction.reply({
      content: "There was an error executing this command!",
      ephemeral: true,
    });
  }
});

// Handle message reactions
client.on("messageReactionAdd", async (reaction, user) => {
  try {
    // Ignore if reaction is from the bot itself
    if (user.id === client.user.id) return;

    // Check if reaction is recycling bin emoji
    if (reaction.emoji.name !== "♻️" && reaction.emoji.name !== "recycle") return;

    // Fetch the full reaction to get accurate count
    const reaction_data = await reaction.message.reactions.resolve(reaction.emoji);
    if (!reaction_data) return;

    const count = reaction_data.count;

    // Delete if 5 or more reactions
    if (count >= 5) {
      await reaction.message.delete();
      console.log(`Message deleted - reached ${count} recycling bin reactions`);
    }
  } catch (error) {
    console.error("Error handling reaction:", error);
  }
});

client.login(process.env.DISCORD_TOKEN);
