"use client";
import { useState } from "react";

export default function Home() {
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  async function handleChat() {
    if (!chatInput.trim()) return;
    setChatResponse("Thinking...");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: chatInput })
      });
      const data = await res.json();
      setChatResponse(data.reply || "No response from Agro 2.0.");
    } catch (err) {
      setChatResponse("Error contacting Agro 2.0.");
    }
  }

  return (
    <main>
      <section className="hero">
        <div className="logo">
          <div className="logo-row">
            <img src="/hourglass.svg" alt="hourglass" className="hourglass" />
            <h1 className="animated-logo">Cloudetics</h1>
          </div>
        </div>
        <div className="heading-rotation">
          <div className="fade-heading active">Rebuilding the Cloud Intelligently</div>
          <div className="fade-heading">Cost-Efficient Infrastructure with AI</div>
          <div className="fade-heading">Meet Agro 2.0 – Our Cloud Refactoring Brain</div>
        </div>
        <p className="subtext">We're working on something revolutionary.</p>
        <button className="cta-button" onClick={() => document.getElementById("notify")?.scrollIntoView({ behavior: "smooth" })}>Notify Me</button>
      </section>

      <section id="notify" className="notify-section">
        <h2>Be the First to Know</h2>
        <p>Sign up to receive early updates and a special invite when we launch.</p>
        <form className="notify-form validate" action="https://cloudetics.us9.list-manage.com/subscribe/post?u=f74d1830f0a40037b752aaeb3&amp;id=65e37c0ed3&amp;f_id=003553e1f0" method="POST" target="_blank" noValidate>
          <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
            <input type="text" name="b_f74d1830f0a40037b752aaeb3_65e37c0ed3" tabIndex={-1} defaultValue="" />
          </div>
          <input type="email" name="EMAIL" placeholder="Your email address" required />
          <input type="text" name="FNAME" placeholder="First name" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <section className="notify-section">
        <h2>Talk to Agro 2.0</h2>
        <p>Ask me anything about cloud, AI, or our launch!</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <input
            type="text"
            placeholder="Ask Agro..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "white" }}
          />
          <button onClick={handleChat} style={{ padding: "10px 16px", borderRadius: "8px", background: "var(--gradient)", border: "none", color: "white", fontWeight: 700, cursor: "pointer" }}>Ask</button>
        </div>
        <div style={{ marginTop: "15px", textAlign: "left", color: "var(--muted)", fontSize: "15px" }}>{chatResponse}</div>
      </section>
    </main>
  );
}
