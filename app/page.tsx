""use client"";
import { useEffect, useRef, useState } from "react";

function Hourglass() {
  return (
    <svg viewBox=""0 0 64 64"" className=""hourglass"" aria-hidden=""true"">
      <path d=""M16 8h32c0 12-11 18-16 24 5 6 16 12 16 24H16c0-12 11-18 16-24-5-6-16-12-16-24Z""
            fill=""none"" stroke=""url(#g)"" strokeWidth=""2.5"" strokeLinejoin=""round""/>
      <path d=""M20 14h24l-12 8-12-8Z"" fill=""#facc15"">
        <animate attributeName=""d"" dur=""3s"" repeatCount=""indefinite""
                 values=""M20 14h24l-12 8-12-8Z; M20 14h24l-12 3-12-3Z; M20 14h24l-12 8-12-8Z"" />
        <animate attributeName=""opacity"" dur=""3s"" repeatCount=""indefinite"" values=""1;.4;1""/>
      </path>
      <rect x=""31"" y=""28"" width=""2"" height=""10"" fill=""#facc15"">
        <animate attributeName=""height"" dur=""3s"" repeatCount=""indefinite"" values=""12;2;12""/>
        <animate attributeName=""y"" dur=""3s"" repeatCount=""indefinite"" values=""26;34;26""/>
      </rect>
      <path d=""M20 50l12-8 12 8H20Z"" fill=""#facc15"">
        <animate attributeName=""d"" dur=""3s"" repeatCount=""indefinite""
                 values=""M20 50l12-8 12 8H20Z; M20 50l12-3 12 3H20Z; M20 50l12-8 12 8H20Z"" />
        <animate attributeName=""opacity"" dur=""3s"" repeatCount=""indefinite"" values="".4;1;.4""/>
      </path>
      <defs>
        <linearGradient id=""g"" x1=""16"" x2=""48"">
          <stop offset=""0%"" stopColor=""#4b6cb7""/><stop offset=""100%"" stopColor=""#6a11cb""/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Home() {
  const headingsRef = useRef<NodeListOf<Element> | null>(null);
  const [prompt, setPrompt] = useState("""");
  const [reply, setReply] = useState<string>(""");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const headings = document.querySelectorAll(".fade-heading");
    headingsRef.current = headings;
    let idx = 0;
    const interval = setInterval(() => {
      if (!headingsRef.current?.length) return;
      headingsRef.current[idx].classList.remove("active");
      idx = (idx + 1) % headingsRef.current.length;
      headingsRef.current[idx].classList.add("active");
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const year = new Date().getFullYear();

  async function askAgro() {
    if (!prompt.trim() || loading) return;
    setLoading(true); setReply(""Thinking..."");
    try {
      const res = await fetch(""/api/chat"", {
        method: ""POST"",
        headers: { ""Content-Type"": ""application/json"" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setReply(data.reply || data.error || ""No response from Agro 2.0."");
    } catch { setReply(""Error contacting Agro 2.0.""); }
    finally { setLoading(false); }
  }

  return (
    <main>
      {/* HERO */}
      <section className=""hero"">
        <div className=""logo"">
          <div className=""logo-row"">
            <Hourglass />
            <h1 className=""animated-logo"">Cloudetics</h1>
          </div>
        </div>

        <div className=""heading-rotation"">
          <div className=""fade-heading active"">Rebuilding the Cloud Intelligently</div>
          <div className=""fade-heading"">Cost-Efficient Infrastructure with AI</div>
          <div className=""fade-heading"">Meet Agro 2.0 – Our Cloud Refactoring Brain</div>
        </div>

        <p className=""subtext"">We're working on something revolutionary.</p>
        <button className=""cta-button"" onClick={() => document.getElementById(""notify"")?.scrollIntoView({behavior:""smooth""})}>
          Notify Me
        </button>
      </section>

      {/* NOTIFY SECTION (MAILCHIMP) */}
      <section id=""notify"" className=""notify-section"">
        <h2>Be the First to Know</h2>
        <p>Sign up to receive early updates and a special invite when we launch.</p>
        <form className=""notify-form validate""
              action=""https://cloudetics.us9.list-manage.com/subscribe/post?u=f74d1830f0a40037b752aaeb3&amp;id=65e37c0ed3&amp;f_id=003553e1f0""
              method=""POST"" target=""_blank"" noValidate>
          <div aria-hidden=""true"" style={{ position: ""absolute"", left: ""-5000px"" }}>
            <input type=""text"" name=""b_f74d1830f0a40037b752aaeb3_65e37c0ed3"" tabIndex={-1} defaultValue="""" />
          </div>
          <input type=""email"" name=""EMAIL"" placeholder=""Your email address"" required />
          <input type=""text"" name=""FNAME"" placeholder=""First name"" />
          <button type=""submit"">Subscribe</button>
        </form>
      </section>

      {/* CHATBOT */}
      <section className=""notify-section"">
        <h2>Talk to Agro 2.0</h2>
        <p>Ask me anything about cloud, AI, or our launch!</p>
        <div style={{ display: ""flex"", gap: 10, marginTop: 15 }}>
          <input type=""text"" placeholder=""Ask Agro...""
                 style={{ flex:1,padding:10,borderRadius:8,border:""1px solid rgba(255,255,255,0.1)"",background:""rgba(255,255,255,0.06)"",color:""white"" }}
                 value={prompt} onChange={(e)=>setPrompt(e.target.value)}
                 onKeyDown={(e)=>{ if(e.key===""Enter""){ e.preventDefault(); askAgro(); }}}/>
          <button onClick={askAgro} disabled={loading}
                  style={{ padding:""10px 16px"",borderRadius:8,background:""var(--gradient)"",border:""none"",color:""white"",fontWeight:700,cursor:loading?""not-allowed"":""pointer"",opacity:loading?0.7:1 }}>
            {loading ? ""Thinking..."" : ""Ask""}
          </button>
        </div>
        <div style={{ marginTop: 15, textAlign: ""left"", color: ""var(--muted)"", fontSize: 15 }}>{reply}</div>
      </section>

      <footer>&copy; <span>{year}</span> Cloudetics. All rights reserved.</footer>
    </main>
  );
}
