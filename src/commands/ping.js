const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['p'],

    async execute({message, client, database}, ...args) {
        // Reply the message with client's ping and database's ping
        message.reply(`Client: **${client.ws.ping}ms**\nDatabase: **${await database.ping()}ms**`)
    },
}