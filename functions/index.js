/**
 * Firebase Cloud Functions — Cloudinary signing proxy.
 *
 * WHY this exists
 * ─────────────────────────────────────────────────────────────────────────────
 * Cloudinary's Destroy API (POST /image/destroy) requires a HMAC-SHA1
 * signature computed from api_secret.  api_secret must never appear in
 * client-side code or REACT_APP_* env variables (those values are inlined into
 * the public JS bundle at build time).
 *
 * This function holds api_secret in Firebase environment config (server-side
 * only), computes the signature, and forwards the delete request to Cloudinary.
 *
 * Setup
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Install Firebase CLI:  npm install -g firebase-tools
 * 2. From the project root: firebase init functions  (select this folder)
 * 3. Set server-side secrets (NEVER add these to .env or React code):
 *      firebase functions:config:set \
 *        cloudinary.cloud_name="dr3amjdrm" \
 *        cloudinary.api_key="<YOUR_API_KEY>" \
 *        cloudinary.api_secret="<YOUR_API_SECRET>"
 * 4. Deploy:  firebase deploy --only functions
 * 5. Copy the deployed function URL into your React .env:
 *      REACT_APP_CLOUDINARY_DELETE_FN_URL=https://<region>-<project>.cloudfunctions.net/cloudinaryDelete
 *
 * Local emulation
 * ─────────────────────────────────────────────────────────────────────────────
 *   firebase emulators:start --only functions
 *   Then set REACT_APP_CLOUDINARY_DELETE_FN_URL=http://localhost:5001/<project>/<region>/cloudinaryDelete
 */

const functions = require("firebase-functions");
const crypto    = require("crypto");
const https     = require("https");
const querystring = require("querystring");

// ── CORS — allow requests only from the deployed domain ──────────────────────
// In production, restrict this to your actual domain, e.g. "https://dekodemyapı.com"
const ALLOWED_ORIGINS = [
  "https://dekodemyapı.com",
  "http://localhost:3000",          // CRA dev server
  "http://localhost:5000",          // Firebase Hosting emulator
];

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
};

// ── Helper: SHA-1 signature required by Cloudinary Destroy API ───────────────
const buildSignature = (publicId, timestamp, apiSecret) =>
  crypto
    .createHash("sha1")
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

// ── Helper: POST to Cloudinary using Node's built-in https module ─────────────
// (Firebase Functions gen-1 runs Node 18 which has native fetch, but using
//  https keeps this compatible with Node 16 environments too.)
const cloudinaryPost = (path, body) =>
  new Promise((resolve, reject) => {
    const postData = querystring.stringify(body);
    const options  = {
      hostname: "api.cloudinary.com",
      port:     443,
      path,
      method:   "POST",
      headers:  {
        "Content-Type":   "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let raw = "";
      res.on("data", (chunk) => { raw += chunk; });
      res.on("end",  ()      => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, body: {} }); }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });

// ── Cloud Function: cloudinaryDelete ─────────────────────────────────────────

exports.cloudinaryDelete = functions.https.onRequest(async (req, res) => {
  setCorsHeaders(req, res);

  // Pre-flight
  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST")    return res.status(405).json({ error: "Method not allowed" });

  // ── Read server-side Cloudinary credentials ─────────────────────────────
  const cfg       = functions.config().cloudinary ?? {};
  const cloudName = cfg.cloud_name;
  const apiKey    = cfg.api_key;
  const apiSecret = cfg.api_secret;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("[cloudinaryDelete] Missing Firebase Functions config. Run:");
    console.error("  firebase functions:config:set cloudinary.cloud_name=... cloudinary.api_key=... cloudinary.api_secret=...");
    return res.status(500).json({ error: "Server-side Cloudinary config is incomplete." });
  }

  // ── Validate request body ────────────────────────────────────────────────
  const { publicId } = req.body ?? {};
  if (!publicId || typeof publicId !== "string") {
    return res.status(400).json({ error: "publicId (string) is required." });
  }

  // ── Build signed request ─────────────────────────────────────────────────
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = buildSignature(publicId, timestamp, apiSecret);

  // ── Call Cloudinary Destroy API ──────────────────────────────────────────
  try {
    const { status, body } = await cloudinaryPost(
      `/v1_1/${cloudName}/image/destroy`,
      { public_id: publicId, signature, api_key: apiKey, timestamp }
    );

    if (status >= 200 && status < 300) {
      // body.result === "ok" means deleted; "not found" means already gone —
      // both are acceptable outcomes (idempotent operation).
      console.info(`[cloudinaryDelete] ${publicId} → ${body.result}`);
      return res.status(200).json({ result: body.result ?? "ok" });
    }

    console.error(`[cloudinaryDelete] Cloudinary API error (HTTP ${status}):`, body);
    return res.status(status).json({ error: body?.error?.message ?? "Cloudinary error" });

  } catch (err) {
    console.error("[cloudinaryDelete] Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});
