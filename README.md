# N. Naina Mohamed · Portfolio website

One-page portfolio with a liquid-glass interface, a Formspree contact form and a résumé chatbot.

```
website/
├── index.html                      the page
├── config.js                       ★ the only file you must edit (form ID, chatbot key)
├── assets/
│   ├── css/styles.css              colours, glass material, layout
│   ├── js/resume-data.js           CV content → experience cards, Gantt chart, chatbot knowledge
│   ├── js/chatbot.js               résumé assistant
│   ├── js/main.js                  theme, navigation, contact form
│   ├── js/liquid-glass.js          glass refraction effect
│   ├── img/                        photo, favicon, social preview card
│   └── docs/Naina-Mohamed-CV.pdf   public CV (passport no., date of birth, father's name, address removed)
└── chat-proxy/cloudflare-worker.js optional: keeps the AI key secret
```

---

## 1. Preview

Double-click `index.html`. Everything works offline except the web fonts, the contact form and the chatbot's AI mode.

## 2. Connect the contact form (Formspree)

1. Sign up at <https://formspree.io> with the email that should receive messages (nainamohameddamr174@gmail.com).
2. **+ New form** → name it "Portfolio" → create.
3. Copy the form ID from the endpoint, e.g. `https://formspree.io/f/xyzabcd` → `xyzabcd`.
4. Open `config.js` and set `formspreeId: "xyzabcd"`.
5. After the site is online, send yourself a test message (check spam the first time).

Until the ID is set, the form shows "Form not connected yet" when opened from your computer, and a polite "please email or WhatsApp" note on a live site.

## 3. Chatbot

It already works with no key (**Résumé mode**): it searches the CV data and answers from it.
Add a key to switch on **AI mode**. The AI still answers only from the résumé, refuses unrelated questions, and replies in the visitor's language (English, Tamil, Hindi…). If the AI call ever fails, the bot quietly falls back to Résumé mode.

### Option A · quickest: key in `config.js`

```js
chatbot: {
  provider: "gemini",          // gemini | openai | anthropic | groq | openrouter | custom
  apiKey: "PASTE_YOUR_KEY",
  model: ""                    // empty = default model
}
```

| provider     | where to get a key                          | default model          |
|--------------|---------------------------------------------|------------------------|
| `gemini`     | <https://aistudio.google.com/apikey> (free tier) | `gemini-flash-latest`  |
| `openai`     | <https://platform.openai.com/api-keys>      | `gpt-6-luna`           |
| `anthropic`  | <https://console.anthropic.com>             | `claude-haiku-4-5`     |
| `groq`       | <https://console.groq.com/keys>             | `openai/gpt-oss-20b`   |
| `openrouter` | <https://openrouter.ai/keys>                | set `model` yourself   |
| `custom`     | any OpenAI-compatible API (set `baseUrl`)   | set `model` yourself   |

> **Important:** a key in `config.js` can be read by anyone who views the page source.
> If you use this option, pick a free-tier key with a spending limit. For Gemini you can also restrict the key to your website:
> Google Cloud Console → APIs & Services → Credentials → your key → *Application restrictions* → *Websites* → add `https://your-site-address/*`.

### Option B · recommended for a public site: secret key behind a proxy

1. Deploy `chat-proxy/cloudflare-worker.js` on a free Cloudflare account (step-by-step instructions are at the top of that file).
2. In `config.js` set `proxyUrl: "https://<your-worker>.workers.dev"` and leave `apiKey` empty.

## 4. Publish (free options)

- **Netlify Drop**: open <https://app.netlify.com/drop> and drag the `website` folder onto the page. Rename the site in *Site settings*.
- **GitHub Pages**: create a repository, upload the contents of `website`, then *Settings → Pages → Deploy from branch → main / root*.
- **Vercel**: *Add New → Project*, import the repository, no build settings needed.

After publishing, change the two `assets/img/og-card.jpg` meta tags in `index.html` to the full address (`https://your-site/assets/img/og-card.jpg`) so WhatsApp and LinkedIn show the preview card.

## 5. Updating content

- Experience, education, skills, projects, chatbot knowledge → `assets/js/resume-data.js`
- Hero, About, Selected work, Skills, Education and Contact wording → `index.html`
- Years of experience, role durations and the Gantt "data date" update themselves.
- New CV → replace `assets/docs/Naina-Mohamed-CV.pdf` (same file name). Do not upload a version that shows the passport number.

## Contact actions

| Action | Link | What happens |
|---|---|---|
| Email address | `mailto:nainamohameddamr174@gmail.com` | opens the visitor's mail app |
| Gmail button | Gmail compose URL | opens Gmail in the browser (useful on PCs without a mail app) |
| Mobile number / Call | `tel:+918012166602` | starts a call on phones |
| WhatsApp button | `https://wa.me/918012166602` | opens a WhatsApp chat with a greeting filled in |

## Notes

- The lens-style refraction runs on desktop Chrome and Edge. Safari, Firefox and phones get the frosted-glass version. Turn it off with `liquidRefraction: false`.
- Light and dark themes follow the device setting; the sun/moon button switches manually.
- Reduced-motion and reduced-transparency settings are respected.
