import { GoogleGenerativeAI } from "@google/generative-ai";
import untypedConfig from "../../config/config.json" assert { type: "json" };
import type { Config } from "../types/config.js";
import type { Message } from "discord.js";

const {GeminiKey, Prompt} = untypedConfig as Config;

const gemini = new GoogleGenerativeAI(GeminiKey).getGenerativeModel({model:"gemini-pro"});

export async function geminiGenerate(message:Message){
    const geminiInput = `${Prompt} User ${message.author.displayName} says: ${message.content}`
    await gemini.generateContent(geminiInput).then(async (output)=>{
        await message.reply({content:output.response.text()})
    }).catch(async (err)=>{
        console.error(err)
        await message.reply({content:`Sorry, I had an issue! \`\`\`${err}\`\`\``})
    })
}