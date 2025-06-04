import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

serve(async (req) => {
  const { jobTitle, companyName, existingDescription } = await req.json();

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OpenAI API key not found");
    }

    const prompt = `Generate a professional project description for a resume with at least 6 bullet points.
    Job Title: ${jobTitle}
    Company: ${companyName}
    ${existingDescription ? `Current description: ${existingDescription}` : ""}
    
    Create at least 6 detailed bullet points that describe key responsibilities, achievements, and impact. Each bullet point should start with a strong action verb and quantify results where possible. Format as bullet points with • symbol.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const description = data.choices[0].message.content.trim();

    return new Response(JSON.stringify({ description }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
