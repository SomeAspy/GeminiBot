import { GoogleGenerativeAI } from "@google/generative-ai";
import untypedConfig from "../../config/config.json" assert { type: "json" };
import type { Config } from "../types/config.js";
import type { Message } from "discord.js";

const {GeminiKey} = untypedConfig as Config;


const gemini = new GoogleGenerativeAI(GeminiKey).getGenerativeModel({model:"gemini-pro"});

const prompt = "Your goal is to help users with tech issues from within Discord channel. When not supplied enough info, ask the user for more as needed. Use Discord flavored markdown when possible. You should try to include links to support articles when it would benefit the user. The user's input is as follows: "

export async function geminiGenerate(message:Message){
    const geminiInput = `${prompt} User ${message.author.displayName} says: ${message.content}`
    await gemini.generateContent(geminiInput).then(async (output)=>{
        await message.reply({content:output.response.text()})
    }).catch(async (err)=>{
        await message.reply({content:`Sorry, I had an issue! \`\`\`${err}\`\`\``})
    })
}