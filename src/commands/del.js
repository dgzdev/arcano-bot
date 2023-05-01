const Discord = require('discord.js');
const Embed = require("../build/Embed")
const EEmbed = require("../build/EEmbed")

module.exports = {
    name: 'delete',
    description: 'Delete messages!',
    aliases: ['del'],

    async execute({message, client, database, args}, ...etc) {
        // If the user doesn't have the MANAGE_MESSAGES permission, return
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return

        // If the user doesn't provide a number, return
        if (!args[0]) return

        // If the number is not a number, return
        if (isNaN(args[0])) return

        // If the number is less than 1, return
        if (args[0] < 1) return

        // If the number is greater than 100, return
        if (args[0] > 100) return

        // Delete the messages
        message.channel.bulkDelete(args[0])
            .catch(err => {
                // If the bot can't delete the messages, messages are older than 14 days or the messages are pinned, return
                const ErrorEmbed = new EEmbed({
                    image: null,
                })

                ErrorEmbed.setDescription(`I can't delete messages older than 14 days or messages that are pinned!`)

                if (err) return message.channel.send({
                    content: `${message.author}`,
                    embeds: [ErrorEmbed]
                })
            })
            .then(() => {
                const MyEmbed = new Embed({
                    image: message.guild.iconURL(),
                })

                MyEmbed.setTitle("Channel Bulk Delete")
                MyEmbed.setDescription(`Channel bulk delete is a feature that allows you to delete multiple messages at once. This feature is useful for cleaning up channels that have a lot of messages.`)
                MyEmbed.addFields(
                    {
                        name: "Messages Deleted",
                        value: `\`${args[0]}\``,
                        inline: true
                    },
                    {
                        name: "Channel",
                        value: message.channel.toString(),
                        inline: true
                    },
                    {
                        name: "Author",
                        value: message.author.toString(),
                        inline: true
                    }
                )
                // If the bot deleted the messages, reply the message with the number of deleted messages
                message.channel.send({
                    content: `${message.author}`,
                    embeds:[MyEmbed]
                })
            })
    }
}
