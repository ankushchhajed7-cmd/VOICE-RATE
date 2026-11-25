// VOICE RATE — Sarvam proxy (Cloudflare Worker). Sirf tab chahiye jab app me Test "जुड़ नहीं पाया" dikhaye.
// Cloudflare dashboard → Workers → Create → is code ko paste → Deploy → URL ko app Settings → Proxy URL me daalo.
// (Optional) Worker Settings → Variables → SARVAM_KEY = aapki key (phir app me key khaali chhod sakte ho)
const ALLOW = 'https://ankushchhajed7-cmd.github.io';
export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': ALLOW,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'api-subscription-key, content-type',
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return new Response('VOICE RATE proxy OK', { headers: cors });
    const key = req.headers.get('api-subscription-key') || env.SARVAM_KEY;
    if (!key) return new Response('{"error":"no key"}', { status: 401, headers: cors });
    const r = await fetch('https://api.sarvam.ai/speech-to-text', {
      method: 'POST',
      headers: { 'api-subscription-key': key, 'content-type': req.headers.get('content-type') },
      body: req.body,
    });
    return new Response(r.body, { status: r.status, headers: { ...cors, 'content-type': r.headers.get('content-type') || 'application/json' } });
  },
};
