module.exports = async (guild, destination, boolCreated) => {
    let time = require('../../utils/timeFormatter');
    let fetch = require('node-fetch');
    async function getIconURL(){
        if (!guild.iconURL) return null;
        let fixedIconUrl = guild.iconURL.slice(0, -3).concat('png');
        if ((await fetch(fixedIconUrl.slice(0, -4))).headers.get('content-type')=='image/gif') fixedIconUrl = fixedIconUrl.slice(0, -3).concat('gif');
        return fixedIconUrl;
    }
    let embed = {
        color: boolCreated?0x0dc61a:0xd71a42,
        timestamp: new Date(),
        footer: {
            text: guild.id,
            icon_url: await getIconURL()
        },
        author: {
            name: (boolCreated?"Joined":"Left")+" a server"
        },
        thumbnail: {
            url: await getIconURL()
        },
        fields: [
            {
                name: "Name",
                value: guild.name,
                inline: true
            },
            {
                name: "Size",
                value: guild.members.filter(m => m.user.presence.status !== "offline").size+"/"+guild.members.size+` (${guild.members.filter(m => m.user.bot).size} bots)`,
                inline: true
            },
            {
                name: "Age",
                value: `${time.msFormat(Date.now() - guild.createdTimestamp)} (since \`${time.dateFormat(guild.createdAt)}\`)`,
                inline: false
            }
        ]
    }
    console.log(`${boolCreated?"[guildCreate] joined":"[guildDelete] left"} guild '${guild.name}' | ${guild.id}`);
    if (destination) destination.send({embed:embed});
    else console.log(`[!${boolCreated?"guildCreated":"guildDeleted"}] guilds logs channel not found!`);
    return;
}