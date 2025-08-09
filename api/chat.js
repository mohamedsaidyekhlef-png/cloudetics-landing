module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': Bearer ,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
    const reply = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ||
                  (data && data.error && data.error.message) || 'No response';
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
};
