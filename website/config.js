/* =====================================================================
   SITE SETTINGS  ·  the only file you need to edit to go live
   ===================================================================== */
window.SITE_CONFIG = {

  /* ------------------------------------------------------------------
     1. CONTACT FORM  (Formplume)
     Set the full Formplume endpoint, for example:
     https://api.formplume.com/f/22a93b469a05d6745971da1e
     ------------------------------------------------------------------ */
  formEndpoint: "https://api.formplume.com/f/22a93b469a05d6745971da1e",
  formspreeId: "https://api.formplume.com/f/22a93b469a05d6745971da1e",
  recipientEmail: "nainamohameddamr174@gmail.com",

  /* ------------------------------------------------------------------
     2. RÉSUMÉ CHATBOT
     With no key the bot runs in "Résumé mode": it searches the CV data
     in assets/js/resume-data.js and answers from it (works offline).
     Add an API key (or a proxy URL) to switch it to "AI mode". It still
     answers only from the résumé.
     ------------------------------------------------------------------ */
  chatbot: {
    enabled: true,

    // "gemini" | "openai" | "anthropic" | "groq" | "openrouter" | "custom"
    provider: "gemini",

    // Paste your API key between the quotes.
    // Anyone can read a key placed here by viewing the page source.
    // For a public site, prefer proxyUrl below (see README, step 3).
    apiKey: "",

    // Optional. Leave "" to use the default model for the provider:
    //   gemini → gemini-flash-latest   openai → gpt-6-luna
    //   anthropic → claude-haiku-4-5   groq → openai/gpt-oss-20b
    model: "",

    // Only for provider "custom": any OpenAI-compatible endpoint,
    // e.g. "https://api.deepseek.com/v1"
    baseUrl: "",

    // Recommended for production: the URL of your deployed chat proxy
    // (chat-proxy/cloudflare-worker.js). When set, apiKey is ignored.
    proxyUrl: ""
  },

  /* ------------------------------------------------------------------
     3. LOOK
     true = real glass refraction on desktop Chrome / Edge.
     Other browsers always get the frosted-glass version.
     ------------------------------------------------------------------ */
  liquidRefraction: true
};
