const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  AttachmentBuilder,
} = require("discord.js");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("specialreport")
    .setDescription("Post a special report alert")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The special report message to post")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const message = interaction.options.getString("message");

    try {
      const imagePath = path.join(__dirname, "..", "assets", "specialreport.png");

      const attachment = new AttachmentBuilder(imagePath);

      await interaction.reply({
        content: `SPECIAL REPORT\n@everyone\n\n${message}`,
        files: [attachment],
      });
    } catch (error) {
      console.error("Error posting special report:", error);
      await interaction.reply({
        content:
          "Error posting special report. Make sure specialreport.png exists in the assets folder.",
        ephemeral: true,
      });
    }
  },
};
