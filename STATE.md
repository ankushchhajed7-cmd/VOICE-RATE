# VOICE RATE — STATE

Ankush Kirana ke liye voice rate app. Maalik bolkar product + rate daalta hai. Dukaan par baitha helper bolkar bhav poochta hai, aur app bolkar batata hai.

## Version history
| Version | Date | Kya hua |
|---|---|---|
| v1.2.0 | 26 Nov 2026 | Recording ab MediaRecorder/WebM nahi — AudioContext se kachchi awaaz (PCM) pakadkar 16kHz mono 16-bit WAV banti hai (APK WebView ki WebM Sarvam reject karta tha: "Invalid audio file" 400). Dheemi awaaz auto-boost (max 8x). Sarvam 400/500/net par Sarvam band nahi hota (sirf 401/403/429 par free voice). Sarvam ka asli error card me. Test: Ankush ki asli awaaz (video se) fake mic me → WAV 16k sahi, "साखर पासष्ट रुपये किलो" → साखर ₹65/किलो |
| v1.1.3 | 26 Nov 2026 | Mic error card me asli error (name + message) — APK mic debug ke liye. apk-factory me MODIFY_AUDIO_SETTINGS add hua (26 Nov 3:32 PM), uske baad wala APK chahiye |
| v1.1.2 | 26 Nov 2026 | APK me mic error (NotReadable/NotAllowed) par card: Android Settings → Microphone Allow, screen recorder band, app dobara kholo |
| v1.1.1 | 26 Nov 2026 | APK support: APK me jawab ANVAlert.speak (Android TTS) se; APK me free voice nahi chalti to "Sarvam चालू करें" message; mic error ka asli kaaran (permission / mic busy / not found). apk-factory me runtime mic permission fix (feature-mic-permission) ke saath use karo |
| v1.1.0 | 26 Nov 2026 | Sarvam AI voice (saaras:v4, product naam keyterms me — sabse naye 50), Settings: on/off, API key (sirf phone me), "sirf maalik ke liye" (default on), Mode सामान्य/मिक्स, Proxy URL, Test button, istemaal ka hisaab (₹30/ghanta). Bolkar rukne ke 1.3 sec baad apne aap band. Sarvam fail (key/credit/net) → apne aap free voice. worker.js = Cloudflare proxy (sirf zaroorat ho to) |
| v1.0.3 | 26 Nov 2026 | Naya version turant: own files hamesha bina HTTP-cache ke network se (no-store), sw.js updateViaCache none, khulte hi GitHub par naya version check karke peela banner "नया version आ गया — यहाँ दबाएं" |
| v1.0.2 | 25 Nov 2026 | Header me version number + ⟳ Refresh button (cache saaf karke naya version laata hai, rates safe rehte hain) |
| v1.0.1 | 25 Nov 2026 | Video test ke baad number fix: "14 से 60" = 1460 (से/सो = सौ), ₹ se number nahi tootta, Marathi "चौदाशे/एकशे" hundreds, galat likhe number (पासेस्टर = 65) ka andaaza, rate na sunaai de to saaf message, main screen par हिंदी/मराठी button |
| v1.0.0 | 25 Nov 2026 | Pehla build: voice se rate set, purana rate replace, naya product seedha add, Maalik (PIN) / Helper mode, voice se bhav poochna + bolkar jawab, smart matching (Hindi + Marathi), galti sudhar se seekhna (alias), NEW tag + merge, backup/restore, Gold-Silver design, PWA offline |

## Files
- `index.html`: poora app (single file, vanilla JS)
- `worker.js`: Sarvam proxy for Cloudflare (optional)
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
- Har app me upar version number + Refresh button (Ankush ka standing rule).

- APK (apk-factory WebView): free Google voice nahi chalti; Sarvam (getUserMedia) chalega jab apk-factory runtime mic permission maange (fix: apk-factory branch feature-mic-permission). TTS APK me ANVAlert.speak se.
- APK aur Chrome wala app apna data alag-alag rakhte hain (Backup/Restore se le ja sakte ho).

## Pending / next
- **v1.1.0: Firebase online sync** (free Spark plan). Maalik ka phone ↔ dukaan ka phone, turant update.
- Sarvam direct browser se chalta hai ya Proxy chahiye — asli key se Test karke confirm karna.
- APK ke liye apk-factory me native voice + TTS bridge (Android SpeechRecognizer + TextToSpeech), agar APK chahiye.
- Real dukaan test: Hindi vs Marathi language setting me se kaunsi zyada sahi pakadti hai.
