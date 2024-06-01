import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "cadbury bournvita bournvita biscuits 41.85g complete nutrition information" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();