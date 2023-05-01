// Similar to Embed, but this is a ErrorEmbed or EEmbed
//
// This is a class that extends the Discord.EmbedBuilder class

const { EmbedBuilder } = require("discord.js")

module.exports = class extends EmbedBuilder {
    constructor({image}) {
        super()

        this.setColor("#FF0000")
        this.setTitle("Error!")
        this.setDescription("Something went wrong! Please try again later!")
        this.setThumbnail(image)
    }
}