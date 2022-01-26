module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.webhookId) return;
    if (message.content.indexOf(client.config.prefix) !== 0) {
        client.db.points.ensure(`${message.guild.id}-${message.author.id}`, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 1
        });
        client.points.inc(key, "points");
        const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
        const channel = message.guild.channels.cache.find(c => c.name === "levelups")
        if (client.points.get(key, "level") < curLevel) {
            channel.send(`${message.author.username} leveled up to level **${curLevel}**!`);
            client.points.set(key, curLevel, "level");
        }

        if(client.chanevents.get(message.channel.name)) {
            client.chanevents.get(message.channel.name)(message)
        }
        return;
    }
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) {message.reply('That command doesnt exist'); return;}
    cmd.run(client, message, args);
};
