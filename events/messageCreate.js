module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.webhookId) return;
    if (message.content.indexOf(client.config.prefix) !== 0) {
       const key = `${message.guild.id}-${message.author.id}`
         client.db.points.ensure(key, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 1
        });
        client.db.points.inc(key, "points", 500);
        const curLevel = Math.floor(0.1 * Math.sqrt(client.db.points.get(key, "points")));
        const channel = message.guild.channels.cache.find(c => c.name === "levelups")
        if (client.db.points.get(key, "level") < curLevel) {
            channel.send(`${message.author.username} leveled up to level **${curLevel}**!`);
            client.db.points.set(key, curLevel, "level");
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
