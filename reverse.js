"use strict";

const Eris = require("eris"),
      bot = new Eris("ADDYOURBOTTOKEN", {disableEvents: {
        CHANNEL_CREATE: true,
        CHANNEL_DELETE: true,
        CHANNEL_UPDATE: true,
        GUILD_BAN_ADD: true,
        GUILD_BAN_REMOVE: true,
        GUILD_DELETE: true,
        GUILD_MEMBER_ADD: true,
        GUILD_MEMBER_REMOVE: true,
        GUILD_MEMBER_UPDATE: true,
        GUILD_ROLE_CREATE: true,
        GUILD_ROLE_DELETE: true,
        GUILD_ROLE_UPDATE: true,
        GUILD_UPDATE: true,
        MESSAGE_CREATE: false,
        MESSAGE_DELETE: true,
        MESSAGE_DELETE_BULK: true,
        MESSAGE_UPDATE: true,
        TYPING_START: true,
        VOICE_STATE_UPDATE: true
      }});

bot.on("ready", async() => {
    console.log("reverse image thingy online");
});

// import stuff
const { Client } = require("eris");

// pass these options in your client constructor
const client = new Client({
  http: {
    api: "https://discord.com/api"
  }
});
bot.on("messageCreate", async msg => {
    if (msg.content.startsWith("!search")) {
        let url = msg.attachments.length === 1 ? msg.attachments[0].url : msg.content.split(" ")[1];
        if (!url) return msg.channel.createMessage({ embed: {
            title: "Reverse image search",
            description: "You must, either:\n- upload an image attachment in the same message as `!search`\n- `!search <url>`"
        }});
        url = encodeURIComponent(url);
        msg.channel.createMessage({embed: {
            title: "Result are here!",
            description: "Click any of the individual search engine names to see the search results!\n\n- [Yandex](https://yandex.com/images/search?url="+url+"&rpt=imageview)\n- [Google](https://www.google.com/searchbyimage?&image_url="+url+")\n- [TinEye](https://www.tineye.com/search?url="+url+")\n- [Bing](https://www.bing.com/images/search?view=detailv2&iss=sbi&q=imgurl:"+url+")\n- [IQDB NOTE search often contains nudity](https://iqdb.org/?url="+url+")\n"
        }});
    }
});

bot.connect();
