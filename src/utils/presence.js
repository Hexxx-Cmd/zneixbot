module.exports = client => {
    client.user.setPresence({
        status: 'dnd',
        game: {
            name: `${client.config.prefix}help | ${client.guilds.cache.size} servers`,
            // url: '',
            type: 'PLAYING'
        }
    });
}