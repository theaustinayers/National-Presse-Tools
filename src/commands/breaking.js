const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  AttachmentBuilder,
} = require("discord.js");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("breaking")
    .setDescription("Post a breaking news alert")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The breaking news message to post")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const message = interaction.options.getString("message");

    try {
      const imagePath = path.join(__dirname, "..", "assets", "breaking.png");

      const attachment = new AttachmentBuilder(imagePath);

      await interaction.reply({
        content: `BREAKING NEWS ALERT\n@everyone\n\n${message}`,
        files: [attachment],
      });
    } catch (error) {
      console.error("Error posting breaking news:", error);
      await interaction.reply({
        content:
          "Error posting breaking news. Make sure breaking.png exists in the assets folder.",
        ephemeral: true,
      });
    }
  },
};
