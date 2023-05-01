const { EmbedBuilder } = require("discord.js")

module.exports = class extends EmbedBuilder {
    constructor({author, footer, date, color, image}, ...etc) {
        super(etc)

        const Author = author || "Arcanos"
        const Footer = footer || "Arcanos © 2022"
        const Color = color || "#5865F2"
        const Image = image || null

        this.setAuthor({name:Author, iconURL: Image})
        this.setFooter({text:Footer, iconURL: Image})
        this.setColor(Color)
    }
}