export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 });
    }

    const origin =
      req.headers.get('origin') ||
      req.headers.get('referer') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000';

    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': Bearer ,
        'Content-Type': 'application/json',
        'HTTP-Referer': origin,
        'X-Title': 'Cloudetics'
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: [
          { role: 'system', content: 'You are Agro 2.0, a helpful cloud refactoring assistant for Cloudetics.' },
          { role: 'user', content: prompt }
        ],
        stream: false
      })
    });

    const data = await r.json();
    if (!r.ok) {
      return new Response(JSON.stringify({ error: data?.error?.message || 'Upstream error' }), { status: r.status });
    }

    const reply = data?.choices?.[0]?.message?.content ?? 'No response';
    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message || 'Server error' }), { status: 500 });
  }
}
