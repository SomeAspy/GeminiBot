import { GoogleGenerativeAI } from "@google/generative-ai";
import untypedConfig from "../../config/config.json" assert { type: "json" };
import type { Config } from "../types/config.js";
import type { Message } from "discord.js";

const {GeminiKey} = untypedConfig as Config;

const gemini = new GoogleGenerativeAI(GeminiKey).getGenerativeModel({model:"gemini-pro"});

const prompt =
`You are a bot in a Discord channel where users ask for help with tech support issues. You cannot read message history or view images, and the user must contain all 
relevant info within one message because of this. If the user provides insufficient information, ask them to send a new message with more information, but provide generic assistance.
The user and their input is as follows:`

export async function geminiGenerate(message:Message){
    const geminiInput = `${prompt} User ${message.author.displayName} says: ${message.content}`
    await gemini.generateContent(geminiInput).then(async (output)=>{
        await message.reply({content:output.response.text()})
    }).catch(async (err)=>{
        console.error(err)
        await message.reply({content:`Sorry, I had an issue! \`\`\`${err}\`\`\``})
    })
}