import type { Message } from "discord.js";
import { geminiGenerate } from "../lib/gemini";

import untypedConfig from "../../config/config.json" assert { type: "json" };
import type { Config } from "../types/config.js";

const {ChannelIDLock} = untypedConfig as Config;

export async function handleMessage(message:Message){
    if(message.author.bot || !message.inGuild() || message.channelId!=ChannelIDLock){
        return;
    }
    await geminiGenerate(message)
}
