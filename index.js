const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { JavaServer } = require('mcstatus');
require('dotenv').config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// আপনার সঠিক IP এবং Port এখানে দেওয়া হলো
const SERVER_HOST = "bangladeshsmp.progamer.me";
const SERVER_PORT = 35216;

client.on('ready', () => {
    console.log(`✅ ${client.user.tag} হিসেবে লগ-ইন করা হয়েছে!`);
});

client.on('messageCreate', async (message) => {
    // !status কমান্ড চেক করা হচ্ছে
    if (message.content === '!status') {
        try {
            // সার্ভার লুকআপ (Host এবং Port সহ)
            const server = JavaServer.lookup(SERVER_HOST, SERVER_PORT);
            const status = await server.status();
            
            const embed = new EmbedBuilder()
                .setTitle('🎮 Minecraft Server Status')
                .setThumbnail('https://api.mcstatus.io/v2/icon/' + SERVER_HOST) // সার্ভার আইকন দেখাবে
                .setColor('#2ECC71')
                .addFields(
                    { name: 'সার্ভার স্ট্যাটাস', value: '✅ Online', inline: true },
                    { name: 'প্লেয়ার সংখ্যা', value: `👥 ${status.players.online}/${status.players.max}`, inline: true },
                    { name: 'আইপি এড্রেস', value: `\`${SERVER_HOST}:${SERVER_PORT}\`` },
                    { name: 'ভার্সন', value: status.version.name || "N/A", inline: true },
                    { name: 'পিং (Latency)', value: `${Math.round(status.latency)}ms`, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: 'Bangladesh SMP Bot' });

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply("❌ সার্ভারটি বর্তমানে অফলাইন আছে অথবা আইপি কানেক্ট করা যাচ্ছে না!");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
