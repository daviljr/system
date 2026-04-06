import OpenAI from "openai";

async function test() {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: "Responda apenas: conexão OK",
        },
      ],
    });

    console.log("\nRESPOSTA DA IA:");
    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error("\nERRO:");
    console.error(err);
  }
}

test();
