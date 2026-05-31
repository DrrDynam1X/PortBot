require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
  partials: ["CHANNEL"],
});

client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

app.post("/hire", async (req, res) => {
  const { name, contact, message } = req.body;

  try {
    const user = await client.users.fetch(process.env.YOUR_DISCORD_ID);

    await user.send(
      `📩 New Hire Request\n\n👤 Name: ${name}\n📞 Contact: ${contact}\n💬 Message: ${message}`
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

client.login(process.env.DISCORD_TOKEN);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});