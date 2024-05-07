import {
    Client,
    GatewayIntentBits,
    Events,
} from "discord.js";

import untypedConfig from "../config/config.json" assert { type: "json" };
import type { Config } from "./types/config.js";

const {DiscordToken} = untypedConfig as Config;

const client = new Client({
    intents:[
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions
    ]
})

client.once(Events.ClientReady,()=>{
    console.log("Connected to Discord!")
})

import { handleMessage } from "./handlers/message.js"
client.on(Events.MessageCreate, (message)=>{
    if(!message.author.bot){
        (async () =>{
            try{
                await message.react("✅")
                await handleMessage(message)
            }catch(err){
                console.error(err)
                try{
                    await message.react("❌")
                }
                catch(err){
                    console.error("Failed to alert user to error")
                }
            }
        })
    }
})

client.on(Events.Error, (error) => {console.error(error)});
client.on(Events.Warn, (warning) => {console.warn(warning)});

client.on(Events.Invalidated, () => {
    console.log("Session Invalidated - Stopping Client");
    async () => {await client.destroy()};
    process.exit(1);
});

await client.login(DiscordToken);