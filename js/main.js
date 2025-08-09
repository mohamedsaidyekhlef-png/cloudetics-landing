// Rotating headings
const headings = document.querySelectorAll('.fade-heading');
let idx = 0;
setInterval(() => {
  headings[idx].classList.remove('active');
  idx = (idx + 1) % headings.length;
  headings[idx].classList.add('active');
}, 3500);

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Chat
const chatBtn = document.getElementById('chatBtn');
if (chatBtn) {
  chatBtn.addEventListener('click', async () => {
    const input = document.getElementById('chatInput');
    const responseBox = document.getElementById('chatResponse');
    const query = (input.value || '').trim();
    if (!query) return;
    responseBox.textContent = 'Thinking...';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query })
      });
      const data = await res.json();
      responseBox.textContent = data.reply || 'No response from Agro 2.0.';
    } catch {
      responseBox.textContent = 'Error contacting Agro 2.0.';
    }
  });
}
