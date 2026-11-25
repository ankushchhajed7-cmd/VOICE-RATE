# VOICE RATE — STATE

Ankush Kirana ke liye voice rate app. Maalik bolkar product + rate daalta hai. Dukaan par baitha helper bolkar bhav poochta hai, aur app bolkar batata hai.

## Version history
| Version | Date | Kya hua |
|---|---|---|
| v1.0.0 | 25 Nov 2026 | Pehla build: voice se rate set, purana rate replace, naya product seedha add, Maalik (PIN) / Helper mode, voice se bhav poochna + bolkar jawab, smart matching (Hindi + Marathi), galti sudhar se seekhna (alias), NEW tag + merge, backup/restore, Gold-Silver design, PWA offline |

## Files
- `index.html`: poora app (single file, vanilla JS)
- `manifest.json`, `sw.js` (network-first), `icon-192.png`, `icon-512.png`
- Data phone ke `localStorage` me rehta hai (key `voiceRate.v1`)

## Settings / decisions
- Voice: browser ki free voice (Web Speech API). Default `hi-IN`, Settings me `mr-IN` bhi. Hindi + Marathi mix ke liye `hi-IN` best hai.
- Number samajhna: digits, Hindi + Marathi number words (1–99), सौ/शंभर/हजार, सवा/डेढ़/दीड/ढाई/अडीच/साढ़े/पौने, दीडशे/दोनशे… compound.
- Matching: Devanagari → roman → sound-alike key (श/ष/स, मात्रा, aspirate h, double letters) + Levenshtein.
  - Rate set: score ≥ 0.78 → purana product update, warna **seedha naya product** (bina pooche).
  - Bhav poochna: score ≥ 0.60 → jawab (partial naam bhi chalega, jaise "तेल" → "फॉर्च्यून तेल").
- Purana rate **delete** hota hai (history nahi rakhi). Sirf turant Undo ke liye ek step yaad rehta hai.
- "1 किलो" = unit. "100 ग्राम" jaisa pack size naam ka hissa banta hai.
- Galat product pakda gaya → "गलत प्रोडक्ट? बदलें" → sahi chuno → suna hua naam alias ban jata hai (agli baar seedha sahi).
- NEW tag 7 din tak (ya maalik ke tap/edit karne tak). Duplicate ho to Edit → Merge.
- Helper mode: koi edit/add/delete nahi. Maalik mode me wapas jaane ke liye PIN chahiye.
- Repo ka naam VOICE-RATE.

## Pending / next
- **v1.1.0: Firebase online sync** (free Spark plan). Maalik ka phone ↔ dukaan ka phone, turant update.
- Optional baad me: Sarvam AI speech-to-text (₹1,000 free credit) agar free voice ki accuracy kam pade.
- APK: apk-factory se banana (GitHub Pages URL dalkar).
