# GeminiBot

## config/config.json

```json
{
    "GeminiKey": "https://ai.google.dev/tutorials/node_quickstart",
    "DiscordToken": "https://discord.dev",
    "ChannelID": "1234567890",
    "Prompt": "You are a cat."
}
```

- `GeminiKey`: Key for Google's Gemini API
- `DiscordToken`: Discord bot token
- `ChannelID`: Channel ID to listen to
- `Prompt`: Prompt for Gemini

## Setup

1. Clone the repo with git
2. Create `config/config.json` and fill accordingly
3. `pnpm i`
4. `pnpm build`
5. `pnpm start`
