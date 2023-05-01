const Discord = require("discord.js")
const { Client, EmbedBuilder } = require("discord.js")
const Config = require("./src/config/main.js")
const fs = require("fs")

// Initialize the Firebase
const Firebase = require("firebase-util.js")
const Database = new Firebase({
    apiKey: "*********",
    databaseURL: "*********"
})

// Initialize the dotenv
require("dotenv").config()

const client = new Client({
    intents:[32767, Discord.IntentsBitField.Flags.MessageContent]
})

// Client Commands
const Commands = []

// Client Events
const Events = []

client.on("ready", () => {
    // Logs the bot in the console
    console.log(`Logged in as ${client.user.tag}!`)

    // Sets the bot's status
    client.user.setPresence({
        activities: [{
            name: "Arcanos",
            type: "WATCHING"
        }],
        status: "idle"
    })

    // Display the bot's number of users
    console.log(`Listening to ${client.users.cache.size} users!`)

    // Show the ping of database
    Database.ping().then(ping => {
        console.log(`Database ping: ${ping}ms`)
    })

    // Load the commands
    fs.readdirSync("./src/commands").forEach(file => {
        if (!file.endsWith(".js")) return

        const command = require(`./src/commands/${file}`)
        Commands.push(command)
    })

    // Load the events
    fs.readdirSync("./src/events").forEach(file => {
        if (!file.endsWith(".js")) return

        const event = require(`./src/events/${file}`)
        Events.push(event)
    })

    // Show the number of commands
    console.log(`Loaded ${Commands.length} commands!`)
})

client.on("messageCreate", async message => {
    // If the message is from a bot, return
    if (message.author.bot) return

    // If the message is not from a guild, return
    if (!message.guild) return

    // If the message doesn't start with the prefix, return
    if (!message.content.startsWith(Config.prefix)) return

    // If the message is a command, execute it
    const Command = message.content.split(" ")[0].slice(Config.prefix.length).toLowerCase()
    const Args = message.content.split(" ").slice(1)

    Commands.find(command => command.name === Command || command.aliases.includes(Command))
        .execute({
            client,
            message,
            args: Args,
            config: Config,
            database: Database
        })
})

client.login(process.env.TOKEN)
