import { useState, useEffect } from "react";

// ── GOOGLE FONTS ──────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ── DATA ──────────────────────────────────────────────────────────────────────
const PHASES = [
  {
    id: 1,
    period: "NOW – DEC 2025",
    title: "SEED PHASE",
    color: "#F5C518",
    emoji: "🌱",
    goal: "Build the foundation. Learn. Earn. Don't stop automations.",
    milestones: [
      "Master 3 core AI tools (ChatGPT, Claude, Canva AI)",
      "Launch 1 automation that earns UGX 50,000+/day",
      "Build personal brand on LinkedIn + YouTube (Uganda AI voice)",
      "Get 1 paying client (any service: content, chatbot, design)",
      "Study prompt engineering – 30 mins daily",
      "Save UGX 500,000 business fund",
    ],
  },
  {
    id: 2,
    period: "JAN – DEC 2026",
    title: "GROW PHASE",
    color: "#D4380D",
    emoji: "🔥",
    goal: "Stack services. Build a team. Become known in Uganda.",
    milestones: [
      "Offer 3 AI services (chatbots, content, automation)",
      "Sign 5 Ugandan SME clients (schools, shops, NGOs)",
      "Hire 1 part-time assistant (train them on AI tools)",
      "Monthly revenue: UGX 3,000,000+",
      "Speak at 1 Uganda tech event or school",
      "Register AI business officially (URSB)",
      "Launch Uganda AI community (WhatsApp/Telegram: 200+ members)",
    ],
  },
  {
    id: 3,
    period: "JAN – DEC 2027",
    title: "AGENCY LAUNCH",
    color: "#389E0D",
    emoji: "🚀",
    goal: "Full agency. Staff. Impact. Uganda on the AI map.",
    milestones: [
      "Full agency: 3–5 staff members",
      "20+ active clients across Uganda",
      "Monthly revenue: UGX 20,000,000+",
      "Train 100 Ugandans in AI skills",
      "Partner with 1 university or ministry",
      "Media feature (NTV, New Vision, or BBC Africa)",
      "Launch 1 Uganda-specific AI product",
    ],
  },
];

const TOOLS = [
  {
    name: "ChatGPT",
    logo: "🤖",
    level: "ESSENTIAL",
    color: "#10B981",
    simple:
      "Think of ChatGPT like a VERY smart friend who has read every book in the world. You type a question or job, and it answers or does it for you. Like asking: 'Write me an email to a client' — and it writes it in 10 seconds.",
    use: "Write content, answer client questions, create chatbots, draft proposals",
    cost: "Free / $20/month for Pro",
    learnTime: "1 week",
    steps: [
      "Go to chatgpt.com and make a free account",
      "Type: 'Help me write a WhatsApp message to a business client in Uganda'",
      "See what it gives you. Edit it. Send it.",
      "Practice daily: give it 1 real task from your day",
    ],
  },
  {
    name: "Claude AI",
    logo: "🧠",
    level: "ESSENTIAL",
    color: "#F59E0B",
    simple:
      "Claude is like a very careful, thoughtful helper. If ChatGPT is fast, Claude is deep. It is better at long documents, plans, and thinking through big problems. Use it like a business advisor.",
    use: "Business plans, long reports, research, strategy, this very dashboard!",
    cost: "Free / $20/month for Pro",
    learnTime: "1 week",
    steps: [
      "Go to claude.ai and sign up free",
      "Paste a business problem and say: 'Give me a plan to solve this'",
      "Ask it to review your work before sending to clients",
      "Use it to build this agency plan step by step",
    ],
  },
  {
    name: "Make (Integromat)",
    logo: "⚙️",
    level: "AUTOMATION",
    color: "#8B5CF6",
    simple:
      "Make is like a ROBOT that connects all your apps together. Imagine: someone fills a form → automatically a WhatsApp is sent → their name is saved in Google Sheets → you get a notification. ALL without you doing anything. This is how you earn while sleeping.",
    use: "Automate client onboarding, send reports, post on social media, collect money",
    cost: "Free for 1,000 tasks/month",
    learnTime: "2 weeks",
    steps: [
      "Go to make.com and sign up free",
      "Watch: 'Make.com beginners tutorial' on YouTube (1 hour)",
      "Build your first automation: Google Form → Google Sheets",
      "Add WhatsApp or email notification to it",
    ],
  },
  {
    name: "Canva AI",
    logo: "🎨",
    level: "CONTENT",
    color: "#EC4899",
    simple:
      "Canva is like having a professional designer on your phone. Before, you needed to study art for years to make beautiful posters. Now, you type what you want and AI makes it. You can make logos, social media posts, pitch decks — all in minutes.",
    use: "Client designs, agency branding, social media, presentations",
    cost: "Free / $13/month for Pro (worth it!)",
    learnTime: "3 days",
    steps: [
      "Go to canva.com and make a free account",
      "Click 'Create a design' → choose 'Instagram Post'",
      "Type your Uganda business name and let Magic Design suggest layouts",
      "Make 1 design every day this week",
    ],
  },
  {
    name: "n8n",
    logo: "🔗",
    level: "AUTOMATION",
    color: "#F97316",
    simple:
      "n8n is like Make but you can host it yourself (on your own computer or cheap server). This means: NO monthly fees after setup. For a Ugandan business, this saves a lot of money as you grow. Think of it as your private robot factory.",
    use: "Advanced automations, chatbot backends, client dashboards",
    cost: "Free (self-host) / $20/month cloud",
    learnTime: "3 weeks",
    steps: [
      "Start with Make first. Come back to n8n in Month 3.",
      "Watch: 'n8n crash course' on YouTube",
      "Practice by rebuilding your Make automations in n8n",
      "Host free on Railway.app (Uganda internet works)",
    ],
  },
  {
    name: "Voiceflow",
    logo: "💬",
    level: "CHATBOTS",
    color: "#06B6D4",
    simple:
      "Voiceflow lets you build a chatbot — a robot that chats with customers on WhatsApp or websites — without writing any code. Imagine a shop in Kampala: instead of the owner answering 'What is your price?' 100 times a day, a robot answers for them. You BUILD that robot and charge the shop owner.",
    use: "Sell chatbots to schools, shops, clinics, hotels, NGOs across Uganda",
    cost: "Free for 2 agents",
    learnTime: "2 weeks",
    steps: [
      "Go to voiceflow.com and sign up free",
      "Follow their official 'Build your first chatbot' tutorial",
      "Build a sample chatbot for a Uganda school",
      "Show it to 3 businesses and offer to build theirs for UGX 200,000",
    ],
  },
  {
    name: "Notion AI",
    logo: "📋",
    level: "OPERATIONS",
    color: "#374151",
    simple:
      "Notion is like a magic notebook that organizes everything: your clients, tasks, ideas, reports, plans. Notion AI makes it even smarter — it writes meeting notes for you, summarizes documents, and helps you plan. Run your entire agency from one Notion workspace.",
    use: "Client management, project tracking, team collaboration, knowledge base",
    cost: "Free / $8/month for Plus",
    learnTime: "1 week",
    steps: [
      "Go to notion.so and sign up free",
      "Create a page called 'MY AI AGENCY'",
      "Add sections: Clients, Tasks, Ideas, Daily Log",
      "Use the AI assistant (++ shortcut) to summarize your notes",
    ],
  },
  {
    name: "ElevenLabs",
    logo: "🎙️",
    level: "ADVANCED",
    color: "#7C3AED",
    simple:
      "ElevenLabs makes voices. You type words, and it speaks them in a real human voice — in English, Luganda, Swahili, any language. You can clone a voice. Businesses use this for ads, podcasts, customer service. In Uganda, this is BIG because you can make content in local languages.",
    use: "Voice ads for Ugandan clients, audio content, IVR systems for businesses",
    cost: "Free tier / $5/month starter",
    learnTime: "1 week",
    steps: [
      "Go to elevenlabs.io and sign up free",
      "Type a sentence in Luganda or English and generate a voice",
      "Use it to make a sample ad for a Kampala shop",
      "Offer 'AI Voice Ads' as a service: UGX 150,000 per ad",
    ],
  },
];

const SELF_GROWTH = [
  {
    area: "MINDSET",
    icon: "🧘",
    color: "#F5C518",
    daily: "5-minute morning affirmation: 'I am building the future of Uganda'",
    weekly: "Read 10 pages of a business/AI book",
    books: ["The $100M Offers (Alex Hormozi)", "Zero to One (Peter Thiel)", "AI Superpowers (Kai-Fu Lee)"],
    method: "Write 1 thing you learned today in your Notion journal EVERY night. This builds self-awareness and tracks growth visually.",
  },
  {
    area: "SKILLS",
    icon: "💡",
    color: "#D4380D",
    daily: "30 mins on 1 tool (rotate through the 8 tools weekly)",
    weekly: "Complete 1 full project using a new tool",
    books: ["YouTube: FreeCodeCamp AI courses", "Coursera: Google AI Essentials (free)", "LinkedIn Learning: AI for Business"],
    method: "The 'Build to Learn' method: don't just watch tutorials. After every tutorial, build something REAL for a Ugandan business context.",
  },
  {
    area: "NETWORK",
    icon: "🤝",
    color: "#389E0D",
    daily: "Comment on 1 LinkedIn post in the AI/Tech space",
    weekly: "Have 1 real conversation with a potential client or partner",
    books: ["Uganda Tech Twitter/X: follow @UgandaTech", "Kampala Innovation Village events", "AI Uganda Facebook groups"],
    method: "The 'Give First' method: every week, share 1 free AI tip in your WhatsApp groups or community. This builds trust before you ask for money.",
  },
  {
    area: "BUSINESS",
    icon: "💼",
    color: "#8B5CF6",
    daily: "Track income + expenses in a Google Sheet",
    weekly: "Review: Did I grow revenue? What worked? What failed?",
    books: ["Profit First (Mike Michalowicz)", "E-Myth Revisited (Michael Gerber)", "URSB Uganda: register your business"],
    method: "The '1 client a month' rule: focus on getting just 1 new client each month. Don't rush to 10 clients at once. Serve 1 amazingly, get a referral.",
  },
];

const DAILY_HABITS = [
  { time: "6:00 AM", habit: "Wake up + 5-min affirmation", icon: "☀️" },
  { time: "6:15 AM", habit: "Check automation reports (earnings overnight)", icon: "💰" },
  { time: "6:30 AM", habit: "30-min AI tool study (rotate tools)", icon: "📚" },
  { time: "7:30 AM", habit: "Post 1 piece of content (LinkedIn/X/WhatsApp)", icon: "📱" },
  { time: "8:00 AM", habit: "Start client work / automation tasks", icon: "⚙️" },
  { time: "12:00 PM", habit: "Review progress vs today's goals", icon: "✅" },
  { time: "6:00 PM", habit: "1 conversation with potential client or partner", icon: "🤝" },
  { time: "9:00 PM", habit: "Journal: What did I learn? What earned?", icon: "📓" },
  { time: "9:30 PM", habit: "Plan tomorrow in Notion", icon: "📋" },
];

const MOTIVATION_METHODS = [
  {
    name: "THE UGANDA WHY",
    icon: "🇺🇬",
    color: "#F5C518",
    description:
      "Write on paper: 'By 2027, I will have changed Uganda by...' and finish that sentence with 5 specific things. Put it where you see it EVERY morning. On your mirror. On your phone wallpaper. Your why must be BIGGER than your fear.",
  },
  {
    name: "THE 1% RULE",
    icon: "📈",
    color: "#D4380D",
    description:
      "You do not need to be amazing tomorrow. You only need to be 1% better than yesterday. 1% every day for 365 days = 37x better in 1 year. This is mathematics, not motivation. Show up 1% every day.",
  },
  {
    name: "THE PUBLIC PROMISE",
    icon: "📢",
    color: "#389E0D",
    description:
      "Tell people about your goal. Post on social media: 'By 2027, I am launching Uganda's top AI Agency.' When people know your goal, you have accountability. Embarrassment is a powerful motivator. Use it.",
  },
  {
    name: "THE WIN LOG",
    icon: "🏆",
    color: "#8B5CF6",
    description:
      "Every day, write 1 win — no matter how small. 'I learned what n8n is.' 'I sent 1 cold message.' 'I earned UGX 10,000 from my automation.' On hard days, read your win log. You will see how far you have come.",
  },
  {
    name: "THE PAIN ANCHOR",
    icon: "⚡",
    color: "#EC4899",
    description:
      "Think about what happens if you DON'T build this agency. Where will you be in 2027 if nothing changes? That pain — staying the same while Uganda needs change — must hurt MORE than the work. Anchor to that pain when you feel lazy.",
  },
  {
    name: "THE COMMUNITY SHIELD",
    icon: "🛡️",
    color: "#06B6D4",
    description:
      "Build or join a small group of 3-5 people with similar goals. Share daily updates: 'Today I did X.' This group protects you from quitting. Find them in Kampala Innovation Village, Uganda AI groups, or right here in your Claude chats.",
  },
];

const AUTOMATIONS = [
  { name: "Content Posting Bot", platform: "Make.com", earning: "Passive: saves 2hrs/day", status: "active" },
  { name: "Client Lead Capture", platform: "Typeform + Sheets", earning: "Leads → UGX 200K/client", status: "active" },
  { name: "WhatsApp Auto-Reply", platform: "Twilio + Make", earning: "24/7 client responses", status: "build" },
  { name: "Invoice Generator", platform: "Make + Google Docs", earning: "Saves 1hr/client", status: "build" },
  { name: "Social Media Scheduler", platform: "Buffer API", earning: "Consistent posting", status: "planned" },
  { name: "Daily Report Email", platform: "Make + Gmail", earning: "Client retention", status: "planned" },
];

// ── STORAGE HELPERS ───────────────────────────────────────────────────────────
async function loadData(key) {
  try {
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
}
async function saveData(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function UgandaAIAgency() {
  const [tab, setTab] = useState("dashboard");
  const [checkedMilestones, setCheckedMilestones] = useState({});
  const [checkedHabits, setCheckedHabits] = useState({});
  const [dailyLog, setDailyLog] = useState("");
  const [winLog, setWinLog] = useState([]);
  const [newWin, setNewWin] = useState("");
  const [autoStatus, setAutoStatus] = useState({});
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const today = new Date().toLocaleDateString("en-UG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const todayKey = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    (async () => {
      const m = await loadData("milestones"); if (m) setCheckedMilestones(m);
      const h = await loadData(`habits_${todayKey}`); if (h) setCheckedHabits(h);
      const w = await loadData("wins"); if (w) setWinLog(w);
      const a = await loadData("autos"); if (a) setAutoStatus(a);
      const s = await loadData("streak"); if (s) setStreak(s.count || 0);
      const ld = await loadData("lastDate"); if (ld) setLastDate(ld.d || "");
      const dl = await loadData(`log_${todayKey}`); if (dl) setDailyLog(dl.text || "");
    })();
  }, []);

  const toggleMilestone = async (phase, idx) => {
    const key = `${phase}_${idx}`;
    const updated = { ...checkedMilestones, [key]: !checkedMilestones[key] };
    setCheckedMilestones(updated);
    await saveData("milestones", updated);
  };

  const toggleHabit = async (idx) => {
    const updated = { ...checkedHabits, [idx]: !checkedHabits[idx] };
    setCheckedHabits(updated);
    await saveData(`habits_${todayKey}`, updated);
    // streak logic
    if (!checkedHabits[idx]) {
      const total = Object.values(updated).filter(Boolean).length;
      if (total === DAILY_HABITS.length && lastDate !== todayKey) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setLastDate(todayKey);
        await saveData("streak", { count: newStreak });
        await saveData("lastDate", { d: todayKey });
      }
    }
  };

  const addWin = async () => {
    if (!newWin.trim()) return;
    const entry = { text: newWin, date: todayKey, id: Date.now() };
    const updated = [entry, ...winLog].slice(0, 50);
    setWinLog(updated);
    setNewWin("");
    await saveData("wins", updated);
  };

  const saveLog = async (text) => {
    setDailyLog(text);
    await saveData(`log_${todayKey}`, { text });
  };

  const toggleAuto = async (name) => {
    const updated = { ...autoStatus, [name]: !autoStatus[name] };
    setAutoStatus(updated);
    await saveData("autos", updated);
  };

  const habitsToday = Object.values(checkedHabits).filter(Boolean).length;
  const totalPhase1Done = PHASES[0].milestones.filter((_, i) => checkedMilestones[`1_${i}`]).length;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0A0A0A; }
    .app { background: #0A0A0A; min-height: 100vh; color: #E8E0D0; font-family: 'Syne', sans-serif; }
    .header { background: #0F0F0F; border-bottom: 2px solid #F5C518; padding: 16px 20px; position: sticky; top: 0; z-index: 100; }
    .header-top { display: flex; align-items: center; gap: 12px; }
    .flag { display: flex; height: 20px; width: 40px; border-radius: 3px; overflow: hidden; flex-shrink: 0; }
    .flag-black { flex: 1; background: #000; }
    .flag-yellow { flex: 1; background: #FCDC04; }
    .flag-red { flex: 1; background: #CC0001; }
    .header h1 { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 3px; color: #F5C518; }
    .header p { font-size: 10px; color: #888; font-family: 'JetBrains Mono', monospace; letter-spacing: 1px; }
    .streak-badge { margin-left: auto; background: #F5C518; color: #000; padding: 4px 10px; border-radius: 20px; font-family: 'Bebas Neue'; font-size: 16px; letter-spacing: 1px; }
    .nav { display: flex; gap: 2px; overflow-x: auto; padding: 8px 12px; background: #0F0F0F; scrollbar-width: none; }
    .nav::-webkit-scrollbar { display: none; }
    .nav-btn { border: none; background: transparent; color: #666; padding: 6px 12px; font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1px; cursor: pointer; border-radius: 4px; white-space: nowrap; transition: all 0.2s; }
    .nav-btn.active { background: #F5C518; color: #000; }
    .nav-btn:hover:not(.active) { color: #F5C518; }
    .content { padding: 16px; max-width: 900px; margin: 0 auto; }
    .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 4px; color: #F5C518; margin-bottom: 4px; }
    .section-sub { font-size: 12px; color: #666; font-family: 'JetBrains Mono', monospace; margin-bottom: 20px; }
    .card { background: #141414; border: 1px solid #222; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
    .card-accent { border-left: 4px solid #F5C518; }
    .phase-card { border-radius: 12px; padding: 20px; margin-bottom: 16px; position: relative; overflow: hidden; }
    .phase-card::before { content: ''; position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; border-radius: 50%; opacity: 0.08; background: currentColor; }
    .phase-number { font-family: 'Bebas Neue', sans-serif; font-size: 64px; opacity: 0.15; position: absolute; right: 16px; top: 8px; line-height: 1; }
    .phase-title { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 3px; }
    .phase-period { font-family: 'JetBrains Mono', monospace; font-size: 10px; opacity: 0.7; margin: 4px 0 8px; }
    .phase-goal { font-size: 13px; opacity: 0.85; margin-bottom: 14px; font-style: italic; border-left: 2px solid currentColor; padding-left: 10px; }
    .milestone { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; }
    .milestone:last-child { border-bottom: none; }
    .ms-check { width: 20px; height: 20px; border-radius: 4px; border: 2px solid currentColor; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; transition: all 0.2s; margin-top: 2px; }
    .ms-check.done { background: currentColor; }
    .ms-text { font-size: 13px; line-height: 1.5; }
    .ms-text.done { opacity: 0.4; text-decoration: line-through; }
    .progress-bar { height: 6px; background: #222; border-radius: 3px; overflow: hidden; margin: 8px 0; }
    .progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s; }
    .tool-card { background: #141414; border-radius: 12px; padding: 16px; margin-bottom: 14px; border: 1px solid #222; }
    .tool-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .tool-logo { font-size: 28px; }
    .tool-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; }
    .tool-level { font-size: 9px; font-family: 'JetBrains Mono', monospace; padding: 2px 7px; border-radius: 10px; font-weight: 600; }
    .simple-box { background: #0D1F0D; border: 1px solid #1A3A1A; border-radius: 8px; padding: 12px; margin: 10px 0; font-size: 13px; line-height: 1.7; color: #90EE90; }
    .simple-label { font-size: 9px; font-family: 'JetBrains Mono', monospace; color: #4CAF50; letter-spacing: 2px; margin-bottom: 6px; }
    .steps-list { list-style: none; }
    .steps-list li { display: flex; gap: 10px; padding: 6px 0; font-size: 12px; align-items: flex-start; border-bottom: 1px solid #1a1a1a; }
    .steps-list li:last-child { border-bottom: none; }
    .step-num { background: #F5C518; color: #000; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
    .habit-item { display: flex; align-items: center; gap: 12px; padding: 10px; background: #141414; border-radius: 8px; margin-bottom: 8px; cursor: pointer; border: 1px solid #222; transition: all 0.2s; }
    .habit-item:hover { border-color: #333; }
    .habit-item.done { opacity: 0.5; background: #0F1A0F; border-color: #1A3A1A; }
    .habit-time { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #888; min-width: 52px; }
    .habit-icon { font-size: 18px; }
    .habit-text { font-size: 13px; flex: 1; }
    .habit-check { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #F5C518; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
    .habit-check.done { background: #F5C518; color: #000; }
    .growth-card { background: #141414; border-radius: 12px; padding: 16px; margin-bottom: 14px; }
    .growth-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .growth-icon { font-size: 24px; }
    .growth-title { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; }
    .label { font-size: 9px; font-family: 'JetBrains Mono', monospace; color: #888; letter-spacing: 2px; margin: 8px 0 4px; }
    .value-text { font-size: 13px; line-height: 1.6; }
    .motive-card { background: #141414; border-radius: 12px; padding: 18px; margin-bottom: 12px; border-left: 4px solid; }
    .motive-icon { font-size: 30px; margin-bottom: 8px; display: block; }
    .motive-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; margin-bottom: 8px; }
    .motive-text { font-size: 13px; line-height: 1.75; color: #BBB; }
    .auto-card { background: #141414; border-radius: 8px; padding: 12px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; border: 1px solid #222; }
    .auto-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .auto-name { font-size: 13px; font-weight: 600; flex: 1; }
    .auto-platform { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #666; }
    .auto-earning { font-size: 11px; color: #4CAF50; }
    .auto-toggle { background: transparent; border: 1px solid #333; color: #888; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 10px; font-family: 'Syne', sans-serif; }
    .textarea { width: 100%; background: #0F0F0F; border: 1px solid #333; border-radius: 8px; padding: 12px; color: #E8E0D0; font-family: 'Syne', sans-serif; font-size: 13px; resize: vertical; min-height: 100px; outline: none; }
    .textarea:focus { border-color: #F5C518; }
    .input { background: #0F0F0F; border: 1px solid #333; border-radius: 8px; padding: 10px 14px; color: #E8E0D0; font-family: 'Syne', sans-serif; font-size: 13px; outline: none; flex: 1; }
    .input:focus { border-color: #F5C518; }
    .btn { background: #F5C518; color: #000; border: none; padding: 10px 18px; border-radius: 8px; font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; cursor: pointer; }
    .btn:hover { background: #E6B800; }
    .btn-outline { background: transparent; border: 1px solid #F5C518; color: #F5C518; padding: 8px 14px; border-radius: 8px; font-family: 'Bebas Neue', sans-serif; font-size: 14px; cursor: pointer; }
    .win-entry { background: #0F1A0F; border: 1px solid #1A3A1A; border-radius: 8px; padding: 10px; margin-bottom: 8px; }
    .win-date { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #4CAF50; margin-bottom: 4px; }
    .win-text { font-size: 13px; }
    .row { display: flex; align-items: center; gap: 8px; }
    .stat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; }
    .stat-box { background: #141414; border-radius: 10px; padding: 14px; text-align: center; border: 1px solid #222; }
    .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: #F5C518; line-height: 1; }
    .stat-label { font-size: 10px; color: #666; font-family: 'JetBrains Mono', monospace; margin-top: 4px; }
    .uganda-banner { background: linear-gradient(135deg, #000 0%, #1A0A00 50%, #0A1A00 100%); border: 1px solid #F5C518; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center; }
    .uganda-banner h2 { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 5px; color: #F5C518; }
    .uganda-banner p { font-size: 13px; color: #AAA; margin-top: 6px; line-height: 1.6; }
    .phase-progress { font-family: 'JetBrains Mono', monospace; font-size: 10px; opacity: 0.8; margin-top: 8px; }
  `;

  const tabs = [
    { id: "dashboard", label: "📊 DASHBOARD" },
    { id: "plan", label: "🗺 THE PLAN" },
    { id: "tools", label: "🛠 TOOLS" },
    { id: "growth", label: "🌱 GROWTH" },
    { id: "daily", label: "📅 DAILY" },
    { id: "earnings", label: "💰 EARNINGS" },
    { id: "motivation", label: "🔥 FIRE" },
  ];

  return (
    <div className="app">
      <style>{css}</style>
      
      {/* HEADER */}
      <div className="header">
        <div className="header-top">
          <div className="flag">
            <div className="flag-black" />
            <div className="flag-yellow" />
            <div className="flag-red" />
          </div>
          <div>
            <h1>UGANDA AI AGENCY 2027</h1>
            <p>YOUR PERSONAL COMMAND CENTER</p>
          </div>
          <div className="streak-badge">🔥 {streak} DAYS</div>
        </div>
      </div>
      
      {/* NAV */}
      <div className="nav">
        {tabs.map(t => (
          <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      
      <div className="content">
        
        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <>
            <div className="uganda-banner">
              <h2>CHANGE UGANDA BY 2027</h2>
              <p>
                You are not just building a business.<br />
                You are building the AI future of Uganda.<br />
                <strong style={{color:"#F5C518"}}>Every. Single. Day. Counts.</strong>
              </p>
            </div>

            <div className="stat-grid">
              <div className="stat-box">
                <div className="stat-num">{habitsToday}</div>
                <div className="stat-label">/ {DAILY_HABITS.length} HABITS TODAY</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">{streak}</div>
                <div className="stat-label">DAY STREAK 🔥</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">{totalPhase1Done}</div>
                <div className="stat-label">/ {PHASES[0].milestones.length} PHASE 1</div>
              </div>
            </div>

            <div className="card card-accent">
              <div className="label">TODAY</div>
              <div style={{fontSize:13, color:"#F5C518", fontFamily:"'JetBrains Mono', monospace"}}>{today}</div>
              <div style={{marginTop:12}}>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6}}>
                  <span>Daily Habits</span>
                  <span style={{color:"#F5C518"}}>{habitsToday}/{DAILY_HABITS.length}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width:`${(habitsToday/DAILY_HABITS.length)*100}%`, background:"#F5C518"}} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="label">YOUR MISSION</div>
              <div style={{fontSize:15, lineHeight:1.8, fontStyle:"italic", color:"#E8E0D0"}}>
                "Build Uganda's most impactful AI Agency by 2027 — training people, solving problems,
                generating income, and proving that Africa does not wait for technology,
                Africa <strong style={{color:"#F5C518"}}>BUILDS</strong> it."
              </div>
            </div>

            <div style={{marginBottom:12}}>
              <div className="section-title" style={{fontSize:20}}>PHASE TRACKER</div>
            </div>
            {PHASES.map((p) => {
              const done = p.milestones.filter((_, i) => checkedMilestones[`${p.id}_${i}`]).length;
              const pct = Math.round((done / p.milestones.length) * 100);
              return (
                <div key={p.id} className="card" style={{borderLeft:`4px solid ${p.color}`}}>
                  <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:8}}>
                    <span style={{fontSize:20}}>{p.emoji}</span>
                    <span style={{fontFamily:"'Bebas Neue', sans-serif", fontSize:18, letterSpacing:2, color:p.color}}>{p.title}</span>
                    <span style={{marginLeft:"auto", fontSize:12, color:p.color, fontFamily:"'JetBrains Mono', monospace"}}>{done}/{p.milestones.length}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width:`${pct}%`, background:p.color}} />
                  </div>
                  <div style={{fontSize:10, color:"#666", fontFamily:"'JetBrains Mono', monospace", marginTop:4}}>{p.period} • {pct}% COMPLETE</div>
                </div>
              );
            })}
          </>
        )}

        {/* ── THE PLAN ── */}
        {tab === "plan" && (
          <>
            <div className="section-title">THE 3-YEAR PLAN</div>
            <div className="section-sub">TICK OFF EACH MILESTONE AS YOU COMPLETE IT</div>
            
            {PHASES.map((phase) => {
              const done = phase.milestones.filter((_, i) => checkedMilestones[`${phase.id}_${i}`]).length;
              return (
                <div key={phase.id} className="phase-card" style={{background:"#141414", border:`1px solid ${phase.color}33`, color:phase.color, marginBottom:16}}>
                  <div className="phase-number">{phase.id}</div>
                  <div className="phase-period">{phase.period}</div>
                  <div className="phase-title">{phase.emoji} {phase.title}</div>
                  <div className="phase-goal">{phase.goal}</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width:`${(done/phase.milestones.length)*100}%`, background:phase.color}} />
                  </div>
                  <div className="phase-progress">{done}/{phase.milestones.length} MILESTONES DONE</div>
                  <div style={{marginTop:12}}>
                    {phase.milestones.map((m, i) => {
                      const key = `${phase.id}_${i}`;
                      const isDone = checkedMilestones[key];
                      return (
                        <div key={i} className="milestone" style={{color:"#E8E0D0"}} onClick={() => toggleMilestone(phase.id, i)}>
                          <div className={`ms-check ${isDone ? "done" : ""}`} style={{borderColor:phase.color, color:"#000"}}>
                            {isDone && "✓"}
                          </div>
                          <div className={`ms-text ${isDone ? "done" : ""}`}>{m}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* ── TOOLS ── */}
        {tab === "tools" && (
          <>
            <div className="section-title">YOUR AI TOOLKIT</div>
            <div className="section-sub">EXPLAINED AT PRIMARY 5 LEVEL — NO JARGON</div>

            {TOOLS.map((tool) => (
              <div key={tool.name} className="tool-card" style={{borderTop:`3px solid ${tool.color}`}}>
                <div className="tool-header">
                  <span className="tool-logo">{tool.logo}</span>
                  <div style={{flex:1}}>
                    <div className="tool-name" style={{color:tool.color}}>{tool.name}</div>
                    <div className="row" style={{gap:6, marginTop:4}}>
                      <span className="tool-level" style={{background:`${tool.color}22`, color:tool.color}}>{tool.level}</span>
                      <span style={{fontSize:10, fontFamily:"'JetBrains Mono', monospace", color:"#888"}}>{tool.cost}</span>
                      <span style={{fontSize:10, fontFamily:"'JetBrains Mono', monospace", color:"#888"}}>⏱ {tool.learnTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="simple-box">
                  <div className="simple-label">📖 WHAT IS IT? (Simple Version)</div>
                  {tool.simple}
                </div>

                <div className="label">💼 HOW YOU USE IT IN YOUR AGENCY</div>
                <div className="value-text" style={{color:"#AAA", marginBottom:10}}>{tool.use}</div>

                <div className="label">🪜 HOW TO START (4 Steps)</div>
                <ul className="steps-list">
                  {tool.steps.map((s, i) => (
                    <li key={i}>
                      <span className="step-num">{i + 1}</span>
                      <span style={{color:"#CCC"}}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}

        {/* ── SELF GROWTH ── */}
        {tab === "growth" && (
          <>
            <div className="section-title">SELF GROWTH</div>
            <div className="section-sub">THE PERSON YOU BECOME IS THE AGENCY YOU BUILD</div>

            {SELF_GROWTH.map((g) => (
              <div key={g.area} className="growth-card" style={{borderTop:`3px solid ${g.color}`}}>
                <div className="growth-header">
                  <span className="growth-icon">{g.icon}</span>
                  <span className="growth-title" style={{color:g.color}}>{g.area}</span>
                </div>
                
                <div className="label">DAILY PRACTICE</div>
                <div className="value-text" style={{background:"#0F0F0F", padding:"8px 12px", borderRadius:6, fontSize:13, color:"#E8E0D0"}}>
                  ▶ {g.daily}
                </div>

                <div className="label">WEEKLY PRACTICE</div>
                <div className="value-text" style={{color:"#CCC"}}>{g.weekly}</div>

                <div className="label">RESOURCES</div>
                {g.books.map((b, i) => (
                  <div key={i} style={{fontSize:12, color:"#888", padding:"3px 0", borderBottom:"1px solid #1A1A1A"}}>
                    📌 {b}
                  </div>
                ))}

                <div style={{background:`${g.color}11`, border:`1px solid ${g.color}33`, borderRadius:8, padding:12, marginTop:12}}>
                  <div style={{fontSize:10, fontFamily:"'JetBrains Mono', monospace", color:g.color, marginBottom:6, letterSpacing:2}}>💡 THE METHOD</div>
                  <div style={{fontSize:13, lineHeight:1.7, color:"#E8E0D0"}}>{g.method}</div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── DAILY ── */}
        {tab === "daily" && (
          <>
            <div className="section-title">DAILY FOLLOW-UP</div>
            <div className="section-sub" style={{color:"#F5C518", fontFamily:"'JetBrains Mono', monospace"}}>{today}</div>

            <div style={{marginBottom:20}}>
              <div style={{fontSize:14, fontWeight:700, marginBottom:10, color:"#F5C518"}}>
                TODAY'S HABITS — {habitsToday}/{DAILY_HABITS.length} COMPLETE
              </div>
              {DAILY_HABITS.map((h, i) => (
                <div key={i} className={`habit-item ${checkedHabits[i] ? "done" : ""}`} onClick={() => toggleHabit(i)}>
                  <span className="habit-time">{h.time}</span>
                  <span className="habit-icon">{h.icon}</span>
                  <span className="habit-text">{h.habit}</span>
                  <div className={`habit-check ${checkedHabits[i] ? "done" : ""}`}>
                    {checkedHabits[i] ? "✓" : ""}
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{marginBottom:16}}>
              <div className="label">📓 TODAY'S JOURNAL LOG</div>
              <div style={{fontSize:11, color:"#666", marginBottom:8, fontFamily:"'JetBrains Mono', monospace"}}>
                Write: What did I learn? What did I earn? What will I do tomorrow?
              </div>
              <textarea
                className="textarea"
                placeholder="Start writing... (auto-saved)"
                value={dailyLog}
                onChange={e => saveLog(e.target.value)}
              />
            </div>

            <div className="card">
              <div className="label">🏆 WIN LOG — ADD TODAY'S WIN</div>
              <div style={{fontSize:11, color:"#666", marginBottom:8, fontFamily:"'JetBrains Mono', monospace"}}>
                Even small wins count: 'Learned what Make.com is', 'Got 1 reply'
              </div>
              <div className="row" style={{marginBottom:12}}>
                <input
                  className="input"
                  placeholder="Today's win..."
                  value={newWin}
                  onChange={e => setNewWin(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addWin()}
                />
                <button className="btn" onClick={addWin}>ADD</button>
              </div>
              {winLog.slice(0, 10).map((w) => (
                <div key={w.id} className="win-entry">
                  <div className="win-date">✅ {w.date}</div>
                  <div className="win-text">{w.text}</div>
                </div>
              ))}
              {winLog.length === 0 && (
                <div style={{fontSize:12, color:"#444", textAlign:"center", padding:"20px 0"}}>No wins logged yet. Add your first win above! 👆</div>
              )}
            </div>
          </>
        )}

        {/* ── EARNINGS ── */}
        {tab === "earnings" && (
          <>
            <div className="section-title">AUTOMATION EARNINGS</div>
            <div className="section-sub">PROTECT YOUR DAILY INCOME — NEVER STOP THE MACHINES</div>

            <div className="card" style={{marginBottom:16, borderLeft:"4px solid #4CAF50"}}>
              <div style={{fontSize:13, lineHeight:1.8, color:"#E8E0D0"}}>
                <strong style={{color:"#4CAF50"}}>GOLDEN RULE:</strong> Your automations run while you learn and build.
                Before you study, before you sleep — confirm your automations are ACTIVE.
                Income continuity = freedom to build without pressure.
              </div>
            </div>

            <div style={{marginBottom:12}}>
              <div style={{fontSize:14, fontWeight:700, color:"#F5C518", marginBottom:10}}>AUTOMATION STATUS TRACKER</div>
              {AUTOMATIONS.map((a) => {
                const isActive = autoStatus[a.name] ?? (a.status === "active");
                const dotColor = a.status === "active" ? "#4CAF50" : a.status === "build" ? "#F5C518" : "#888";
                return (
                  <div key={a.name} className="auto-card">
                    <div className="auto-dot" style={{background: isActive ? "#4CAF50" : "#D4380D"}} />
                    <div style={{flex:1}}>
                      <div className="auto-name">{a.name}</div>
                      <div className="row" style={{gap:8}}>
                        <span className="auto-platform">{a.platform}</span>
                        <span className="auto-earning">{a.earning}</span>
                      </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4}}>
                      <span style={{fontSize:9, fontFamily:"'JetBrains Mono', monospace", color:dotColor, letterSpacing:1}}>
                        {a.status.toUpperCase()}
                      </span>
                      <button className="auto-toggle" onClick={() => toggleAuto(a.name)} style={{color: isActive ? "#4CAF50" : "#D4380D", borderColor: isActive ? "#4CAF50" : "#D4380D"}}>
                        {isActive ? "RUNNING ✓" : "PAUSED ✗"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="card">
              <div className="label">💡 AUTOMATION INCOME STRATEGY FOR UGANDA</div>
              {[
                "Start with FREE tools: Make.com free tier handles 1,000 tasks/month",
                "First automation goal: UGX 50,000/day passive = UGX 1,500,000/month",
                "Reinvest 30% of automation income into learning new tools",
                "Keep automations for clients + automations for yourself SEPARATE",
                "Backup: if 1 automation breaks, you should have 2 others running",
                "Document every automation in Notion so you never lose the setup",
              ].map((tip, i) => (
                <div key={i} style={{display:"flex", gap:10, padding:"7px 0", borderBottom:"1px solid #1A1A1A", fontSize:13, alignItems:"flex-start"}}>
                  <span style={{color:"#4CAF50", fontSize:14, flexShrink:0}}>→</span>
                  <span style={{color:"#CCC"}}>{tip}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── MOTIVATION ── */}
        {tab === "motivation" && (
          <>
            <div className="section-title">THE FIRE METHODS</div>
            <div className="section-sub">SPECIFIC TECHNIQUES TO KEEP GOING WHEN IT'S HARD</div>

            <div className="card" style={{background:"#1A0F00", borderColor:"#F5C518", marginBottom:16, textAlign:"center", padding:20}}>
              <div style={{fontSize:32, marginBottom:8}}>🇺🇬</div>
              <div style={{fontFamily:"'Bebas Neue', sans-serif", fontSize:22, letterSpacing:3, color:"#F5C518"}}>
                YOU ARE DOING THIS FOR UGANDA
              </div>
              <div style={{fontSize:13, color:"#AAA", marginTop:8, lineHeight:1.7}}>
                Not just for money. Not just for yourself.<br />
                You are proving that a Ugandan, with access to AI tools,<br />
                can build something that changes lives.
              </div>
            </div>

            {MOTIVATION_METHODS.map((m) => (
              <div key={m.name} className="motive-card" style={{borderColor:m.color}}>
                <span className="motive-icon">{m.icon}</span>
                <div className="motive-name" style={{color:m.color}}>{m.name}</div>
                <div className="motive-text">{m.description}</div>
              </div>
            ))}

            <div className="card" style={{marginTop:8}}>
              <div className="label">WHEN YOU FEEL LIKE QUITTING, READ THIS</div>
              <div style={{fontSize:14, lineHeight:2, color:"#E8E0D0", fontStyle:"italic"}}>
                "Every big thing in Uganda was built by someone who had no example to follow.
                Museveni had no blueprint. Stanbic had no manual. M-PESA started with doubt.
                You are building something Uganda has never seen at this scale.
                <br /><br />
                <span style={{color:"#F5C518"}}>The work you do TODAY is the example someone in 2030 will point to and say:
                'THAT is how it started.'</span>
                <br /><br />
                Don't quit today. Do 1 thing. Just 1. And come back tomorrow."
              </div>
            </div>
          </>
        )}

        <div style={{height:40}} />
      </div>
    </div>
  );
}
