import type { Message } from "discord.js";
import { geminiGenerate } from "../lib/gemini";

import untypedConfig from "../../config/config.json" assert { type: "json" };
import type { Config } from "../types/config.js";

const {ChannelID} = untypedConfig as Config;

export async function handleMessage(message:Message){
    if(!message.inGuild() || message.channelId!=ChannelID){
        return;
    }
    await geminiGenerate(message)
}
