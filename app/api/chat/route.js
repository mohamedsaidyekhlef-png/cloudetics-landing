export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": Bearer ,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    return new Response(JSON.stringify({ reply: data.choices?.[0]?.message?.content || "" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ reply: "Error: " + err.message }), { status: 500 });
  }
}