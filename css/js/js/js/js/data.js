/**
 * NEXUS — AI Tool Decision Simulator
 * data.js — Task categories, AI tools, scoring data, requirements
 *
 * Scoring schema (each parameter 1–10):
 *   quality      → Output quality / accuracy / depth
 *   speed        → Response latency / workflow speed
 *   cost         → Affordability / value for money
 *   ease         → Ease of use / onboarding
 *   privacy      → Data privacy / security controls
 *   integration  → Ecosystem integrations / API access
 */

const TASKS = [
  { id: 'coding',       icon: '💻', name: 'Coding',            desc: 'Write, debug & review code' },
  { id: 'content',      icon: '✍️', name: 'Content creation',  desc: 'Blogs, copy, articles, social' },
  { id: 'design',       icon: '🎨', name: 'Design & visuals',  desc: 'UI, graphics, image generation' },
  { id: 'data',         icon: '📊', name: 'Data & analytics',  desc: 'Analysis, dashboards, BI' },
  { id: 'research',     icon: '🔍', name: 'Research',          desc: 'Literature, summarization, Q&A' },
  { id: 'automation',   icon: '⚙️', name: 'Automation',        desc: 'Workflows, integrations, scripts' },
  { id: 'conversation', icon: '💬', name: 'Conversation / chat', desc: 'Chatbots, support, dialogue' },
  { id: 'audio',        icon: '🎵', name: 'Audio & video',     desc: 'Transcription, voice, editing' },
];

const PARAMS = [
  { id: 'quality',     label: 'Output quality',    desc: 'Accuracy, depth & correctness' },
  { id: 'speed',       label: 'Speed',             desc: 'Latency & workflow velocity' },
  { id: 'cost',        label: 'Cost efficiency',   desc: 'Value for money & free tiers' },
  { id: 'ease',        label: 'Ease of use',       desc: 'Learning curve & UX polish' },
  { id: 'privacy',     label: 'Data privacy',      desc: 'Security & data handling' },
  { id: 'integration', label: 'Integrations',      desc: 'Ecosystem & API connectivity' },
];

const REQUIREMENTS = [
  { label: 'Free tier available',   key: 'free',        boosts: { cost: 2 } },
  { label: 'API access',            key: 'api',         boosts: { integration: 2 } },
  { label: 'No login required',     key: 'noLogin',     boosts: { ease: 1 } },
  { label: 'Team collaboration',    key: 'team',        boosts: { integration: 1, ease: 1 } },
  { label: 'On-premise / self-host',key: 'onPremise',   boosts: { privacy: 3 } },
  { label: 'Mobile app',            key: 'mobile',      boosts: { ease: 1, speed: 1 } },
];

/**
 * Per-tool capability flags — determines which requirement boosts apply.
 * true = this tool supports / excels at this requirement
 */
const TOOL_CAPS = {
  // key: { free, api, noLogin, team, onPremise, mobile }
  'GitHub Copilot':       { free: false, api: true,  noLogin: false, team: true,  onPremise: false, mobile: false },
  'Claude':               { free: false, api: true,  noLogin: false, team: false, onPremise: false, mobile: true  },
  'Cursor':               { free: true,  api: false, noLogin: false, team: false, onPremise: false, mobile: false },
  'ChatGPT':              { free: true,  api: true,  noLogin: false, team: true,  onPremise: false, mobile: true  },
  'Tabnine':              { free: true,  api: false, noLogin: false, team: true,  onPremise: true,  mobile: false },
  'Jasper':               { free: false, api: true,  noLogin: false, team: true,  onPremise: false, mobile: false },
  'Copy.ai':              { free: true,  api: false, noLogin: false, team: true,  onPremise: false, mobile: false },
  'Gemini':               { free: true,  api: true,  noLogin: false, team: true,  onPremise: false, mobile: true  },
  'Midjourney':           { free: false, api: false, noLogin: false, team: true,  onPremise: false, mobile: false },
  'DALL-E 3':             { free: false, api: true,  noLogin: false, team: false, onPremise: false, mobile: false },
  'Canva AI':             { free: true,  api: false, noLogin: false, team: true,  onPremise: false, mobile: true  },
  'Figma AI':             { free: false, api: true,  noLogin: false, team: true,  onPremise: false, mobile: false },
  'Stable Diffusion':     { free: true,  api: true,  noLogin: true,  team: false, onPremise: true,  mobile: false },
  'Julius AI':            { free: true,  api: false, noLogin: false, team: false, onPremise: false, mobile: false },
  'Tableau AI':           { free: false, api: true,  noLogin: false, team: true,  onPremise: true,  mobile: false },
  'Power BI Copilot':     { free: false, api: false, noLogin: false, team: true,  onPremise: false, mobile: true  },
  'ChatGPT + Code':       { free: true,  api: true,  noLogin: false, team: false, onPremise: false, mobile: false },
  'Perplexity AI':        { free: true,  api: false, noLogin: false, team: false, onPremise: false, mobile: true  },
  'Elicit':               { free: true,  api: false, noLogin: false, team: false, onPremise: false, mobile: false },
  'Consensus':            { free: true,  api: false, noLogin: false, team: false, onPremise: false, mobile: false },
  'NotebookLM':           { free: true,  api: false, noLogin: false, team: false, onPremise: false, mobile: false },
  'Zapier AI':            { free: false, api: true,  noLogin: false, team: true,  onPremise: false, mobile: false },
  'Make':                 { free: true,  api: true,  noLogin: false, team: true,  onPremise: false, mobile: false },
  'n8n':                  { free: true,  api: true,  noLogin: false, team: true,  onPremise: true,  mobile: false },
  'Claude API':           { free: false, api: true,  noLogin: false, team: false, onPremise: false, mobile: false },
  'AutoGPT':              { free: true,  api: true,  noLogin: false, team: false, onPremise: true,  mobile: false },
  'Intercom AI':          { free: false, api: true,  noLogin: false, team: true,  onPremise: false, mobile: true  },
  'Voiceflow':            { free: true,  api: true,  noLogin: false, team: true,  onPremise: false, mobile: false },
  'Whisper (OpenAI)':     { free: true,  api: true,  noLogin: true,  team: false, onPremise: true,  mobile: false },
  'ElevenLabs':           { free: true,  api: true,  noLogin: false, team: true,  onPremise: false, mobile: false },
  'Otter.ai':             { free: true,  api: false, noLogin: false, team: true,  onPremise: false, mobile: true  },
  'Runway ML':            { free: false, api: false, noLogin: false, team: false, onPremise: false, mobile: false },
  'Descript':             { free: true,  api: false, noLogin: false, team: true,  onPremise: false, mobile: false },
};

/**
 * Tool definitions per task category.
 * Each tool has base scores (1–10) per parameter.
 * Scores reflect real-world performance as of 2024–2025.
 */
const TOOLS = {
  coding: [
    {
      name: 'GitHub Copilot',
      icon: '🐙',
      color: '#f0efe8',
      tagline: 'AI pair programmer embedded in your editor',
      scores: { quality: 9, speed: 9, cost: 6, ease: 9, privacy: 6, integration: 9 },
    },
    {
      name: 'Claude',
      icon: '🤖',
      color: '#e6f1fb',
      tagline: 'Advanced reasoning & long-context code analysis',
      scores: { quality: 10, speed: 7, cost: 7, ease: 9, privacy: 8, integration: 7 },
    },
    {
      name: 'Cursor',
      icon: '⌨️',
      color: '#eaf3de',
      tagline: 'AI-native code editor with codebase awareness',
      scores: { quality: 9, speed: 8, cost: 7, ease: 8, privacy: 7, integration: 8 },
    },
    {
      name: 'ChatGPT',
      icon: '💬',
      color: '#eeedfe',
      tagline: 'Versatile coding assistance via chat interface',
      scores: { quality: 8, speed: 8, cost: 8, ease: 9, privacy: 7, integration: 8 },
    },
    {
      name: 'Tabnine',
      icon: '⚡',
      color: '#faece7',
      tagline: 'Privacy-first autocomplete, runs on-device',
      scores: { quality: 7, speed: 10, cost: 7, ease: 9, privacy: 10, integration: 8 },
    },
  ],

  content: [
    {
      name: 'Claude',
      icon: '🤖',
      color: '#e6f1fb',
      tagline: 'Nuanced, long-form writing with editorial depth',
      scores: { quality: 10, speed: 7, cost: 7, ease: 9, privacy: 8, integration: 7 },
    },
    {
      name: 'ChatGPT',
      icon: '💬',
      color: '#eeedfe',
      tagline: 'General-purpose content generation at scale',
      scores: { quality: 8, speed: 8, cost: 8, ease: 9, privacy: 7, integration: 8 },
    },
    {
      name: 'Jasper',
      icon: '✨',
      color: '#fbeaf0',
      tagline: 'Marketing-focused content platform with templates',
      scores: { quality: 8, speed: 8, cost: 5, ease: 8, privacy: 7, integration: 9 },
    },
    {
      name: 'Copy.ai',
      icon: '📝',
      color: '#eaf3de',
      tagline: 'Fast copy generation with marketing workflows',
      scores: { quality: 7, speed: 9, cost: 7, ease: 9, privacy: 7, integration: 7 },
    },
    {
      name: 'Gemini',
      icon: '♊',
      color: '#faeeda',
      tagline: 'Google-powered creation with workspace integration',
      scores: { quality: 8, speed: 8, cost: 8, ease: 8, privacy: 6, integration: 10 },
    },
  ],

  design: [
    {
      name: 'Midjourney',
      icon: '🖼️',
      color: '#eeedfe',
      tagline: 'State-of-the-art artistic image generation',
      scores: { quality: 10, speed: 6, cost: 6, ease: 6, privacy: 7, integration: 5 },
    },
    {
      name: 'DALL-E 3',
      icon: '🎨',
      color: '#e6f1fb',
      tagline: 'Prompt-accurate image generation via API',
      scores: { quality: 8, speed: 8, cost: 7, ease: 9, privacy: 7, integration: 8 },
    },
    {
      name: 'Canva AI',
      icon: '🖌️',
      color: '#faece7',
      tagline: 'Design + AI in one beginner-friendly platform',
      scores: { quality: 7, speed: 9, cost: 8, ease: 10, privacy: 7, integration: 8 },
    },
    {
      name: 'Figma AI',
      icon: '✏️',
      color: '#eaf3de',
      tagline: 'AI-powered UI/UX design and prototyping',
      scores: { quality: 8, speed: 8, cost: 6, ease: 8, privacy: 7, integration: 9 },
    },
    {
      name: 'Stable Diffusion',
      icon: '🌀',
      color: '#f1efe8',
      tagline: 'Open-source local image generation with full control',
      scores: { quality: 9, speed: 7, cost: 10, ease: 4, privacy: 10, integration: 6 },
    },
  ],

  data: [
    {
      name: 'Julius AI',
      icon: '📈',
      color: '#e6f1fb',
      tagline: 'Conversational data analysis from CSV and databases',
      scores: { quality: 8, speed: 8, cost: 7, ease: 9, privacy: 7, integration: 7 },
    },
    {
      name: 'Claude',
      icon: '🤖',
      color: '#eeedfe',
      tagline: 'Advanced reasoning over complex datasets',
      scores: { quality: 10, speed: 7, cost: 7, ease: 8, privacy: 8, integration: 7 },
    },
    {
      name: 'Tableau AI',
      icon: '📊',
      color: '#faece7',
      tagline: 'AI-enhanced business intelligence dashboards',
      scores: { quality: 9, speed: 7, cost: 4, ease: 7, privacy: 8, integration: 9 },
    },
    {
      name: 'Power BI Copilot',
      icon: '⚡',
      color: '#eaf3de',
      tagline: 'Microsoft-native AI analytics and reporting',
      scores: { quality: 8, speed: 8, cost: 6, ease: 8, privacy: 7, integration: 10 },
    },
    {
      name: 'ChatGPT + Code',
      icon: '💬',
      color: '#faeeda',
      tagline: 'Python-powered data analysis and visualization',
      scores: { quality: 8, speed: 7, cost: 8, ease: 8, privacy: 7, integration: 7 },
    },
  ],

  research: [
    {
      name: 'Perplexity AI',
      icon: '🔍',
      color: '#eeedfe',
      tagline: 'Real-time web research with cited sources',
      scores: { quality: 9, speed: 9, cost: 8, ease: 9, privacy: 7, integration: 6 },
    },
    {
      name: 'Claude',
      icon: '🤖',
      color: '#e6f1fb',
      tagline: 'Deep document analysis and synthesis',
      scores: { quality: 10, speed: 7, cost: 7, ease: 9, privacy: 8, integration: 7 },
    },
    {
      name: 'Elicit',
      icon: '📚',
      color: '#eaf3de',
      tagline: 'Academic literature research and extraction',
      scores: { quality: 9, speed: 8, cost: 7, ease: 8, privacy: 8, integration: 6 },
    },
    {
      name: 'Consensus',
      icon: '🧪',
      color: '#fbeaf0',
      tagline: 'Science-backed claims from peer-reviewed papers',
      scores: { quality: 8, speed: 8, cost: 7, ease: 8, privacy: 8, integration: 5 },
    },
    {
      name: 'NotebookLM',
      icon: '📓',
      color: '#faeeda',
      tagline: 'Ground AI answers in your own documents',
      scores: { quality: 9, speed: 8, cost: 9, ease: 8, privacy: 9, integration: 7 },
    },
  ],

  automation: [
    {
      name: 'Zapier AI',
      icon: '⚡',
      color: '#faece7',
      tagline: 'No-code AI workflow automation across 6,000+ apps',
      scores: { quality: 7, speed: 9, cost: 6, ease: 9, privacy: 7, integration: 10 },
    },
    {
      name: 'Make',
      icon: '🔗',
      color: '#eeedfe',
      tagline: 'Visual automation builder with AI-powered steps',
      scores: { quality: 8, speed: 8, cost: 7, ease: 7, privacy: 7, integration: 10 },
    },
    {
      name: 'n8n',
      icon: '🌐',
      color: '#eaf3de',
      tagline: 'Open-source self-hosted automation platform',
      scores: { quality: 8, speed: 8, cost: 9, ease: 6, privacy: 10, integration: 9 },
    },
    {
      name: 'Claude API',
      icon: '🤖',
      color: '#e6f1fb',
      tagline: 'Build custom AI pipelines and intelligent workflows',
      scores: { quality: 10, speed: 7, cost: 7, ease: 5, privacy: 8, integration: 9 },
    },
    {
      name: 'AutoGPT',
      icon: '🤖',
      color: '#faeeda',
      tagline: 'Autonomous AI agents for multi-step tasks',
      scores: { quality: 7, speed: 6, cost: 8, ease: 5, privacy: 8, integration: 7 },
    },
  ],

  conversation: [
    {
      name: 'Claude',
      icon: '🤖',
      color: '#e6f1fb',
      tagline: 'Thoughtful, safe, and nuanced conversational AI',
      scores: { quality: 10, speed: 7, cost: 7, ease: 9, privacy: 8, integration: 7 },
    },
    {
      name: 'ChatGPT',
      icon: '💬',
      color: '#eeedfe',
      tagline: 'Industry-standard general-purpose chatbot',
      scores: { quality: 8, speed: 8, cost: 8, ease: 9, privacy: 7, integration: 8 },
    },
    {
      name: 'Intercom AI',
      icon: '💌',
      color: '#faece7',
      tagline: 'Customer support automation and live-chat AI',
      scores: { quality: 8, speed: 9, cost: 5, ease: 8, privacy: 7, integration: 9 },
    },
    {
      name: 'Voiceflow',
      icon: '🗣️',
      color: '#eaf3de',
      tagline: 'Visual builder for chatbots and voice agents',
      scores: { quality: 7, speed: 8, cost: 6, ease: 8, privacy: 7, integration: 8 },
    },
    {
      name: 'Gemini',
      icon: '♊',
      color: '#faeeda',
      tagline: 'Google-powered multimodal conversational AI',
      scores: { quality: 8, speed: 8, cost: 8, ease: 8, privacy: 6, integration: 10 },
    },
  ],

  audio: [
    {
      name: 'Whisper (OpenAI)',
      icon: '🎙️',
      color: '#eeedfe',
      tagline: 'Accurate open-source speech transcription',
      scores: { quality: 9, speed: 7, cost: 9, ease: 6, privacy: 9, integration: 7 },
    },
    {
      name: 'ElevenLabs',
      icon: '🔊',
      color: '#e6f1fb',
      tagline: 'Hyper-realistic AI voice cloning and synthesis',
      scores: { quality: 10, speed: 8, cost: 6, ease: 8, privacy: 7, integration: 8 },
    },
    {
      name: 'Otter.ai',
      icon: '📝',
      color: '#faece7',
      tagline: 'Meeting transcription, notes and AI summaries',
      scores: { quality: 8, speed: 9, cost: 7, ease: 9, privacy: 7, integration: 8 },
    },
    {
      name: 'Runway ML',
      icon: '🎬',
      color: '#eaf3de',
      tagline: 'AI-powered video generation and editing',
      scores: { quality: 9, speed: 7, cost: 5, ease: 7, privacy: 7, integration: 7 },
    },
    {
      name: 'Descript',
      icon: '✂️',
      color: '#faeeda',
      tagline: 'Edit audio and video like a text document',
      scores: { quality: 8, speed: 8, cost: 6, ease: 9, privacy: 7, integration: 7 },
    },
  ],
};
