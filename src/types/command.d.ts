import type {
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    SlashCommandOptionsOnlyBuilder,
} from "discord.js";

//import type { Button } from "./button.js";

export interface Command {
    data: SlashCommandOptionsOnlyBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
//    buttons?: Button[];
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
}