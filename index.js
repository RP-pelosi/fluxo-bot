const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const axios = require('axios');

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = '1508109291528261693';

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

let statusMessage;

async function atualizarStatus() {
    try {
        const response = await axios.get(
            'https://servers-frontend.fivem.net/api/servers/single/djoq65'
        );

        const data = response.data.Data;

        const embed = new EmbedBuilder()
            .setTitle('🔥 Fluxo Roleplay')
            .setDescription('**Status da cidade atualizado automaticamente**')
            .addFields(
                {
                    name: '🟢 Status',
                    value: '`ONLINE`',
                    inline: true
                },
                {
                    name: '👥 Jogadores',
                    value: `\`${data.clients}/${data.sv_maxclients}\``,
                    inline: true
                },
                {
                    name: '🔗 IP FiveM',
                    value: '`connect fluxoroleplay.com`'
                }
            )
            .setThumbnail('https://cdn.discordapp.com/icons/927368127229079683/a_8de615ec3cb9ac7c1f72820718e9b655.gif?size=512')
            .setFooter({
                text: 'Atualiza a cada 1 minuto'
            })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('🎮 Conectar')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://cfx.re/join/djoq65'),

                new ButtonBuilder()
                    .setLabel('💜 Discord Fluxo')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.gg/fluxorp')
            );

        await statusMessage.edit({
            embeds: [embed],
            components: [row]
        });

        console.log('Atualizado!');
    } catch (error) {
        console.log('Erro:', error.message);
    }
}

client.once('ready', async () => {
    console.log('Bot online!');

    const channel = await client.channels.fetch(CHANNEL_ID);

    statusMessage = await channel.send({
        content: '🔄 Carregando status da Fluxo...'
    });

    atualizarStatus();

    setInterval(atualizarStatus, 60000);
});

client.login(TOKEN);
