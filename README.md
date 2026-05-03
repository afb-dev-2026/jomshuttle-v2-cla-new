# JomShuttle — Redesigned Website

Modern, mobile-first static website for Malaysia's trusted shuttle service.

## 🗂️ File Structure

```
/project
  index.html   ← Single-page app shell (all sections)
  styles.css   ← All styles (light + dark mode, responsive)
  app.js       ← All rendering, form, routing logic
  data.js      ← ALL content/prices/translations (edit here!)
  README.md    ← This file
```

---

## ⚙️ How to Customise

### 🔁 Change the WhatsApp Number
Open `data.js` and update:
```js
whatsapp: "60136788869",  // ← digits only, include country code
```

---

### 🗺️ Add a New State
In `data.js`, add an object to the `states` array:
```js
{
  id: "sabah",
  name: { en: "Sabah", ms: "Sabah" },
  priceFrom: 300,
  image: "https://images.unsplash.com/photo-XXXXXXX?w=600&q=80",
  alt: "Kota Kinabalu Sabah Malaysia",
  destinations: ["Kota Kinabalu", "Sandakan", "Tawau"],
},
```

---

### 🗺️ Add a New Tour Package
In `data.js`, add to the `tours` array:
```js
{
  id: "langkawi",
  name: { en: "Langkawi Island", ms: "Pulau Langkawi" },
  priceFrom: 350,
  duration: { en: "3D2N", ms: "3H2M" },
  image: "https://images.unsplash.com/photo-XXXXXXX?w=600&q=80",
  alt: "Langkawi island cable car",
  highlights: {
    en: ["Cable Car", "Island Hopping", "Duty Free Shopping", "Hotel Included"],
    ms: ["Kereta Kabel", "Island Hopping", "Beli Belah Bebas Cukai", "Hotel Termasuk"],
  },
},
```

---

### 💰 Change a Price
In `data.js`, find the state or service and change `priceFrom`:
```js
priceFrom: 120,  // ← change this number
```

---

### 📧 Enable EmailJS
1. Create an account at https://emailjs.com
2. Get your Public Key, Service ID, and Template ID
3. In `data.js`, replace:
```js
emailjs: {
  publicKey:  "YOUR_EMAILJS_PUBLIC_KEY",  // ← paste here
  serviceId:  "YOUR_EMAILJS_SERVICE_ID",  // ← paste here
  templateId: "YOUR_EMAILJS_TEMPLATE_ID", // ← paste here
},
```

---

### 🌍 Add a Translation Key
In `data.js`, add to both `i18n.en` and `i18n.ms`:
```js
en: { my_key: "My English text" },
ms: { my_key: "Teks Bahasa Saya" },
```
Then in `index.html`, use: `<span data-i18n="my_key"></span>`

---

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repo
2. Settings → Pages → Source: `main` branch, `/ (root)`
3. Done — your site is live at `https://yourusername.github.io/repo-name`

### Cloudflare Pages
1. Connect your GitHub repo in Cloudflare dashboard
2. Build command: *(leave blank — static site)*
3. Output directory: `/`
4. Deploy — Cloudflare auto-deploys on every push

---

## 🔐 Security Features
- **Honeypot field** — catches bots that fill hidden form fields
- **Input validation** — all fields validated before submission
- **No secrets exposed** — API keys are placeholders; EmailJS key is client-safe by design
- **CSP-friendly** — no inline event handlers in critical paths
- **rel="noopener noreferrer"** on all external links

---

## 🎨 Theming
- Light / Dark mode stored in `localStorage`
- All colours use CSS custom properties in `:root` and `[data-theme="dark"]`
- Change `--brand` in `styles.css` to rebrand colours instantly

---

## 📦 Dependencies (CDN, no npm required)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — Google Fonts
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Google Fonts
- [EmailJS Browser SDK](https://www.emailjs.com/docs/sdk/installation/) — optional email sending
