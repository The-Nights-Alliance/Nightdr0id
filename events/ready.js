module.exports = (client) => {
    client.user.setActivity(process.env.BUILD=="T"? "stable":"beta", { type: 'PLAYING' })
    client.user.setUsername('[nd.] Nightdr0id')
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
}